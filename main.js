const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const sourceLang = document.getElementById('sourceLang');
const targetLang = document.getElementById('targetLang');
const translateBtn = document.getElementById('translateBtn');
const swapBtn = document.getElementById('swapBtn');
const copyBtn = document.getElementById('copyBtn');
const downloadBtn = document.getElementById('downloadBtn');
const speakBtn = document.getElementById('speakBtn');
const clearBtn = document.getElementById('clearBtn');
const micBtn = document.getElementById('micBtn');
const charCount = document.getElementById('charCount');
const loader = document.getElementById('loader');
const messageBox = document.getElementById('messageBox');
const recentList = document.getElementById('recentList');
const themeToggle = document.getElementById('themeToggle');
const statusText = document.getElementById('statusText');

function updateCharCount() {
    const count = inputText.value.length;
    charCount.innerText = count + ' characters';
}

function showMessage(msg, isError = true) {
    messageBox.innerText = msg;
    messageBox.style.color = isError ? '#d14f4f' : '#2e9d5b';
}

function setLoading(isLoading) {
    if (isLoading) {
        loader.classList.remove('hidden');
        translateBtn.disabled = true;
        statusText.innerText = 'Working...';
    } else {
        loader.classList.add('hidden');
        translateBtn.disabled = false;
        statusText.innerText = 'Ready';
    }
}

function typeText(text) {
    outputText.value = '';
    let i = 0;

    const timer = setInterval(() => {
        outputText.value += text.charAt(i);
        i++;
        if (i >= text.length) {
            clearInterval(timer);
        }
    }, 18);
}

async function translateNow() {
    const text = inputText.value.trim();
    if (!text) {
        showMessage('Please type something to translate.');
        return;
    }

    showMessage('', true);
    setLoading(true);
    outputText.value = '';

    try {
        const response = await fetch('/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: text,
                source_lang: sourceLang.value,
                target_lang: targetLang.value
            })
        });

        const data = await response.json();

        if (data.success) {
            typeText(data.translated_text);
            showMessage('Translation complete.', false);
            loadRecentTranslations();
        } else {
            showMessage(data.message || 'Something went wrong.');
        }
    } catch (error) {
        showMessage('Network issue. Please check internet and try again.');
    } finally {
        setLoading(false);
    }
}

async function loadRecentTranslations() {
    try {
        const response = await fetch('/recent-translations');
        const data = await response.json();

        if (!data.length) {
            recentList.innerHTML = '<p class="muted-text">No recent translations yet.</p>';
            return;
        }

        recentList.innerHTML = data.map(item => `
            <div class="recent-item">
                <p><span class="mini-label">From:</span> ${item.source_lang} → ${item.target_lang}</p>
                <p><strong>Input:</strong> ${item.source_text.substring(0, 70)}</p>
                <p><strong>Output:</strong> ${item.translated_text.substring(0, 70)}</p>
                <p class="mini-label">${item.created_at}</p>
            </div>
        `).join('');
    } catch (error) {
        recentList.innerHTML = '<p class="muted-text">Could not load recent translations.</p>';
    }
}

function swapLanguages() {
    if (sourceLang.value === 'auto') {
        showMessage('Auto detect cannot be swapped directly. Choose a fixed source language first.');
        return;
    }

    const tempLang = sourceLang.value;
    sourceLang.value = targetLang.value;
    targetLang.value = tempLang;

    const tempText = inputText.value;
    inputText.value = outputText.value;
    outputText.value = tempText;
    updateCharCount();
}

function copyOutput() {
    if (!outputText.value.trim()) {
        showMessage('Nothing to copy right now.');
        return;
    }
    navigator.clipboard.writeText(outputText.value)
        .then(() => showMessage('Copied to clipboard.', false))
        .catch(() => showMessage('Copy failed.'));
}

function downloadTextFile() {
    if (!outputText.value.trim()) {
        showMessage('Nothing to download right now.');
        return;
    }

    const blob = new Blob([outputText.value], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'translation.txt';
    link.click();
    URL.revokeObjectURL(url);
    showMessage('TXT file downloaded.', false);
}

function speakOutput() {
    const text = outputText.value.trim();
    if (!text) {
        showMessage('Nothing to speak.');
        return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = targetLang.value === 'auto' ? 'en-US' : targetLang.value;
    speechSynthesis.speak(utterance);
}

function clearAll() {
    inputText.value = '';
    outputText.value = '';
    updateCharCount();
    showMessage('Cleared text boxes.', false);
}

function startVoiceInput() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        showMessage('Speech recognition is not supported in this browser.');
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.start();
    showMessage('Listening... speak now', false);

    recognition.onresult = function(event) {
        const spokenText = event.results[0][0].transcript;
        inputText.value = spokenText;
        updateCharCount();
        showMessage('Voice input captured.', false);
    };

    recognition.onerror = function() {
        showMessage('Voice input failed. Please try again.');
    };
}

function loadTheme() {
    const savedTheme = localStorage.getItem('translingua_theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark');
    const theme = document.body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('translingua_theme', theme);
}

inputText.addEventListener('input', updateCharCount);
translateBtn.addEventListener('click', translateNow);
swapBtn.addEventListener('click', swapLanguages);
copyBtn.addEventListener('click', copyOutput);
downloadBtn.addEventListener('click', downloadTextFile);
speakBtn.addEventListener('click', speakOutput);
clearBtn.addEventListener('click', clearAll);
micBtn.addEventListener('click', startVoiceInput);
themeToggle.addEventListener('click', toggleTheme);

loadTheme();
loadRecentTranslations();
updateCharCount();
