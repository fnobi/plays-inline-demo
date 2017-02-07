import EventEmitter from 'events';

export default class Filter extends EventEmitter {
    constructor (opts) {
        super();
        
        this.canvas = opts.canvas || document.createElement('canvas');
        this.width = isNaN(opts.width) ? 0 : opts.width;
        this.height = isNaN(opts.height) ? 0 : opts.height;
        this.image = opts.image;

        this.ctx = this.canvas.getContext('2d');
        this.points = null;

        this.initPen();
    }

    initPen () {
        this.canvas.addEventListener('touchstart', (e) => {
            const touches = e.touches;
            if (!touches) return;

            const touch = touches[0];
            if (!touch) return;

            e.preventDefault();
            this.handlePointerStart(touch);
        });
        
        this.canvas.addEventListener('touchmove', (e) => {
            const touches = e.touches;
            if (!touches) return;

            const touch = touches[0];
            if (!touch) return;

            e.preventDefault();
            this.handlePointerMove(touch);
        });
        
        this.canvas.addEventListener('touchend', (e) => {
            this.stopPen();
        });
    }

    handlePointerStart (pointer) {
        this.startPen(
            pointer.pageX,
            pointer.pageY
        );
    }

    handlePointerMove (pointer) {
        this.addPoint(
            pointer.pageX,
            pointer.pageY
        );
    }

    startPen (x, y) {
        this.points = [];
        this.addPoint(x, y);
        this.emit('startPen');
    }

    addPoint (x, y) {
        const point = [
            this.width * x / this.canvas.offsetWidth,
            this.height * y / this.canvas.offsetHeight
        ];

        const length = this.points.length;

        const delta = length ? [
            point[0] - this.points[length - 1][0],
            point[1] - this.points[length - 1][1]
        ] : null;
        
        this.points.push(point);

        this.emit('addPoint', {
            delta: delta
        });
    }

    stopPen () {
        this.emit('stopPen');
    }

    drawImage () {
        this.ctx.drawImage(this.image, 0, 0, this.width, this.height);
    }
};
