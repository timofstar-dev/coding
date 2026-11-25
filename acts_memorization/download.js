// Per-verse audio download.
// The browser's speechSynthesis voice cannot be recorded to a file, so downloads are
// generated in the browser with the Kokoro-82M neural TTS model (no server, no API key).
// The model (~90MB) is downloaded once on first use and cached by the browser.

const KOKORO_URL = 'https://cdn.jsdelivr.net/npm/kokoro-js@1.2.1/+esm';
const KOKORO_MODEL = 'onnx-community/Kokoro-82M-v1.0-ONNX';
const LAME_URL = 'https://cdnjs.cloudflare.com/ajax/libs/lamejs/1.2.1/lame.min.js';

const VOICES = [
    { id: 'af_heart', label: '여성 (미국) · Heart' },
    { id: 'af_bella', label: '여성 (미국) · Bella' },
    { id: 'am_michael', label: '남성 (미국) · Michael' },
    { id: 'am_fenrir', label: '남성 (미국) · Fenrir' },
    { id: 'bf_emma', label: '여성 (영국) · Emma' },
    { id: 'bm_george', label: '남성 (영국) · George' },
];
const SPEEDS = ['0.5', '0.6', '0.7', '0.8', '0.9', '1', '1.2'];

let ttsPromise = null;
let lamePromise = null;
const audioCache = new Map(); // key -> { samples: Float32Array, rate: number }

// WebGPU (fp32, ~330MB once) is ~20x faster than WASM (q8, ~90MB once; ~5s of compute per
// second of audio). fp16/q8 on WebGPU produce NaN audio, so only fp32 is used there.
let webgpuSupport = null;
function hasWebGPU() {
    if (!webgpuSupport) {
        webgpuSupport = (async () => {
            try { return !!(navigator.gpu && await navigator.gpu.requestAdapter()); }
            catch { return false; }
        })();
    }
    return webgpuSupport;
}

function loadTTS(onProgress) {
    if (!ttsPromise) {
        ttsPromise = (async () => {
            const { KokoroTTS } = await import(KOKORO_URL);
            if (await hasWebGPU()) {
                try {
                    return await KokoroTTS.from_pretrained(KOKORO_MODEL, {
                        dtype: 'fp32', device: 'webgpu', progress_callback: onProgress,
                    });
                } catch (err) {
                    console.warn('WebGPU TTS failed, falling back to WASM:', err);
                }
            }
            return KokoroTTS.from_pretrained(KOKORO_MODEL, {
                dtype: 'q8', device: 'wasm', progress_callback: onProgress,
            });
        })().catch(err => {
            ttsPromise = null; // allow retry
            throw err;
        });
    }
    return ttsPromise;
}

function loadLame() {
    if (window.lamejs) return Promise.resolve(window.lamejs);
    if (!lamePromise) {
        lamePromise = new Promise((resolve, reject) => {
            const s = document.createElement('script');
            s.src = LAME_URL;
            s.onload = () => resolve(window.lamejs);
            s.onerror = () => { lamePromise = null; reject(new Error('MP3 encoder failed to load')); };
            document.head.appendChild(s);
        });
    }
    return lamePromise;
}

// "행 7:59-60 Acts 7:59-60" -> { label: "Acts 7:59-60", spoken: "Acts chapter 7, verses 59 to 60." }
function parseReference(reference) {
    const m = (reference || '').match(/([A-Za-z]+)\s+(\d+):(\d+)([a-z]?)(?:-(\d+))?/);
    if (!m) return { label: (reference || 'Verse').trim(), spoken: '' };
    const [, book, ch, v1, part, v2] = m;
    const label = `${book} ${ch}:${v1}${part}${v2 ? '-' + v2 : ''}`;
    const spoken = v2
        ? `${book} chapter ${ch}, verses ${v1} to ${v2}.`
        : `${book} chapter ${ch}, verse ${v1}.`;
    return { label, spoken };
}

