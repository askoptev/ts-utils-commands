import { FfmpegExecutor } from "./commands/ffmpeg/ffmpeg.executor";
import { PromptService } from "./core/prompt.service";
import { ConsoleLogger } from "./out/stream-logger/stream-logger";

class App {
  async run() {
      new FfmpegExecutor(ConsoleLogger.getInstance()).execute()  
  }
}

const app = new App();
app.run();
