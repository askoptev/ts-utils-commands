"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FfmpegExecutor = void 0;
const child_process_1 = require("child_process");
const command_exequtor_1 = require("../../core/executor/command.exequtor");
const files_service_1 = require("../../core/files/files.service");
const prompt_service_1 = require("../../core/prompt.service");
const ffmpeg_builder_1 = require("./ffmpeg.builder");
const stream_handlers_1 = require("../../core/handlers/stream.handlers");
class FfmpegExecutor extends command_exequtor_1.CommandExecutor {
    constructor(logger) {
        super(logger);
        this.fileService = new files_service_1.FileService();
        this.promptService = new prompt_service_1.PromptService();
    }
    prompt() {
        return __awaiter(this, void 0, void 0, function* () {
            const width = yield this.promptService.input('Ширина', 'number');
            const height = yield this.promptService.input('Высота', 'number');
            const path = yield this.promptService.input('Путь до файла', 'input');
            const name = yield this.promptService.input('Имя', 'input');
            return { width, height, path, name };
        });
    }
    build({ width, height, path, name }) {
        const output = this.fileService.getFilePath(path, name, 'mp4');
        const args = (new ffmpeg_builder_1.FfmpegBuilder())
            .input(path)
            .setVideoSize(width, height)
            .output(output);
        return { command: 'ffmpeg', args, output };
    }
    spawn({ output, command, args }) {
        this.fileService.deleteFileIfExists(output);
        return (0, child_process_1.spawn)(command, args);
    }
    processStream(stream, logger) {
        const handler = new stream_handlers_1.StreamHandler(logger);
        handler.processOut(stream);
    }
}
exports.FfmpegExecutor = FfmpegExecutor;
