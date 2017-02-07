import Filter from './Filter';

export default class TiltFilter extends Filter {
    constructor (opts) {
        super(opts);
        this.initListeners();
        this.deg = 0;
    }

    initListeners () {
        window.addEventListener('deviceorientation', (e) => {
            const gamma = e.gamma;
            this.deg = gamma;
        });
    }
    
    render () {
        const ctx = this.ctx;
        ctx.translate(this.width / 2, this.height / 2);
        ctx.rotate(-Math.PI * 2 * (this.deg / 2) / 360);
        ctx.drawImage(this.image, -this.width / 2, -this.height / 2);
    }
};
