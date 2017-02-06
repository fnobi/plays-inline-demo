(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var VIDEO_WIDTH = 640;
var VIDEO_HEIGHT = 396;

var videoDom = document.querySelector('.js-video');
var canvasDom = document.querySelector('.js-canvas');
var playButton = document.querySelector('.js-play-button');
var pauseButton = document.querySelector('.js-pause-button');

function init() {
    if (!isAvailable()) {
        alert('この端末は、インライン動画再生に対応していません！');
        return;
    }
    initInline();
    initCanvas();
    initListeners();
}

function isAvailable() {
    var ua = navigator.userAgent;
    var isIOS = /iphone|ipad|ios/i.test(ua);
    return !isIOS || 'playsInline' in videoDom;
}

function initInline() {
    videoDom.setAttribute('playsInline', 'playsInline');
}

function initCanvas() {
    var ctx = canvasDom.getContext('2d');
    var update = function update() {
        canvasDom.width = VIDEO_WIDTH;
        canvasDom.height = VIDEO_HEIGHT;
        ctx.drawImage(videoDom, 0, 0, VIDEO_WIDTH, VIDEO_HEIGHT);
        requestAnimationFrame(update);
    };
    update();
}

function initListeners() {
    playButton.addEventListener('click', function () {
        videoDom.play();
    });

    pauseButton.addEventListener('click', function () {
        videoDom.pause();
    });
}

init();

},{}]},{},[1]);
