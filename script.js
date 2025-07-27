// --- STOPWATCH LOGIC (UNCHANGED) ---

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');

let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;

startBtn.addEventListener('click', start);
stopBtn.addEventListener('click', stop);
resetBtn.addEventListener('click', reset);

function start() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(update, 10);
        isRunning = true;
    }
}

function stop() {
    if (isRunning) {
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
        isRunning = false;
    }
}

function reset() {
    clearInterval(timer);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    display.textContent = "00:00:00:00";
}

function update() {
    const currentTime = Date.now() - startTime;
    let hours = Math.floor(currentTime / (1000 * 60 * 60));
    let minutes = Math.floor(currentTime / (1000 * 60) % 60);
    let seconds = Math.floor(currentTime / 1000 % 60);
    let milliseconds = Math.floor((currentTime % 1000) / 10);

    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');
    milliseconds = String(milliseconds).padStart(2, '0');

    display.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}


// --- YOUTUBE PLAYER LOGIC (NEW) ---

const musicToggle = document.getElementById('musicToggle');
let player; // This will hold the YouTube player object

// This function is called by the YouTube API script once it's loaded
function onYouTubeIframeAPIReady() {
    // The Lofi Girl stream Video ID.
    // NOTE: If the stream ever stops and restarts, this ID might change.
    const videoId = 'jfKfPfyJRdk';

    player = new YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: videoId,
        playerVars: {
            'autoplay': 0, // Don't autoplay
            'controls': 0, // Hide player controls
            'loop': 1,     // Loop the video
            'playlist': videoId // Required for loop to work
        },
        events: {
            // You can add event listeners here if needed, e.g., 'onReady'
        }
    });
}

musicToggle.addEventListener('click', () => {
    // Check if the player and its functions are available
    if (player && typeof player.getPlayerState === 'function') {
        const playerState = player.getPlayerState();
        if (playerState === YT.PlayerState.PLAYING) {
            player.pauseVideo();
            musicToggle.textContent = '▶️ Play Lofi';
        } else {
            player.playVideo();
            musicToggle.textContent = '⏸️ Pause Lofi';
        }
    }
});