import Filter from './Filter';

const SCALE = 0.05;

export default class MosaicFilter extends Filter {
    constructor (opts) {
        super(opts);
        this.initSmallCanvas();
    }

    initSmallCanvas () {
        const smallCanvas = document.createElement('canvas');
        smallCanvas.width = Math.floor(this.width * SCALE);
        smallCanvas.height = Math.floor(this.height * SCALE);
        this.smallCanvas = smallCanvas;
        this.smallCtx = smallCanvas.getContext('2d');
    }

    render () {
        const ctx = this.ctx;
        this.drawImage();
        this.smallCtx.drawImage(
            this.canvas,
            0,
            0,
            this.width * SCALE,
            this.height * SCALE
        );
        ctx.drawImage(this.smallCanvas, 0, 0, this.width, this.height);
    }
};
