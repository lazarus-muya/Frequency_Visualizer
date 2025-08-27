// =========================================
// Globals
// =========================================
let fs = 44100;            // audio sample rate
let duration = 0.1;        // length of sound buffer (seconds) - shorter for web
let frequency = 1400;      // starting frequency (Hz)
let isPlaying = true;      // audio state
let isUpdating = false;    // audio update status

// =========================================
// Audio Context and Setup
// =========================================
let audioContext;
let oscillator;
let gainNode;

function initAudio() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    gainNode = audioContext.createGain();
    gainNode.connect(audioContext.destination);
    gainNode.gain.value = 0.1; // Reduce volume
}

function startAudio() {
    if (!audioContext) return;
    
    // Create a buffer source with the specified duration
    const bufferLength = Math.floor(fs * duration);
    const audioBuffer = audioContext.createBuffer(1, bufferLength, fs);
    const channelData = audioBuffer.getChannelData(0);
    
    // Generate sine wave for the specified duration
    for (let i = 0; i < bufferLength; i++) {
        const t = i / fs;
        channelData[i] = Math.sin(2 * Math.PI * frequency * t) * 0.1;
    }
    
    oscillator = audioContext.createBufferSource();
    oscillator.buffer = audioBuffer;
    oscillator.connect(gainNode);
    oscillator.loop = true; // Loop the buffer
    oscillator.start();
}

function stopAudio() {
    if (oscillator) {
        oscillator.stop();
        oscillator = null;
    }
}

function updateAudio() {
    if (oscillator && isPlaying) {
        // Stop current audio and restart with new parameters
        stopAudio();
        startAudio();
    }
}

// =========================================
// Canvas Setup
// =========================================
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;

// Particle system
const numParticles = 2000;
let particles = [];

function initParticles() {
    particles = [];
    for (let i = 0; i < numParticles; i++) {
        particles.push({
            x: (Math.random() - 0.5) * 2 * Math.PI,
            y: (Math.random() - 0.5) * 2 * Math.PI
        });
    }
}

// =========================================
// Cymatics Functions
// =========================================
function freqToModes(freq) {
    const scale = Math.floor(freq / 50);
    const m = Math.max(1, (scale % 8) + 1);
    const n = Math.max(1, Math.floor(scale / 2) % 8 + 1);
    return { m, n };
}

function updateParticles() {
    const { m, n } = freqToModes(frequency);
    
    particles.forEach(particle => {
        const vibration = Math.sin(m * particle.x) * Math.sin(n * particle.y);
        particle.x += -0.01 * vibration * Math.sign(particle.x);
        particle.y += -0.01 * vibration * Math.sign(particle.y);
        
        // Keep particles within bounds
        particle.x = Math.max(-Math.PI, Math.min(Math.PI, particle.x));
        particle.y = Math.max(-Math.PI, Math.min(Math.PI, particle.y));
    });
    
    return { m, n };
}

// =========================================
// Rendering
// =========================================
function render() {
    // Clear canvas
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, width, height);
    
    // Draw particles
    ctx.fillStyle = '#4CAF50';
    particles.forEach(particle => {
        const screenX = (particle.x + Math.PI) * (width / (2 * Math.PI));
        const screenY = (particle.y + Math.PI) * (height / (2 * Math.PI));
        
        ctx.beginPath();
        ctx.arc(screenX, screenY, 2, 0, 2 * Math.PI);
        ctx.fill();
    });
}

// =========================================
// Animation Loop
// =========================================
function animate() {
    if (isPlaying) {
        updateParticles();
    }
    render();
    requestAnimationFrame(animate);
}

// =========================================
// UI Controls
// =========================================
const sampleRateInput = document.getElementById('sampleRate');
const durationInput = document.getElementById('duration');
const frequencySlider = document.getElementById('frequency');
const freqValue = document.getElementById('freqValue');
const modeInfo = document.getElementById('modeInfo');
const playPauseBtn = document.getElementById('playPause');
const statusIndicator = document.getElementById('statusIndicator');

