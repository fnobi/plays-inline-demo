import qs from 'querystring';

const VIDEO_WIDTH = 640;
const VIDEO_HEIGHT = 396;

const videoDom = document.querySelector('.js-video');
const canvasDom = document.querySelector('.js-canvas');
const playButton = document.querySelector('.js-play-button');
const pauseButton = document.querySelector('.js-pause-button');

const locationSearch = (location.search || '').replace(/^\?/, '');
const locationParams = qs.parse(locationSearch);


function init () {
    initPlayer();
    
    if (!isAvailable()) {
        alert('この端末は、インライン動画再生に対応していません！');
        videoDom.style.display = 'none';
        return;
    }
    initInline();

    if (locationParams['use-canvas']) {
        initCanvas();
    } else {
        canvasDom.style.display = 'none';
    }
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
    videoDom.style.display = 'none';
    
    const ctx = canvasDom.getContext('2d');
    const update = () => {
        canvasDom.width = VIDEO_WIDTH;
        canvasDom.height = VIDEO_HEIGHT;
        ctx.drawImage(videoDom, 0, 0, VIDEO_WIDTH, VIDEO_HEIGHT);
        requestAnimationFrame(update);
    };
    update();
}

function initPlayer () {
    playButton.addEventListener('click', () => {
        videoDom.play();
    });

    pauseButton.addEventListener('click', () => {
        videoDom.pause();
    });
}

init();






