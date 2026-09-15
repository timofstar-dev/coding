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
        
        // Try to match the specific flashcard format:
        // [Korean Ref] [English Ref] [English Text] [Korean Text]
        // Example: "행 1:8 Acts 1:8" or "행 25:11b Acts 25:11b"
        const refRegex = /((?:[가-힣0-9]+\s+)?\d+:\d+[a-z]?(?:-\d+)?\s+[a-zA-Z0-9\s]+\s+\d+:\d+[a-z]?(?:-\d+)?)/gi;
        
        const parts = cleanedText.split(refRegex);
        let segments = [];
        
        if (parts.length > 2) {
            // Custom PDF layout matched
            for (let i = 1; i < parts.length; i += 2) {
                const reference = parts[i].trim();
                const textBlock = parts[i+1] ? parts[i+1].trim() : '';
                
                let englishText = textBlock;
                let koreanText = '';
                
                // Split English and Korean by the first Korean character
                const koreanIndex = textBlock.search(/[가-힣]/);
                if (koreanIndex !== -1) {
                    englishText = textBlock.substring(0, koreanIndex).trim();
                    koreanText = textBlock.substring(koreanIndex).trim();
                }
                
                // Strip leading/trailing quotes from the extracted text
                englishText = englishText.replace(/^["'\s]+|["'\s]+$/g, '');
                koreanText = koreanText.replace(/^["'\s]+|["'\s]+$/g, '');
                
                if (englishText) {
                    segments.push({ reference, englishText, koreanText });
                }
            }
        } else {
            // Fallback for regular texts
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
        // Insert a reading break (/) after commas, semicolons, colons
        let formatted = text.replace(/([,;:]) /g, '$1 <span class="break-point">/</span> ');
        
        // Insert before certain conjunctions and prepositions for long phrases
        // Use word boundary \b
        const breakWords = ['and', 'but', 'so', 'because', 'who', 'which', 'that', 'for', 'if', 'when'];
        const breakRegex = new RegExp(`\\s(${breakWords.join('|')})\\b`, 'gi');
        
        formatted = formatted.replace(breakRegex, ' <span class="break-point">/</span> $1');
        
        return formatted;
    }

    function formatSpokenTextWithPauses(text) {
        // Add a comma before break words so the TTS engine pauses naturally.
        const breakWords = ['and', 'but', 'so', 'because', 'who', 'which', 'that', 'for', 'if', 'when'];
        let spoken = text;
        
        breakWords.forEach(word => {
            // Only add a comma if there isn't already a punctuation mark before the space
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
            
            // Try to set Samantha as the fixed default voice, fallback to others if not found
            const defaultVoiceNames = ['Samantha', 'Google US English', 'Alex', 'Daniel'];
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

            playBtn.addEventListener('click', () => {
                const speed = parseFloat(speedSelect.value);
                playVerse(verseId, spokenText, speed, playBtn, pauseBtn);
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

    function playVerse(verseId, text, speed, playBtn, pauseBtn) {
        if (playingVerseId === verseId && window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
            pauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            document.getElementById(verseId).classList.remove('paused');
            return;
        }

        stopSpeech();
        playingVerseId = verseId;
        const verseEl = document.getElementById(verseId);
        
        verseEl.classList.add('playing');
        playBtn.classList.add('hidden');
        pauseBtn.classList.remove('hidden');
        pauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        
        const selectedVoiceURI = voiceSelect?.value;
        if (selectedVoiceURI && availableVoices.length > 0) {
            const voice = availableVoices.find(v => v.voiceURI === selectedVoiceURI);
            if (voice) {
                utterance.voice = voice;
            }
        }
        
        // The user requested that the old 0.7x speed becomes the new baseline (1.0x in UI).
        const BASELINE_SPEED = 0.7;
        utterance.rate = speed * BASELINE_SPEED;
        
        let hasFiredEnd = false;

        utterance.onend = () => {
            if (hasFiredEnd) return;
            hasFiredEnd = true;
            resetVerseUI(verseId, playBtn, pauseBtn);
            playingVerseId = null;
            
            const loopBtn = verseEl.querySelector('.loop-btn');
            const isLooping = loopBtn.getAttribute('data-loop') === 'true';

            if (isLooping) {
                playVerse(verseId, text, speed, playBtn, pauseBtn);
            } else if (isPlayingSelected) {
                currentQueueIndex++;
                playNextInQueue();
            }
        };

        utterance.onerror = (e) => {
            if (hasFiredEnd) return;
            hasFiredEnd = true;
            console.error('Speech synthesis error:', e);
            resetVerseUI(verseId, playBtn, pauseBtn);
            playingVerseId = null;
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
        }
    }

    // Load default Acts verses if available, now safely after all const declarations
    if (typeof DEFAULT_ACTS_TEXT !== 'undefined') {
        const verses = parseVerses(DEFAULT_ACTS_TEXT);
        renderVerses(verses);
    }
});
