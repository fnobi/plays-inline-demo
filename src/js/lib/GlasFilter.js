import Filter from './Filter';

const SCALE = 0.05;
const FINGER_SIZE = 50;

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

        this.smallCtx.drawImage(this.image, 0, 0, this.width * SCALE, this.height * SCALE);

        ctx.drawImage(this.smallCanvas, 0, 0, this.width, this.height);
        
        if (this.points) {
            ctx.beginPath();
            this.points.forEach((point, index) => {
                ctx.moveTo(point[0], point[1]);
                ctx.arc(point[0], point[1], FINGER_SIZE / 2, 0, Math.PI * 2);
            });
            ctx.clip();
            this.drawImage();
            ctx.restore();
        }
    }
};