function floatToInt16(s) {
    s = Math.max(-1, Math.min(1, s));
    return s < 0 ? s * 0x8000 : s * 0x7fff;
}

function encodeWav(samples, rate) {
    const buffer = new ArrayBuffer(44 + samples.length * 2);
    const view = new DataView(buffer);
    const writeStr = (off, str) => { for (let i = 0; i < str.length; i++) view.setUint8(off + i, str.charCodeAt(i)); };
    writeStr(0, 'RIFF');
    view.setUint32(4, 36 + samples.length * 2, true);
    writeStr(8, 'WAVE');
    writeStr(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);   // PCM
    view.setUint16(22, 1, true);   // mono
    view.setUint32(24, rate, true);
    view.setUint32(28, rate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeStr(36, 'data');
    view.setUint32(40, samples.length * 2, true);
    for (let i = 0, off = 44; i < samples.length; i++, off += 2) {
        view.setInt16(off, floatToInt16(samples[i]), true);
    }
    return new Blob([buffer], { type: 'audio/wav' });
}

async function encodeMp3(samples, rate) {
    const lamejs = await loadLame();
    const pcm = new Int16Array(samples.length);
    for (let i = 0; i < samples.length; i++) pcm[i] = floatToInt16(samples[i]);
    const encoder = new lamejs.Mp3Encoder(1, rate, 64);
    const chunks = [];
    const block = 1152;
    for (let i = 0; i < pcm.length; i += block) {
        const buf = encoder.encodeBuffer(pcm.subarray(i, i + block));
        if (buf.length) chunks.push(new Uint8Array(buf));
    }
    const end = encoder.flush();
    if (end.length) chunks.push(new Uint8Array(end));
    return new Blob(chunks, { type: 'audio/mpeg' });
}

function concatAudio(parts, rate, gapSec) {
    const gap = Math.round(rate * gapSec);
    const total = parts.reduce((n, p) => n + p.length, 0) + gap * Math.max(0, parts.length - 1);
    const out = new Float32Array(total);
    let off = 0;
    parts.forEach((p, i) => {
        out.set(p, off);
        off += p.length + (i < parts.length - 1 ? gap : 0);
    });
    return out;
}

// ---------- Modal UI ----------

let modal = null;
let current = null;      // { reference, spokenText, defaultSpeed }
let previewUrl = null;
let busy = false;

function el(sel) { return modal.querySelector(sel); }

function buildModal() {
    modal = document.createElement('div');
    modal.id = 'download-modal';
    modal.className = 'dl-modal hidden';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'dl-title');
    modal.innerHTML = `
        <div class="dl-backdrop"></div>
        <div class="dl-panel">
            <div class="flex items-start justify-between mb-4">
                <div>
                    <h3 id="dl-title" class="text-lg font-bold text-indigo-700 flex items-center gap-2">
                        <i class="fa-solid fa-download"></i> 음성 파일 다운로드
                    </h3>
                    <p class="dl-ref text-sm text-gray-500 mt-0.5"></p>
                </div>
                <button class="dl-close text-gray-400 hover:text-gray-600 text-lg px-1" title="닫기" aria-label="닫기">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>

            <div class="grid grid-cols-2 gap-3 mb-3">
                <label class="block">
                    <span class="text-xs font-medium text-gray-500">배속</span>
                    <select class="dl-speed mt-1 w-full border border-gray-300 rounded-md text-sm p-1.5 focus:ring-indigo-500 focus:border-indigo-500">
                        ${SPEEDS.map(s => `<option value="${s}">${Number(s).toFixed(1)}x</option>`).join('')}
                    </select>
                </label>
                <label class="block">
                    <span class="text-xs font-medium text-gray-500">파일 형식</span>
                    <select class="dl-format mt-1 w-full border border-gray-300 rounded-md text-sm p-1.5 focus:ring-indigo-500 focus:border-indigo-500">
                        <option value="mp3" selected>MP3 (휴대폰용)</option>
                        <option value="wav">WAV (원음)</option>
                    </select>
                </label>
                <label class="block">
                    <span class="text-xs font-medium text-gray-500">목소리</span>
                    <select class="dl-voice mt-1 w-full border border-gray-300 rounded-md text-sm p-1.5 focus:ring-indigo-500 focus:border-indigo-500">
                        ${VOICES.map(v => `<option value="${v.id}">${v.label}</option>`).join('')}
                    </select>
                </label>
                <label class="block">
                    <span class="text-xs font-medium text-gray-500">반복 횟수</span>
                    <select class="dl-repeat mt-1 w-full border border-gray-300 rounded-md text-sm p-1.5 focus:ring-indigo-500 focus:border-indigo-500">
                        <option value="1" selected>1번</option>
                        <option value="3">3번</option>
                        <option value="5">5번</option>
                        <option value="10">10번</option>
                    </select>
                </label>
            </div>

            <label class="flex items-center gap-2 text-sm mb-4 cursor-pointer">
                <input type="checkbox" class="dl-with-ref rounded text-indigo-600 w-4 h-4" checked>
                구절 주소도 읽기 <span class="text-gray-400 text-xs">(예: "Acts chapter 1, verse 8")</span>
            </label>

            <div class="dl-status hidden"></div>
            <div class="dl-progress hidden h-1.5 bg-gray-100 rounded-full overflow-hidden mb-3">
                <div class="dl-progress-bar h-full bg-indigo-500 transition-all" style="width:0%"></div>
            </div>
            <audio class="dl-audio hidden w-full mb-3" controls></audio>

            <div class="flex gap-2 justify-end">
                <button class="dl-preview bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition disabled:opacity-50">
                    <i class="fa-solid fa-headphones"></i> 미리 듣기
                </button>
                <button class="dl-download bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition disabled:opacity-50">
                    <i class="fa-solid fa-download"></i> 다운로드
                </button>
            </div>
            <p class="text-[11px] text-gray-400 mt-3 leading-snug">
                다운로드 음성은 브라우저 안에서 AI 음성으로 만들어 앱 재생 목소리와 다를 수 있습니다.
                처음 한 번은 음성 모델(<span class="dl-model-size">약 90~330MB</span>)을 받느라 시간이 걸리고, 이후에는 저장된 모델을 씁니다.
            </p>
        </div>
    `;
    document.body.appendChild(modal);

    el('.dl-backdrop').addEventListener('click', closeModal);
    el('.dl-close').addEventListener('click', closeModal);
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
    });
    el('.dl-preview').addEventListener('click', () => run('preview'));
    el('.dl-download').addEventListener('click', () => run('download'));
    // Options changed -> old preview no longer matches
    ['.dl-speed', '.dl-voice', '.dl-with-ref', '.dl-repeat', '.dl-format'].forEach(s =>
        el(s).addEventListener('change', resetPreview));
}

