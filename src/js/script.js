const videoDom = document.querySelector('.js-video');

const playButton = document.querySelector('.js-play-button');
const pauseButton = document.querySelector('.js-pause-button');

playButton.addEventListener('click', () => {
    videoDom.play();
});

pauseButton.addEventListener('click', () => {
    videoDom.pause();
});
