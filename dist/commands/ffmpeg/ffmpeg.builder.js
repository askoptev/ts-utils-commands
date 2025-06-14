"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FfmpegBuilder = void 0;
// ffmpeg -i /my_path -c:v libx264 -s 1920x1080 /my_path/res.mp4
class FfmpegBuilder {
    constructor() {
        this.options = new Map();
        this.options.set('-c:v', 'libx24');
    }
    input(inputPath) {
        this.inputPath = inputPath;
        return this;
    }
    setVideoSize(width, height) {
        this.options.set('-s', `${width}x${height}`);
        return this;
    }
    output(outputPath) {
        if (!this.inputPath) {
            throw new Error('Не задан inputPath');
        }
        const args = ['-i', this.inputPath];
        this.options.forEach((value, key) => {
            args.push(key);
            args.push(value);
        });
        args.push(outputPath);
        return args;
    }
}
exports.FfmpegBuilder = FfmpegBuilder;
