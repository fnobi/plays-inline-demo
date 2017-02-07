(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

},{}],2:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};

},{}],3:[function(require,module,exports){
'use strict';

exports.decode = exports.parse = require('./decode');
exports.encode = exports.stringify = require('./encode');

},{"./decode":1,"./encode":2}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Filter = function () {
    function Filter(opts) {
        _classCallCheck(this, Filter);

        this.canvas = opts.canvas || document.createElement('canvas');
        this.width = isNaN(opts.width) ? 0 : opts.width;
        this.height = isNaN(opts.height) ? 0 : opts.height;
        this.image = opts.image;

        this.ctx = this.canvas.getContext('2d');
    }

    _createClass(Filter, [{
        key: 'drawImage',
        value: function drawImage() {
            this.ctx.drawImage(this.image, 0, 0, this.width, this.height);
        }
    }]);

    return Filter;
}();

exports.default = Filter;
;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Filter2 = require('./Filter');

var _Filter3 = _interopRequireDefault(_Filter2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SCALE = 0.05;

var MosaicFilter = function (_Filter) {
    _inherits(MosaicFilter, _Filter);

    function MosaicFilter(opts) {
        _classCallCheck(this, MosaicFilter);

        var _this = _possibleConstructorReturn(this, (MosaicFilter.__proto__ || Object.getPrototypeOf(MosaicFilter)).call(this, opts));

        _this.initSmallCanvas();
        return _this;
    }

    _createClass(MosaicFilter, [{
        key: 'initSmallCanvas',
        value: function initSmallCanvas() {
            var smallCanvas = document.createElement('canvas');
            smallCanvas.width = Math.floor(this.width * SCALE);
            smallCanvas.height = Math.floor(this.height * SCALE);
            this.smallCanvas = smallCanvas;
            this.smallCtx = smallCanvas.getContext('2d');
        }
    }, {
        key: 'render',
        value: function render() {
            var ctx = this.ctx;
            this.drawImage();
            this.smallCtx.drawImage(this.canvas, 0, 0, this.width * SCALE, this.height * SCALE);
            ctx.drawImage(this.smallCanvas, 0, 0, this.width, this.height);
        }
    }]);

    return MosaicFilter;
}(_Filter3.default);

exports.default = MosaicFilter;
;

},{"./Filter":4}],6:[function(require,module,exports){
'use strict';

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _MosaicFilter = require('./lib/MosaicFilter');

var _MosaicFilter2 = _interopRequireDefault(_MosaicFilter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VIDEO_WIDTH = 640;
var VIDEO_HEIGHT = 396;

var locationSearch = (location.search || '').replace(/^\?/, '');
var locationParams = _querystring2.default.parse(locationSearch);

var videoDom = document.querySelector('.js-video');
var canvasDom = document.querySelector('.js-canvas');
var playButton = document.querySelector('.js-play-button');
var pauseButton = document.querySelector('.js-pause-button');
var ctx = canvasDom.getContext('2d');

var filter = void 0;

function init() {
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
        var opts = {
            canvas: canvasDom,
            image: videoDom,
            width: VIDEO_WIDTH,
            height: VIDEO_HEIGHT
        };

        switch (locationParams.filter) {
            case 'mosaic':
                filter = new _MosaicFilter2.default(opts);
                break;
        }
    } else {
        canvasDom.style.display = 'none';
    }
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
    videoDom.style.display = 'none';

    var update = function update() {
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

function initPlayer() {
    playButton.addEventListener('click', function () {
        videoDom.play();
    });

    pauseButton.addEventListener('click', function () {
        videoDom.pause();
    });
}

function drawVideo() {
    ctx.drawImage(videoDom, 0, 0, VIDEO_WIDTH, VIDEO_HEIGHT);
}

init();

},{"./lib/MosaicFilter":5,"querystring":3}]},{},[6]);
