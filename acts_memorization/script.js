document.addEventListener('DOMContentLoaded', () => {
    const pdfUpload = document.getElementById('pdf-upload');
    const processBtn = document.getElementById('process-btn');
    const statusEl = document.getElementById('upload-status');
    const versesContainer = document.getElementById('verses-container');

    let currentUtterance = null;
    let playingVerseId = null;

    processBtn.addEventListener('click', async () => {
        const file = pdfUpload.files[0];
        if (!file) {
            alert('Please select a PDF file first.');
            return;
        }

        statusEl.classList.remove('hidden');
        statusEl.textContent = 'Extracting text...';
        processBtn.disabled = true;

        try {
            const arrayBuffer = await file.arrayBuffer();
            const text = await extractTextFromPDF(arrayBuffer);
            
            statusEl.textContent = 'Processing verses...';
            const verses = parseVerses(text);
            
            renderVerses(verses);
            statusEl.textContent = 'Done!';
            setTimeout(() => statusEl.classList.add('hidden'), 2000);
        } catch (error) {
            console.error('Error processing PDF:', error);
            statusEl.textContent = 'Error processing PDF. Check console.';
            statusEl.classList.add('text-red-500');
        } finally {
            processBtn.disabled = false;
        }
    });

    async function extractTextFromPDF(arrayBuffer) {
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let fullText = '';
        
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            const strings = content.items.map(item => item.str);
            fullText += strings.join(' ') + '\n';
        }
        
        return fullText;
    }

    function parseVerses(text) {
        let cleanedText = text.replace(/\s+/g, ' ').trim();
        const refRegex = /((?:[가-힣0-9]+\s+)?\d+:\d+[a-z]?(?:-\d+)?\s+[a-zA-Z0-9\s]+\s+\d+:\d+[a-z]?(?:-\d+)?)/gi;
        const parts = cleanedText.split(refRegex);
        let segments = [];
        
        if (parts.length > 2) {
            for (let i = 1; i < parts.length; i += 2) {
                const reference = parts[i].trim();
                const textBlock = parts[i+1] ? parts[i+1].trim() : '';
                
                let englishText = textBlock;
                let koreanText = '';
                
                const koreanIndex = textBlock.search(/[가-힣]/);
                if (koreanIndex !== -1) {
                    englishText = textBlock.substring(0, koreanIndex).trim();
                    koreanText = textBlock.substring(koreanIndex).trim();
                }
                
                englishText = englishText.replace(/^["'\s]+|["'\s]+$/g, '');
                koreanText = koreanText.replace(/^["'\s]+|["'\s]+$/g, '');
                
                if (englishText) {
                    segments.push({ reference, englishText, koreanText });
                }
            }
        } else {
            const verseRegex = /(?=\b\d+\s+[A-Z])/g;
            let rawSegments = cleanedText.split(verseRegex).map(v => v.trim()).filter(v => v.length > 0);
            
            if (rawSegments.length <= 1) {
                rawSegments = cleanedText.match(/[^.!?]+[.!?]+/g) || [cleanedText];
                rawSegments = rawSegments.map(v => v.trim());
            }
            
            segments = rawSegments.map(txt => ({
                reference: 'Verse',
                englishText: txt.replace(/^["'\s]+|["'\s]+$/g, ''),
                koreanText: ''
            }));
        }

        return segments;
    }

    function formatTextWithBreaks(text) {
        let result = '';
        const breakWords = ['and', 'but', 'so', 'because', 'who', 'which', 'that', 'for', 'if', 'when'];
        const wordRegex = /[a-zA-Z0-9가-힣]+/g;
        
        let lastIndex = 0;
        let match;
        
        while ((match = wordRegex.exec(text)) !== null) {
            let nonWord = text.substring(lastIndex, match.index);
            nonWord = nonWord.replace(/([,;:])(\s)/g, '$1<span class="break-point"></span>$2');
            
            const word = match[0];
            const startIdx = match.index;
            const endIdx = startIdx + word.length;
            
            if (breakWords.includes(word.toLowerCase())) {
                if (nonWord.match(/\s$/)) {
                    nonWord = nonWord.replace(/(\s)$/, '$1<span class="break-point"></span>');
                }
            }
            
            result += nonWord;
            result += `<span class="word cursor-pointer hover:text-indigo-600 transition-colors" data-start="${startIdx}" data-end="${endIdx}">${word}</span>`;
            
            lastIndex = wordRegex.lastIndex;
        }
        
        let tail = text.substring(lastIndex);
        tail = tail.replace(/([,;:])(\s)/g, '$1<span class="break-point"></span>$2');
        result += tail;
        
        return result;
    }

    function formatSpokenTextWithPauses(text) {
        const breakWords = ['and', 'but', 'so', 'because', 'who', 'which', 'that', 'for', 'if', 'when'];
        let spoken = text;
        breakWords.forEach(word => {
            const regex = new RegExp(`(?<![,;:.?!])\\s(${word})\\b`, 'gi');
            spoken = spoken.replace(regex, ', $1');
        });
        return spoken;
    }

    const globalSpeedSelect = document.getElementById('global-speed');
    if (globalSpeedSelect) {
        globalSpeedSelect.addEventListener('change', (e) => {
            const newSpeed = e.target.value;
            document.querySelectorAll('.speed-select').forEach(select => {
                select.value = newSpeed;
            });
        });
    }

    let availableVoices = [];
    const voiceSelect = document.getElementById('voice-select');

    function populateVoiceList() {
        if (typeof window.speechSynthesis === 'undefined') return;

        availableVoices = window.speechSynthesis.getVoices();
        const englishVoices = availableVoices.filter(voice => voice.lang.startsWith('en'));
        
        if (voiceSelect && englishVoices.length > 0) {
            voiceSelect.innerHTML = '';
            englishVoices.forEach(voice => {
                const option = document.createElement('option');
                option.textContent = `${voice.name}`;
                option.value = voice.voiceURI;
                voiceSelect.appendChild(option);
            });
            
            const defaultVoiceNames = ['Microsoft Zira', 'Microsoft David', 'Microsoft Mark', 'Samantha', 'Google US English', 'Alex', 'Daniel'];
            for (const name of defaultVoiceNames) {
                const index = englishVoices.findIndex(v => v.name.includes(name));
                if (index !== -1) {
                    voiceSelect.selectedIndex = index;
                    break;
                }
            }
        }
    }

    populateVoiceList();
    if (typeof window.speechSynthesis !== 'undefined' && window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = populateVoiceList;
    }

    let isPlayingSelected = false;
    let selectedQueue = [];
    let currentQueueIndex = 0;

    const selectAllCb = document.getElementById('select-all');
    const playSelectedBtn = document.getElementById('play-selected-btn');
    const stopGlobalBtn = document.getElementById('stop-global-btn');
    const loopSelectedCb = document.getElementById('loop-selected');
    const globalToolbar = document.getElementById('global-toolbar');

    if (selectAllCb) {
        selectAllCb.addEventListener('change', (e) => {
            const isChecked = e.target.checked;
            document.querySelectorAll('.verse-checkbox').forEach(cb => {
                cb.checked = isChecked;
            });
        });
    }

    if (playSelectedBtn) {
        playSelectedBtn.addEventListener('click', () => {
            const checkedBoxes = Array.from(document.querySelectorAll('.verse-checkbox:checked'));
            if (checkedBoxes.length === 0) return;
            
            selectedQueue = checkedBoxes.map(cb => cb.value);
            currentQueueIndex = 0;
            isPlayingSelected = true;
            
            playNextInQueue();
        });
    }

    if (stopGlobalBtn) {
        stopGlobalBtn.addEventListener('click', () => {
            isPlayingSelected = false;
            selectedQueue = [];
            stopSpeech();
        });
    }

    function playNextInQueue() {
        if (!isPlayingSelected) return;
        
        if (currentQueueIndex >= selectedQueue.length) {
            if (loopSelectedCb && loopSelectedCb.checked && selectedQueue.length > 0) {
                currentQueueIndex = 0;
            } else {
                isPlayingSelected = false;
                return;
            }
        }
        
        const verseId = selectedQueue[currentQueueIndex];
        const el = document.getElementById(verseId);
        if (el) {
            const playBtn = el.querySelector('.play-btn');
            if (playBtn) playBtn.click(); 
        } else {
            currentQueueIndex++;
            playNextInQueue();
        }
    }

    function renderVerses(verses) {
        stopSpeech();
        isPlayingSelected = false;
        selectedQueue = [];
        
        versesContainer.innerHTML = '';
        if (globalToolbar) globalToolbar.classList.add('hidden');
        
        if (verses.length === 0) {
            versesContainer.innerHTML = '<p class="text-gray-500 text-center py-8">No text found in PDF.</p>';
            return;
        }

        if (globalToolbar) globalToolbar.classList.remove('hidden');

        verses.forEach((verseObj, index) => {
            const verseId = `verse-${index}`;
            const verseDiv = document.createElement('div');
            verseDiv.id = verseId;
            verseDiv.className = 'p-5 rounded-lg border border-gray-200 shadow-sm transition-colors duration-200';
            
            const textHTML = formatTextWithBreaks(verseObj.englishText);
            const spokenText = formatSpokenTextWithPauses(verseObj.englishText); 
            
            let koreanHTML = '';
            if (verseObj.koreanText) {
                koreanHTML = `<div class="mt-4 pt-4 border-t border-gray-100 text-gray-600 text-base leading-relaxed">${verseObj.koreanText}</div>`;
            }

            verseDiv.innerHTML = `
                <div class="mb-2 flex items-center justify-between">
                    <div class="text-sm font-bold text-indigo-500 uppercase tracking-wider flex items-center gap-2">
                        <input type="checkbox" class="verse-checkbox rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer" value="${verseId}">
                        ${verseObj.reference}
                    </div>
                </div>
                <div class="mb-3 verse-text text-lg font-medium text-gray-800">${textHTML}</div>
                ${koreanHTML}
                <div class="mt-4 flex flex-wrap items-center gap-3 bg-gray-50 p-2 rounded border border-gray-200">
                    <button class="play-btn bg-green-100 text-green-700 hover:bg-green-200 p-2 rounded-full w-10 h-10 flex items-center justify-center transition" title="Play">
                        <i class="fa-solid fa-play"></i>
                    </button>
                    <button class="pause-btn bg-yellow-100 text-yellow-700 hover:bg-yellow-200 p-2 rounded-full w-10 h-10 flex items-center justify-center transition hidden" title="Pause">
                        <i class="fa-solid fa-pause"></i>
                    </button>
                    <button class="stop-btn bg-red-100 text-red-700 hover:bg-red-200 p-2 rounded-full w-10 h-10 flex items-center justify-center transition" title="Stop">
                        <i class="fa-solid fa-stop"></i>
                    </button>
                    <button class="loop-btn bg-gray-200 text-gray-600 hover:bg-gray-300 p-2 rounded-full w-10 h-10 flex items-center justify-center transition" title="Toggle Loop" data-loop="false">
                        <i class="fa-solid fa-repeat"></i>
                    </button>
                    
                    <div class="ml-auto flex items-center gap-2">
                        <label class="text-xs text-gray-500 font-medium">Speed:</label>
                        <select class="speed-select text-sm border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500 p-1">
                            <option value="0.5">0.5x</option>
                            <option value="0.8">0.8x</option>
                            <option value="1" selected>1.0x</option>
                        </select>
                    </div>
                </div>
            `;

            versesContainer.appendChild(verseDiv);

            const playBtn = verseDiv.querySelector('.play-btn');
            const pauseBtn = verseDiv.querySelector('.pause-btn');
            const stopBtn = verseDiv.querySelector('.stop-btn');
            const speedSelect = verseDiv.querySelector('.speed-select');
            const loopBtn = verseDiv.querySelector('.loop-btn');

            // --- Word Selection and A-B Loop Logic ---
            verseDiv.addEventListener('click', (e) => {
                const selection = window.getSelection();
                if (!selection.isCollapsed) return;
                
                if (e.target.classList.contains('word')) {
                    const wordStart = parseInt(e.target.dataset.start);
                    
                    verseDiv.dataset.resumeStart = wordStart;
                    delete verseDiv.dataset.resumeEnd;
                    
                    verseDiv.querySelectorAll('.word').forEach(el => {
                        el.classList.remove('bg-indigo-100', 'text-indigo-800', 'border-b-2', 'border-indigo-400');
                    });
                    e.target.classList.add('bg-indigo-100', 'text-indigo-800', 'border-b-2', 'border-indigo-400');
                    
                    stopSpeech();
                    const wordU = new SpeechSynthesisUtterance(e.target.textContent);
                    const selectedVoiceURI = voiceSelect?.value;
                    if (selectedVoiceURI && availableVoices.length > 0) {
                        const voice = availableVoices.find(v => v.voiceURI === selectedVoiceURI);
                        if (voice) wordU.voice = voice;
                    }
                    wordU.rate = parseFloat(speedSelect.value) * 0.7;
                    window.speechSynthesis.speak(wordU);
                } else if (e.target.closest('.verse-text')) {
                     delete verseDiv.dataset.resumeStart;
                     delete verseDiv.dataset.resumeEnd;
                     verseDiv.querySelectorAll('.word').forEach(el => {
                        el.classList.remove('bg-indigo-100', 'text-indigo-800', 'border-b-2', 'border-indigo-400');
                     });
                }
            });

            verseDiv.addEventListener('mouseup', () => {
                const selection = window.getSelection();
                if (selection.isCollapsed) return;
                
                if (selection.rangeCount > 0) {
                    const range = selection.getRangeAt(0);
                    const container = range.commonAncestorContainer;
                    const parentEl = container.nodeType === 1 ? container : container.parentElement;
                    
                    const closestVerseText = parentEl.closest('.verse-text');
                    if (closestVerseText) {
                        const wordsInVerse = Array.from(closestVerseText.querySelectorAll('.word'));
                        const selectedWords = wordsInVerse.filter(word => selection.containsNode(word, true));
                        
                        if (selectedWords.length > 0) {
                            const startWord = selectedWords[0];
                            const endWord = selectedWords[selectedWords.length - 1];
                            
                            verseDiv.dataset.resumeStart = startWord.dataset.start;
                            verseDiv.dataset.resumeEnd = endWord.dataset.end;
                            
                            verseDiv.querySelectorAll('.word').forEach(el => {
                                el.classList.remove('bg-indigo-100', 'text-indigo-800', 'border-b-2', 'border-indigo-400');
                            });
                            
                            selectedWords.forEach(w => w.classList.add('bg-indigo-100', 'text-indigo-800', 'border-b-2', 'border-indigo-400'));
                            selection.removeAllRanges();
                        }
                    }
                }
            });

            playBtn.addEventListener('click', () => {
                const speed = parseFloat(speedSelect.value);
                const resumeStart = verseDiv.dataset.resumeStart ? parseInt(verseDiv.dataset.resumeStart) : 0;
                const resumeEnd = verseDiv.dataset.resumeEnd ? parseInt(verseDiv.dataset.resumeEnd) : null;
                playVerse(verseId, verseObj.englishText, spokenText, speed, playBtn, pauseBtn, resumeStart, resumeEnd);
            });

            pauseBtn.addEventListener('click', () => {
                if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
                    window.speechSynthesis.pause();
                    pauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
                    verseDiv.classList.add('paused');
                } else if (window.speechSynthesis.paused) {
                    window.speechSynthesis.resume();
                    pauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
                    verseDiv.classList.remove('paused');
                }
            });

            stopBtn.addEventListener('click', () => {
                isPlayingSelected = false; // cancel global queue if stopped manually
                stopSpeech();
            });

            loopBtn.addEventListener('click', () => {
                const isLooping = loopBtn.getAttribute('data-loop') === 'true';
                if (isLooping) {
                    loopBtn.setAttribute('data-loop', 'false');
                    loopBtn.classList.replace('bg-indigo-100', 'bg-gray-200');
                    loopBtn.classList.replace('text-indigo-700', 'text-gray-600');
                } else {
                    loopBtn.setAttribute('data-loop', 'true');
                    loopBtn.classList.replace('bg-gray-200', 'bg-indigo-100');
                    loopBtn.classList.replace('text-gray-600', 'text-indigo-700');
                }
            });
        });
    }

    function getSpokenIndex(originalText, spokenText, originalIndex) {
        let sIdx = 0;
        let oIdx = 0;
        while (oIdx < originalIndex && sIdx < spokenText.length && oIdx < originalText.length) {
            if (spokenText[sIdx] === originalText[oIdx]) {
                sIdx++;
                oIdx++;
            } else {
                if (spokenText[sIdx] === ',') sIdx++;
                else if (spokenText[sIdx] === ' ' && originalText[oIdx] !== ' ') sIdx++;
                else { sIdx++; oIdx++; }
            }
        }
        return sIdx;
    }

    function playVerse(verseId, originalText, spokenText, speed, playBtn, pauseBtn, resumeStart = 0, resumeEnd = null) {
        if (playingVerseId === verseId && window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
            pauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            document.getElementById(verseId).classList.remove('paused');
            return;
        }

        stopSpeech();
        playingVerseId = verseId;
        const verseEl = document.getElementById(verseId);
        const verseTextEl = verseEl.querySelector('.verse-text');
        
        verseEl.classList.add('playing');
        playBtn.classList.add('hidden');
        pauseBtn.classList.remove('hidden');
        pauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';

        let spokenResumeIdx = 0;
        let spokenEndIdx = spokenText.length;
        if (resumeStart > 0 || resumeEnd !== null) {
            spokenResumeIdx = getSpokenIndex(originalText, spokenText, resumeStart);
            if (resumeEnd !== null) {
                spokenEndIdx = getSpokenIndex(originalText, spokenText, resumeEnd);
            }
        }
        
        const textToSpeak = spokenText.substring(spokenResumeIdx, spokenEndIdx);
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = 'en-US';
        
        const selectedVoiceURI = voiceSelect?.value;
        if (selectedVoiceURI && availableVoices.length > 0) {
            const voice = availableVoices.find(v => v.voiceURI === selectedVoiceURI);
            if (voice) {
                utterance.voice = voice;
            }
        }
        
        const BASELINE_SPEED = 0.7;
        utterance.rate = speed * BASELINE_SPEED;
        
        let hasFiredEnd = false;

        utterance.onboundary = (event) => {
            if (event.name !== 'word') return;
            
            let charLen = event.charLength;
            if (!charLen) {
                let remaining = textToSpeak.substring(event.charIndex);
                let match = remaining.match(/^[^\s,;:.?!]+/);
                charLen = match ? match[0].length : 1;
            }
            
            const actualCharIndex = spokenResumeIdx + event.charIndex;
            
            let sIdx = 0;
            let oIdx = 0;
            while (sIdx < actualCharIndex && sIdx < spokenText.length && oIdx < originalText.length) {
                if (spokenText[sIdx] === originalText[oIdx]) {
                    sIdx++;
                    oIdx++;
                } else {
                    if (spokenText[sIdx] === ',') sIdx++;
                    else if (spokenText[sIdx] === ' ' && originalText[oIdx] !== ' ') sIdx++;
                    else { sIdx++; oIdx++; }
                }
            }
            const startIdx = oIdx;
            
            let e_sIdx = sIdx;
            let e_oIdx = oIdx;
            const targetSIdx = actualCharIndex + charLen;
            while (e_sIdx < targetSIdx && e_sIdx < spokenText.length && e_oIdx < originalText.length) {
                if (spokenText[e_sIdx] === originalText[e_oIdx]) {
                    e_sIdx++;
                    e_oIdx++;
                } else {
                    if (spokenText[e_sIdx] === ',') e_sIdx++;
                    else if (spokenText[e_sIdx] === ' ' && originalText[e_oIdx] !== ' ') e_sIdx++;
                    else { e_sIdx++; e_oIdx++; }
                }
            }
            const endIdx = e_oIdx;
            
            if (verseTextEl) {
                verseTextEl.querySelectorAll('.karaoke-highlight').forEach(el => el.classList.remove('karaoke-highlight'));
                
                const words = verseTextEl.querySelectorAll('.word');
                words.forEach(wordEl => {
                    const wStart = parseInt(wordEl.dataset.start);
                    const wEnd = parseInt(wordEl.dataset.end);
                    if (wStart < endIdx && wEnd > startIdx) {
                        wordEl.classList.add('karaoke-highlight');
                    }
                });
            }
        };

        utterance.onend = () => {
            if (hasFiredEnd) return;
            hasFiredEnd = true;
            
            if (verseTextEl) {
                verseTextEl.querySelectorAll('.karaoke-highlight').forEach(el => el.classList.remove('karaoke-highlight'));
            }
            
            resetVerseUI(verseId, playBtn, pauseBtn);
            if (playingVerseId === verseId) {
                playingVerseId = null;
            }
            
            const loopBtn = verseEl.querySelector('.loop-btn');
            const isLooping = loopBtn.getAttribute('data-loop') === 'true';

            if (isLooping) {
                playVerse(verseId, originalText, spokenText, speed, playBtn, pauseBtn, resumeStart, resumeEnd);
            } else if (isPlayingSelected) {
                currentQueueIndex++;
                playNextInQueue();
            }
        };

        utterance.onerror = (e) => {
            if (hasFiredEnd) return;
            hasFiredEnd = true;
            console.error('Speech synthesis error:', e.error || e, e.message || '');
            resetVerseUI(verseId, playBtn, pauseBtn);
            if (playingVerseId === verseId) {
                playingVerseId = null;
            }
        };

        currentUtterance = utterance;
        window.speechSynthesis.speak(utterance);
    }

    function stopSpeech() {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
        }
        
        if (playingVerseId) {
            const el = document.getElementById(playingVerseId);
            if (el) {
                const playBtn = el.querySelector('.play-btn');
                const pauseBtn = el.querySelector('.pause-btn');
                resetVerseUI(playingVerseId, playBtn, pauseBtn);
            }
            playingVerseId = null;
        }
    }

    function resetVerseUI(verseId, playBtn, pauseBtn) {
        const el = document.getElementById(verseId);
        if (el) {
            el.classList.remove('playing', 'paused');
            if (playBtn) playBtn.classList.remove('hidden');
            if (pauseBtn) pauseBtn.classList.add('hidden');
            
            const verseTextEl = el.querySelector('.verse-text');
            if (verseTextEl) {
                verseTextEl.querySelectorAll('.karaoke-highlight').forEach(w => w.classList.remove('karaoke-highlight'));
            }
        }
    }

    if (typeof DEFAULT_ACTS_TEXT !== 'undefined') {
        const verses = parseVerses(DEFAULT_ACTS_TEXT);
        renderVerses(verses);
    }
});