function resetPreview() {
    const audio = el('.dl-audio');
    audio.pause();
    audio.removeAttribute('src');
    audio.classList.add('hidden');
    if (previewUrl) { URL.revokeObjectURL(previewUrl); previewUrl = null; }
}

function setStatus(text, kind = 'info') {
    const s = el('.dl-status');
    if (!text) { s.className = 'dl-status hidden'; return; }
    s.textContent = text;
    s.className = 'dl-status text-xs rounded-md px-3 py-2 mb-3 ' + (kind === 'error'
        ? 'bg-red-50 text-red-700 border border-red-200'
        : kind === 'ok'
            ? 'bg-green-50 text-green-700 border border-green-200'
            : 'bg-indigo-50 text-indigo-700 border border-indigo-200');
}

function setProgress(pct) {
    const wrap = el('.dl-progress');
    if (pct == null) { wrap.classList.add('hidden'); return; }
    wrap.classList.remove('hidden');
    el('.dl-progress-bar').style.width = `${Math.max(0, Math.min(100, pct))}%`;
}

function setBusy(b) {
    busy = b;
    el('.dl-preview').disabled = b;
    el('.dl-download').disabled = b;
}

function openModal(opts) {
    if (busy) return; // still generating the previous request
    if (!modal) buildModal();
    current = opts;
    el('.dl-ref').textContent = parseReference(opts.reference).label;
    const speed = String(Number(opts.defaultSpeed));
    el('.dl-speed').value = SPEEDS.includes(speed) ? speed : '1';
    resetPreview();
    setStatus('');
    setProgress(null);
    modal.classList.remove('hidden');
    el('.dl-speed').focus();
    hasWebGPU().then(gpu => {
        el('.dl-model-size').textContent = gpu ? '약 330MB, 빠른 GPU 모드' : '약 90MB';
    });
}

