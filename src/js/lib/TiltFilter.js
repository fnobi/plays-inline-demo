import Filter from './Filter';

const SCALE = 0.05;
const FINGER_SIZE = 50;

export default class GlasFilter extends Filter {
    constructor (opts) {
        super(opts);
        this.initListeners();
        this.deg = 0;
    }

    initListeners () {
        window.addEventListener('deviceorientation', (e) => {
            const alpha = e.alpha;
            this.deg = alpha;
        });
    }
    
    render () {
        const ctx = this.ctx;
        ctx.translate(this.width / 2, this.height / 2);
        ctx.rotate(-Math.PI * 2 * this.deg / 360);
        ctx.drawImage(this.image, -this.width / 2, -this.height / 2);
    }
};
