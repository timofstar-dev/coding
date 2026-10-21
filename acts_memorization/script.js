document.addEventListener('DOMContentLoaded', () => {
    const pdfUpload = document.getElementById('pdf-upload');
    const processBtn = document.getElementById('process-btn');
    const statusEl = document.getElementById('upload-status');
    const versesContainer = document.getElementById('verses-container');

    let currentUtterance = null;
    let playingVerseId = null;

    // --- Helper Utilities for DOM & Geometry ---
    function getEventElement(target) {
        if (!target) return null;
        return target.nodeType === Node.TEXT_NODE ? target.parentElement : target;
    }

    function findClosestWordInVerse(verseTextEl, clientX, clientY) {
        if (!verseTextEl) return null;
        const words = Array.from(verseTextEl.querySelectorAll('.word'));
        if (words.length === 0) return null;

        let closestWord = null;
        let minDistance = Infinity;

        for (const w of words) {
            const rect = w.getBoundingClientRect();
            const dx = clientX < rect.left ? rect.left - clientX : (clientX > rect.right ? clientX - rect.right : 0);
            const dy = clientY < rect.top ? rect.top - clientY : (clientY > rect.bottom ? clientY - rect.bottom : 0);
            const dist = Math.hypot(dx, dy);

            if (dist < minDistance) {
                minDistance = dist;
                closestWord = w;
            }
        }

        if (minDistance < 80) {
            return closestWord;
        }
        return null;
    }

    // Cache word element lists per verse (words never change after render)
    const verseWordsCache = new WeakMap();
    function getVerseWords(verseDiv) {
        if (!verseDiv) return [];
        let words = verseWordsCache.get(verseDiv);
        if (!words) {
            words = Array.from(verseDiv.querySelectorAll('.verse-text .word'));
            verseWordsCache.set(verseDiv, words);
        }
        return words;
    }

    // Line-aware hit test used while dragging: always returns a word for a non-empty verse,
    // so the selection keeps tracking the pointer past line ends, in line gaps, or outside the text block.
    function findDragTargetWord(verseDiv, clientX, clientY) {
        const words = getVerseWords(verseDiv);
        if (words.length === 0) return null;

        const rects = words.map(w => w.getBoundingClientRect());
        const first = rects[0];
        const last = rects[rects.length - 1];

        // Well above the text -> start, well below (e.g. into the next verse) -> end
        if (clientY < first.top - first.height) return words[0];
        if (clientY > last.bottom + last.height) return words[words.length - 1];

        // Otherwise: nearest line first, then nearest word horizontally on that line
        let bestIdx = 0;
        let bestDy = Infinity;
        let bestDx = Infinity;
        for (let i = 0; i < rects.length; i++) {
            const r = rects[i];
            const dy = clientY < r.top ? r.top - clientY : (clientY > r.bottom ? clientY - r.bottom : 0);
            const dx = clientX < r.left ? r.left - clientX : (clientX > r.right ? clientX - r.right : 0);
            if (dy < bestDy - 1) {
                bestIdx = i; bestDy = dy; bestDx = dx;
            } else if (Math.abs(dy - bestDy) <= 1 && dx < bestDx) {
                bestIdx = i; bestDy = Math.min(dy, bestDy); bestDx = dx;
            }
        }
        return words[bestIdx];
    }

    // --- PDF Upload and Processing ---
    if (processBtn && pdfUpload) {
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
    }

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

    // Improved word regex supporting apostrophes, contractions (don't, apostles', God's)
    const WORD_REGEX = /[a-zA-Z0-9가-힣]+(?:['’][a-zA-Z0-9가-힣]*)?/g;

    function formatTextWithBreaks(text) {
        let result = '';
        const breakWords = ['and', 'but', 'so', 'because', 'who', 'which', 'that', 'for', 'if', 'when'];
        
        let lastIndex = 0;
        let match;
        
        WORD_REGEX.lastIndex = 0;
        while ((match = WORD_REGEX.exec(text)) !== null) {
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
            result += `<span class="word" data-start="${startIdx}" data-end="${endIdx}">${word}</span>`;
            
            lastIndex = WORD_REGEX.lastIndex;
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

    // --- Global Controls ---
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
            if (checkedBoxes.length === 0) {
                alert('Please select at least one verse using the checkboxes.');
                return;
            }
            
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

    // --- Floating Quick Action Bar ---
    let floatingBar = document.getElementById('floating-selection-bar');
    if (!floatingBar) {
        floatingBar = document.createElement('div');
        floatingBar.id = 'floating-selection-bar';
        floatingBar.className = 'floating-action-bar hidden';
        floatingBar.innerHTML = `
            <span class="floating-info text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200"></span>
            <button class="floating-play-btn bg-indigo-600 hover:bg-indigo-700 text-white px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-sm transition">
                <i class="fa-solid fa-play text-[10px]"></i> 재생
            </button>
            <button class="floating-loop-btn bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1 transition">
                <i class="fa-solid fa-repeat text-[10px]"></i> 구간 반복
            </button>
            <button class="floating-clear-btn text-gray-400 hover:text-gray-600 px-1 py-0.5 text-xs transition" title="선택 해제">
                <i class="fa-solid fa-xmark"></i>
            </button>
        `;
        document.body.appendChild(floatingBar);
    }

    let activeSelectedVerseDiv = null;

    floatingBar.querySelector('.floating-play-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        if (activeSelectedVerseDiv) {
            const playBtn = activeSelectedVerseDiv.querySelector('.play-btn');
            if (playBtn) playBtn.click();
        }
    });

    floatingBar.querySelector('.floating-loop-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        if (activeSelectedVerseDiv) {
            const loopBtn = activeSelectedVerseDiv.querySelector('.loop-btn');
            if (loopBtn) {
                loopBtn.setAttribute('data-loop', 'true');
                loopBtn.classList.replace('bg-gray-200', 'bg-indigo-100');
                loopBtn.classList.replace('text-gray-600', 'text-indigo-700');
            }
            const playBtn = activeSelectedVerseDiv.querySelector('.play-btn');
            if (playBtn) playBtn.click();
        }
    });

    floatingBar.querySelector('.floating-clear-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        if (activeSelectedVerseDiv) {
            clearVerseSelection(activeSelectedVerseDiv);
        } else {
            hideFloatingBar();
        }
    });

    function showFloatingBar(verseDiv, selectedWords) {
        if (!selectedWords || selectedWords.length === 0) {
            hideFloatingBar();
            return;
        }

        activeSelectedVerseDiv = verseDiv;

        let minLeft = Infinity;
        let maxRight = -Infinity;
        let minTop = Infinity;

        for (const w of selectedWords) {
            const r = w.getBoundingClientRect();
            if (r.left < minLeft) minLeft = r.left;
            if (r.right > maxRight) maxRight = r.right;
            if (r.top < minTop) minTop = r.top;
        }

        const centerX = (minLeft + maxRight) / 2 + window.scrollX;
        const topY = minTop + window.scrollY;

        const infoSpan = floatingBar.querySelector('.floating-info');
        infoSpan.textContent = `${selectedWords.length}단어 선택됨`;

        floatingBar.style.left = `${centerX}px`;
        floatingBar.style.top = `${topY}px`;

        if (minTop < 65) {
            floatingBar.style.transform = 'translate(-50%, calc(100% + 15px))';
        } else {
            floatingBar.style.transform = 'translate(-50%, -100%) translateY(-10px)';
        }

        floatingBar.classList.remove('hidden');
    }

    function hideFloatingBar() {
        floatingBar.classList.add('hidden');
        activeSelectedVerseDiv = null;
    }

    // --- Selection and Range State Management ---
    let selectedVerseDiv = null; // verse that currently holds a word selection

    function setVerseWordSelection(verseDiv, startWordEl, endWordEl, showBar = true) {
        if (!verseDiv || !startWordEl || !endWordEl) return;

        const allWords = getVerseWords(verseDiv);
        const idx1 = allWords.indexOf(startWordEl);
        const idx2 = allWords.indexOf(endWordEl);

        if (idx1 === -1 || idx2 === -1) return;

        // Deselect the previously selected verse (tracked directly instead of scanning every verse on each drag frame)
        if (selectedVerseDiv && selectedVerseDiv !== verseDiv) {
            selectedVerseDiv.querySelectorAll('.word.word-selected').forEach(w => w.classList.remove('word-selected'));
            delete selectedVerseDiv.dataset.resumeStart;
            delete selectedVerseDiv.dataset.resumeEnd;
            updateVerseBadge(selectedVerseDiv);
        }
        selectedVerseDiv = verseDiv;

        const minIdx = Math.min(idx1, idx2);
        const maxIdx = Math.max(idx1, idx2);

        const selectedWords = [];
        allWords.forEach((wordEl, idx) => {
            const inRange = idx >= minIdx && idx <= maxIdx;
            wordEl.classList.toggle('word-selected', inRange);
            if (inRange) selectedWords.push(wordEl);
        });

        verseDiv.dataset.resumeStart = allWords[minIdx].dataset.start;
        if (minIdx === maxIdx) {
            delete verseDiv.dataset.resumeEnd;
        } else {
            verseDiv.dataset.resumeEnd = allWords[maxIdx].dataset.end;
        }

        updateVerseBadge(verseDiv);

        if (showBar && selectedWords.length > 1) {
            showFloatingBar(verseDiv, selectedWords);
        } else if (selectedWords.length <= 1) {
            hideFloatingBar();
        }
    }

    function clearVerseSelection(verseDiv) {
        if (!verseDiv) return;
        if (selectedVerseDiv === verseDiv) selectedVerseDiv = null;
        verseDiv.querySelectorAll('.word.word-selected').forEach(w => w.classList.remove('word-selected'));
        delete verseDiv.dataset.resumeStart;
        delete verseDiv.dataset.resumeEnd;
        updateVerseBadge(verseDiv);
        hideFloatingBar();
    }

    function updateVerseBadge(verseDiv) {
        const badge = verseDiv.querySelector('.verse-range-badge');
        if (!badge) return;

        const selectedWords = Array.from(verseDiv.querySelectorAll('.word.word-selected'));
        if (selectedWords.length > 1) {
            const previewText = selectedWords.length <= 4 
                ? selectedWords.map(w => w.textContent).join(' ')
                : `${selectedWords[0].textContent} ... ${selectedWords[selectedWords.length - 1].textContent}`;
            
            badge.querySelector('.range-words').textContent = `"${previewText}"`;
            badge.querySelector('.range-count').textContent = selectedWords.length;
            badge.classList.remove('hidden');
        } else if (selectedWords.length === 1) {
            badge.querySelector('.range-words').textContent = `"${selectedWords[0].textContent}" 부터 끝까지`;
            badge.querySelector('.range-count').textContent = '1';
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
    }

    // --- Interactive Drag-Selection Engine ---
    let isMouseDown = false;
    let mouseStartWord = null;
    let mouseStartPos = { x: 0, y: 0 };
    let isDraggingWords = false;
    let activeDragVerseDiv = null;
    let lastClickedWord = null;
    let lastClickedVerseDiv = null;
    let dragJustCompleted = false;
    let dragCompletedTimer = null;

    const MOUSE_DRAG_THRESHOLD = 4; // px of movement before a press becomes a drag
    const TOUCH_DRAG_THRESHOLD = 6;
    const LONG_PRESS_MS = 280;      // hold time that arms free-direction touch selection

    // rAF-throttled drag updates: at most one selection recalculation per frame,
    // and the latest pointer position is always applied (flushed on release).
    let pendingDrag = null;
    let dragRafId = 0;
    let lastDragEndWord = null;

    function applyDragUpdate(drag) {
        const endWord = findDragTargetWord(drag.verseDiv, drag.x, drag.y);
        if (!endWord || endWord === lastDragEndWord) return;
        lastDragEndWord = endWord;
        setVerseWordSelection(drag.verseDiv, drag.startWord, endWord, false);
    }

    function scheduleDragUpdate(verseDiv, startWord, x, y) {
        pendingDrag = { verseDiv, startWord, x, y };
        if (dragRafId) return;
        dragRafId = requestAnimationFrame(() => {
            dragRafId = 0;
            const drag = pendingDrag;
            pendingDrag = null;
            if (drag) applyDragUpdate(drag);
        });
    }

    function flushDragUpdate() {
        if (dragRafId) {
            cancelAnimationFrame(dragRafId);
            dragRafId = 0;
        }
        if (pendingDrag) {
            const drag = pendingDrag;
            pendingDrag = null;
            applyDragUpdate(drag);
        }
    }

    function cancelDragUpdate() {
        if (dragRafId) cancelAnimationFrame(dragRafId);
        dragRafId = 0;
        pendingDrag = null;
        lastDragEndWord = null;
    }

    function markDragCompleted(verseDiv) {
        dragJustCompleted = true;
        if (dragCompletedTimer) clearTimeout(dragCompletedTimer);
        dragCompletedTimer = setTimeout(() => {
            dragJustCompleted = false;
        }, 350);

        const selected = getVerseWords(verseDiv).filter(w => w.classList.contains('word-selected'));
        if (selected.length > 1) {
            showFloatingBar(verseDiv, selected);
        } else {
            hideFloatingBar();
        }

        // Clear any native browser selection so our custom highlight is crisp
        window.getSelection()?.removeAllRanges();
    }

    // 1. Mouse Drag
    document.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return; // Only primary button

        const target = getEventElement(e.target);
        if (!target) return;

        let word = target.closest('.word');
        const verseText = target.closest('.verse-text');

        // If clicked in whitespace or punctuation inside verse-text, find the closest word
        if (!word && verseText) {
            word = findClosestWordInVerse(verseText, e.clientX, e.clientY);
        }

        if (word) {
            const verse = word.closest('[id^="verse-"]');
            if (verse) {
                isMouseDown = true;
                mouseStartWord = word;
                mouseStartPos = { x: e.clientX, y: e.clientY };
                isDraggingWords = false;
                activeDragVerseDiv = verse;
                // Block native text selection / drag-and-drop, which can swallow mousemove events mid-drag
                e.preventDefault();
            }
        } else {
            const isFloatingBar = target.closest('#floating-selection-bar');
            const isBadge = target.closest('.verse-range-badge');
            if (!isFloatingBar && !isBadge && !verseText) {
                hideFloatingBar();
            }
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (!isMouseDown || !activeDragVerseDiv || !mouseStartWord) return;

        // Button already released (e.g. mouseup happened outside the window)
        if (e.buttons === 0) {
            finishMouseDrag();
            return;
        }

        if (!isDraggingWords) {
            const dist = Math.hypot(e.clientX - mouseStartPos.x, e.clientY - mouseStartPos.y);
            if (dist <= MOUSE_DRAG_THRESHOLD) return;
            isDraggingWords = true;
            lastDragEndWord = null;
            hideFloatingBar(); // hide stale bar from a previous selection while dragging
        }

        e.preventDefault();
        scheduleDragUpdate(activeDragVerseDiv, mouseStartWord, e.clientX, e.clientY);
    });

    function finishMouseDrag() {
        if (!isMouseDown) return;
        if (isDraggingWords && activeDragVerseDiv) {
            flushDragUpdate(); // make sure the final pointer position is reflected
            markDragCompleted(activeDragVerseDiv);
        }
        cancelDragUpdate();

        isMouseDown = false;
        isDraggingWords = false;
        activeDragVerseDiv = null;
        mouseStartWord = null;
    }

    window.addEventListener('mouseup', finishMouseDrag);

    // 2. Touch Drag / Slide for Mobile & Tablets
    //    - Horizontal swipe on a verse selects immediately (vertical swipe still scrolls the page)
    //    - Long-press then drag selects in any direction (across lines)
    let touchStartWord = null;
    let touchStartPos = { x: 0, y: 0 };
    let isTouchDragging = false;
    let touchVerseDiv = null;
    let touchArmed = false;
    let touchLongPressTimer = null;

    function cancelTouchSelection() {
        if (touchLongPressTimer) clearTimeout(touchLongPressTimer);
        touchLongPressTimer = null;
        if (isTouchDragging) cancelDragUpdate();
        touchStartWord = null;
        touchVerseDiv = null;
        isTouchDragging = false;
        touchArmed = false;
    }

    document.addEventListener('touchstart', (e) => {
        if (e.touches.length !== 1) {
            cancelTouchSelection();
            return;
        }
        const touch = e.touches[0];
        const target = getEventElement(touch.target);
        if (!target) return;

        let word = target.closest('.word');
        const verseText = target.closest('.verse-text');
        if (!word && verseText) {
            word = findClosestWordInVerse(verseText, touch.clientX, touch.clientY);
        }
        const verse = word ? word.closest('[id^="verse-"]') : null;
        if (!word || !verse) return;

        cancelTouchSelection();
        touchStartWord = word;
        touchStartPos = { x: touch.clientX, y: touch.clientY };
        touchVerseDiv = verse;

        touchLongPressTimer = setTimeout(() => {
            touchLongPressTimer = null;
            if (!touchStartWord || isTouchDragging) return;
            touchArmed = true;
            hideFloatingBar();
            setVerseWordSelection(touchVerseDiv, touchStartWord, touchStartWord, false);
        }, LONG_PRESS_MS);
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
        if (!touchStartWord || !touchVerseDiv) return;
        if (e.touches.length !== 1) {
            cancelTouchSelection();
            return;
        }
        const touch = e.touches[0];

        if (!isTouchDragging) {
            if (!touchArmed) {
                const dx = touch.clientX - touchStartPos.x;
                const dy = touch.clientY - touchStartPos.y;
                if (Math.hypot(dx, dy) < TOUCH_DRAG_THRESHOLD) return;
                // Not long-pressed: mostly vertical movement means the user wants to scroll
                if (Math.abs(dx) <= Math.abs(dy)) {
                    cancelTouchSelection();
                    return;
                }
            }
            isTouchDragging = true;
            if (touchLongPressTimer) {
                clearTimeout(touchLongPressTimer);
                touchLongPressTimer = null;
            }
            lastDragEndWord = null;
            hideFloatingBar();
        }

        if (e.cancelable) e.preventDefault();
        scheduleDragUpdate(touchVerseDiv, touchStartWord, touch.clientX, touch.clientY);
    }, { passive: false });

    document.addEventListener('touchend', (e) => {
        if (isTouchDragging && touchVerseDiv) {
            // Suppress emulated mouse events / click after a drag
            if (e.cancelable) e.preventDefault();
            flushDragUpdate();
            markDragCompleted(touchVerseDiv);
        }
        cancelTouchSelection();
    }, { passive: false });

    document.addEventListener('touchcancel', cancelTouchSelection);

    // Reset any in-progress drag if the window loses focus mid-gesture
    window.addEventListener('blur', () => {
        finishMouseDrag();
        cancelTouchSelection();
    });

    // --- Render Verses ---
    function renderVerses(verses) {
        stopSpeech();
        isPlayingSelected = false;
        selectedQueue = [];
        hideFloatingBar();
        
        selectedVerseDiv = null;
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
            verseDiv.className = 'p-5 rounded-lg border border-gray-200 shadow-sm transition-colors duration-200 relative bg-white';
            
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
                
                <!-- Range Selection Status Badge -->
                <div class="verse-range-badge hidden text-xs bg-indigo-50 text-indigo-700 border border-indigo-200 px-3 py-1.5 rounded-md flex items-center justify-between mb-3">
                    <div class="flex items-center gap-1.5 truncate">
                        <i class="fa-solid fa-scissors text-indigo-500"></i>
                        <span>선택 구간: <strong class="range-words text-indigo-900 font-semibold truncate"></strong> (<span class="range-count"></span>단어)</span>
                    </div>
                    <button class="clear-range-btn text-xs text-indigo-600 hover:text-indigo-900 font-semibold underline shrink-0 ml-2" title="선택을 해제하고 전체 재생 모드로 전환">전체 재생</button>
                </div>

                ${koreanHTML}

                <div class="mt-4 flex flex-wrap items-center gap-3 bg-gray-50 p-2 rounded border border-gray-200">
                    <button class="play-btn bg-green-100 text-green-700 hover:bg-green-200 p-2 rounded-full w-10 h-10 flex items-center justify-center transition shadow-sm" title="Play">
                        <i class="fa-solid fa-play"></i>
                    </button>
                    <button class="pause-btn bg-yellow-100 text-yellow-700 hover:bg-yellow-200 p-2 rounded-full w-10 h-10 flex items-center justify-center transition shadow-sm hidden" title="Pause">
                        <i class="fa-solid fa-pause"></i>
                    </button>
                    <button class="stop-btn bg-red-100 text-red-700 hover:bg-red-200 p-2 rounded-full w-10 h-10 flex items-center justify-center transition shadow-sm" title="Stop">
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
            const verseTextEl = verseDiv.querySelector('.verse-text');
            const clearRangeBtn = verseDiv.querySelector('.clear-range-btn');

            // Prevent native HTML5 drag-and-drop ghost image
            verseTextEl.addEventListener('dragstart', (e) => e.preventDefault());

            // Clear Range button in verse toolbar
            clearRangeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                clearVerseSelection(verseDiv);
            });

            // --- Click / Shift+Click Handling on Verse ---
            verseDiv.addEventListener('click', (e) => {
                const target = getEventElement(e.target);
                if (!target) return;

                // If this was part of a drag action, ignore click!
                if (dragJustCompleted || isDraggingWords) {
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                }

                const clickDist = Math.hypot(e.clientX - mouseStartPos.x, e.clientY - mouseStartPos.y);
                if (clickDist > 6) {
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                }

                const clickedWord = target.closest('.word');

                // 1. Shift + Click on a word (desktop convenience range selection)
                if (e.shiftKey && clickedWord && lastClickedWord && lastClickedVerseDiv === verseDiv) {
                    setVerseWordSelection(verseDiv, lastClickedWord, clickedWord, true);
                    return;
                }

                // 2. Single word click
                if (clickedWord) {
                    lastClickedWord = clickedWord;
                    lastClickedVerseDiv = verseDiv;

                    setVerseWordSelection(verseDiv, clickedWord, clickedWord, false);
                    hideFloatingBar();

                    // Speak single clicked word
                    stopSpeech();
                    const wordU = new SpeechSynthesisUtterance(clickedWord.textContent);
                    const selectedVoiceURI = voiceSelect?.value;
                    if (selectedVoiceURI && availableVoices.length > 0) {
                        const voice = availableVoices.find(v => v.voiceURI === selectedVoiceURI);
                        if (voice) wordU.voice = voice;
                    }
                    wordU.rate = parseFloat(speedSelect.value) * 0.7;
                    window.speechSynthesis.speak(wordU);
                } else if (target.closest('.verse-text') && !clickedWord) {
                    // Clicked blank space between or around words in verse-text: clear selection!
                    clearVerseSelection(verseDiv);
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
        if (!verseEl) return;
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