function closeModal() {
    if (!modal) return;
    resetPreview();
    modal.classList.add('hidden');
}

async function synthesize(text, voice, speed) {
    const key = `${voice}|${speed}|${text}`;
    if (audioCache.has(key)) return audioCache.get(key);

    const files = {};
    const tts = await loadTTS(p => {
        if (p.status === 'progress' && p.file && p.total) {
            files[p.file] = { loaded: p.loaded, total: p.total };
            const all = Object.values(files);
            const loaded = all.reduce((n, f) => n + f.loaded, 0);
            const total = all.reduce((n, f) => n + f.total, 0);
            setStatus(`음성 모델 내려받는 중… ${(loaded / 1048576).toFixed(0)} / ${(total / 1048576).toFixed(0)} MB (처음 한 번만)`);
            setProgress(loaded / total * 100);
        }
    });
    setProgress(null);
    setStatus((await hasWebGPU()) ? '음성을 만드는 중…' : '음성을 만드는 중… (이 기기에서는 수십 초 걸릴 수 있어요)');
    const audio = await tts.generate(text, { voice, speed: Number(speed) });
    const result = { samples: audio.audio, rate: audio.sampling_rate };
    audioCache.set(key, result);
    return result;
}

async function buildAudioBlob() {
    const speed = el('.dl-speed').value;
    const voice = el('.dl-voice').value;
    const format = el('.dl-format').value;
    const repeat = parseInt(el('.dl-repeat').value, 10) || 1;
    const withRef = el('.dl-with-ref').checked;
    const { label, spoken } = parseReference(current.reference);

    const verse = await synthesize(current.spokenText, voice, speed);
    const parts = [];
    if (withRef && spoken) {
        parts.push((await synthesize(spoken, voice, speed)).samples);
    }
    for (let i = 0; i < repeat; i++) parts.push(verse.samples);
    const samples = concatAudio(parts, verse.rate, 0.8);

    setStatus('파일로 저장하는 중…');
    const blob = format === 'mp3' ? await encodeMp3(samples, verse.rate) : encodeWav(samples, verse.rate);
    const safeLabel = label.replace(/:/g, '-').replace(/[^\w\-]+/g, '_');
    const speedTag = `${Number(speed).toFixed(1)}x`;
    const repeatTag = repeat > 1 ? `_${repeat}times` : '';
    return { blob, filename: `${safeLabel}_${speedTag}${repeatTag}.${format}` };
}

async function run(mode) {
    if (busy || !current) return;
    setBusy(true);
    try {
        const { blob, filename } = await buildAudioBlob();
        if (mode === 'preview') {
            resetPreview();
            previewUrl = URL.createObjectURL(blob);
            const audio = el('.dl-audio');
            audio.src = previewUrl;
            audio.classList.remove('hidden');
            audio.play().catch(() => {});
            setStatus('');
        } else {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();
            setTimeout(() => URL.revokeObjectURL(url), 10000);
            setStatus(`저장했습니다: ${filename}`, 'ok');
        }
    } catch (err) {
        console.error('Audio download failed:', err);
        setStatus('음성을 만들지 못했습니다. 인터넷 연결을 확인한 뒤 다시 시도해 주세요.', 'error');
    } finally {
        setProgress(null);
        setBusy(false);
    }
}

window.openVerseDownload = openModal;
