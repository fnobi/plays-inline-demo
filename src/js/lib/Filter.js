export default class Filter {
    constructor (opts) {
        this.canvas = opts.canvas || document.createElement('canvas');
        this.width = isNaN(opts.width) ? 0 : opts.width;
        this.height = isNaN(opts.height) ? 0 : opts.height;
        this.image = opts.image;

        this.ctx = this.canvas.getContext('2d');
    }

    drawImage () {
        this.ctx.drawImage(this.image, 0, 0, this.width, this.height);
    }
};
