"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamHandler = void 0;
class StreamHandler {
    constructor(logger) {
        this.logger = logger;
    }
    processOut(stream) {
        stream.stdout.on('data', (data) => {
            this.logger.log(data);
        });
        stream.stderr.on('data', (data) => {
            this.logger.error(data);
        });
        stream.on('close', () => {
            this.logger.end();
        });
    }
}
exports.StreamHandler = StreamHandler;
