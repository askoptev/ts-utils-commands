// ffmpeg -i /my_path -c:v libx264 -s 1920x1080 /my_path/res.mp4
export class FfmpegBuilder {
  private inputPath: string;
  private outputPath: string;
  private options: Map<string, string> = new Map();

  constructor() {
    this.options.set('-c:v', 'libx24');
  }

  input(inputPath: string) {
    this.inputPath = inputPath;
    return this;
  }

  setVideoSize(width: number, height: number) {
    this.options.set('-s', `${width}x${height}`);
    return this;
  }

  output(outputPath: string) {
    if (!this.inputPath) {
      throw new Error( 'Не задан inputPath')
    }
    const args: string[] = ['-i', this.inputPath];
    this.options.forEach((value, key) => {
      args.push(key);
      args.push(value);
    })
    args.push(outputPath);
    return args;
  }
}
