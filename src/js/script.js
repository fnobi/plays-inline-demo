const VIDEO_WIDTH = 640;
const VIDEO_HEIGHT = 396;

const videoDom = document.querySelector('.js-video');
const canvasDom = document.querySelector('.js-canvas');
const playButton = document.querySelector('.js-play-button');
const pauseButton = document.querySelector('.js-pause-button');

function init () {
    if (!isAvailable()) {
        alert('この端末は、インライン動画再生に対応していません！');
        return;
    }
    initInline();
    initCanvas();
    initListeners();
}

function isAvailable () {
    const ua = navigator.userAgent;
    const isIOS = /iphone|ipad|ios/i.test(ua);
    return (!isIOS || 'playsInline' in videoDom);
}

function initInline () {
    videoDom.setAttribute('playsInline', 'playsInline');
}

function initCanvas () {
    const ctx = canvasDom.getContext('2d');
    const update = () => {
        canvasDom.width = VIDEO_WIDTH;
        canvasDom.height = VIDEO_HEIGHT;
        ctx.drawImage(videoDom, 0, 0, VIDEO_WIDTH, VIDEO_HEIGHT);
        requestAnimationFrame(update);
    };
    update();
}

function initListeners () {
    playButton.addEventListener('click', () => {
        videoDom.play();
    });

    pauseButton.addEventListener('click', () => {
        videoDom.pause();
    });
}

init();






