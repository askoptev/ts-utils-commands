import inquirer from 'inquirer';
import { PromptType } from './prompt.types';

export class PromptService {
  public async input<T>(message: string, type: PromptType) {
    const {result} = await inquirer.prompt<{result: T}>([
      {
        type: type,
        name: 'result',
        message: message,
      },
    ]);
    return result;
  }
}
