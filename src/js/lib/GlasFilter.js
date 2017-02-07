import Filter from './Filter';

const SCALE = 0.05;

export default class GlasFilter extends Filter {
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

        if (this.points) {
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 50;
            ctx.beginPath();
            this.points.forEach((point, index) => {
                if (index) {
                    ctx.lineTo(point[0], point[1]);
                } else {
                    ctx.moveTo(point[0], point[1]);
                }
            });
            ctx.stroke();

            ctx.save();
            ctx.globalCompositeOperation = 'source-in';
            this.drawImage();
            ctx.restore();
        }

        this.smallCtx.drawImage(this.image, 0, 0, this.width * SCALE, this.height * SCALE);

        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.drawImage(this.smallCanvas, 0, 0, this.width, this.height);
        ctx.restore();
    }
};
