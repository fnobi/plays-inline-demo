import qs from 'querystring';
import GlasFilter from './lib/GlasFilter';

const VIDEO_WIDTH = 640;
const VIDEO_HEIGHT = 396;

const locationSearch = (location.search || '').replace(/^\?/, '');
const locationParams = qs.parse(locationSearch);

const videoDom = document.querySelector('.js-video');
const canvasDom = document.querySelector('.js-canvas');
const playButton = document.querySelector('.js-play-button');
const pauseButton = document.querySelector('.js-pause-button');
const ctx = canvasDom.getContext('2d');

let filter;


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
    } else if (locationParams.filter) {
        initCanvas();
        const opts = {
            canvas: canvasDom,
            image: videoDom,
            width: VIDEO_WIDTH,
            height: VIDEO_HEIGHT
        };
        
        switch (locationParams.filter) {
        case 'glas':
            filter = new GlasFilter(opts);
            break;
        }
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
    
    const update = () => {
        canvasDom.width = VIDEO_WIDTH;
        canvasDom.height = VIDEO_HEIGHT;
        if (filter) {
            filter.render();
        } else {
            drawVideo();
        }
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

function drawVideo () {
    ctx.drawImage(videoDom, 0, 0, VIDEO_WIDTH, VIDEO_HEIGHT);
}

init();






