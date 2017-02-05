const videoDom = document.querySelector('.js-video');
const playButton = document.querySelector('.js-play-button');
const pauseButton = document.querySelector('.js-pause-button');

function init () {
    if (!isAvailable()) {
        alert('この端末は、インライン動画再生に対応していません！');
        return;
    }
    initInline();
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

function initListeners () {
    playButton.addEventListener('click', () => {
        videoDom.play();
    });

    pauseButton.addEventListener('click', () => {
        videoDom.pause();
    });
}

init();






