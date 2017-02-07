import Filter from './Filter';

export default class ScrollFilter extends Filter {
    constructor (opts) {
        super(opts);
        this.offsetX = 0;
        this.offsetY = 0;
        this.initListeners();
    }

    initListeners () {
        this.on('addPoint', (e) => {
            const delta = e.delta;
            if (!delta) {
                return;
            }
            this.offsetX = (this.offsetX + delta[0]) % this.width;
            this.offsetY = (this.offsetY + delta[1]) % this.height;
        });
    }
    
    render () {
        const ctx = this.ctx;
        const x2 = (this.offsetX < 0) ? this.width : -this.width;
        const y2 = (this.offsetY < 0) ? this.height : -this.height;
        ctx.translate(this.offsetX, this.offsetY);
        ctx.drawImage(this.image, 0, 0);
        ctx.drawImage(this.image, x2, 0);
        ctx.drawImage(this.image, x2, y2);
        ctx.drawImage(this.image, 0, y2);
    }
};