// Sidenav controls
const navToggle = document.getElementById('navToggle');
const sidenav = document.getElementById('sidenav');
const closeNav = document.getElementById('closeNav');
const overlay = document.getElementById('overlay');

function showStatus(message) {
    isUpdating = true;
    statusIndicator.querySelector('.status-text').textContent = message;
    statusIndicator.style.display = 'block';
}

function hideStatus() {
    isUpdating = false;
    statusIndicator.style.display = 'none';
}

// Sidenav toggle functions
function openSidenav() {
    sidenav.classList.add('open');
    overlay.classList.add('active');
    navToggle.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeSidenav() {
    sidenav.classList.remove('open');
    overlay.classList.remove('active');
    navToggle.classList.remove('open');
    document.body.style.overflow = '';
}

function toggleSidenav() {
    if (sidenav.classList.contains('open')) {
        closeSidenav();
    } else {
        openSidenav();
    }
}

// Sidenav event listeners
navToggle.addEventListener('click', toggleSidenav);
closeNav.addEventListener('click', closeSidenav);
overlay.addEventListener('click', closeSidenav);

// Close sidenav on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidenav.classList.contains('open')) {
        closeSidenav();
    }
});

sampleRateInput.addEventListener('change', (e) => {
    let value = parseInt(e.target.value);
    fs = value;
    e.target.nextElementSibling.textContent = `${fs} Hz`;
    // Restart audio context if needed for sample rate changes
    if (audioContext && isPlaying) {
        showStatus('Updating sample rate...');
        stopAudio();
        startAudio();
        setTimeout(hideStatus, 500); // Hide status after 500ms
    }
});

durationInput.addEventListener('input', (e) => {
    let value = parseFloat(e.target.value);
    // Clamp values to reasonable bounds
    value = Math.max(0.01, Math.min(1.0, value));
    duration = value;
    e.target.value = value.toFixed(2); // Update input field with clamped value
    e.target.nextElementSibling.textContent = `${duration}s`;
    // Update audio buffer duration if needed
    if (oscillator && isPlaying) {
        showStatus('Updating duration...');
        updateAudio();
        setTimeout(hideStatus, 500); // Hide status after 500ms
    }
});

frequencySlider.addEventListener('input', (e) => {
    frequency = parseInt(e.target.value);
    freqValue.textContent = `${frequency} Hz`;
    
    const { m, n } = freqToModes(frequency);
    modeInfo.textContent = `Modes: m=${m}, n=${n}`;
    
    if (oscillator && isPlaying) {
        showStatus('Updating frequency...');
        updateAudio();
        setTimeout(hideStatus, 500); // Hide status after 500ms
    }
});

playPauseBtn.addEventListener('click', () => {
    isPlaying = !isPlaying;
    
    if (isPlaying) {
        playPauseBtn.textContent = 'Pause';
        if (audioContext && audioContext.state === 'suspended') {
            audioContext.resume();
        }
        if (!oscillator) {
            startAudio();
        }
    } else {
        playPauseBtn.textContent = 'Play';
        stopAudio();
    }
});

// =========================================
// Keyboard Controls
// =========================================
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        playPauseBtn.click();
    }
});

// =========================================
// Initialization
// =========================================
function init() {
    initParticles();
    initAudio();
    
    // Start audio after user interaction
    document.addEventListener('click', () => {
        if (audioContext && audioContext.state === 'suspended') {
            audioContext.resume();
        }
        if (isPlaying && !oscillator) {
            startAudio();
        }
    }, { once: true });
    
    // Start animation
    animate();
    
    // Initialize display
    const { m, n } = freqToModes(frequency);
    modeInfo.textContent = `Modes: m=${m}, n=${n}`;
    
    // Initialize input display values
    sampleRateInput.nextElementSibling.textContent = `${fs} Hz`;
    durationInput.nextElementSibling.textContent = `${duration}s`;
}

// Start when page loads
window.addEventListener('load', init);