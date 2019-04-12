import { Injectable } from '@angular/core';
import { Word } from '../common/Word';

@Injectable()
export class GameProgressionService {

  currentLevel: number = 0;

  constructor() { }

  checkCombination(command: Word[]) {
    console.log('checking: ', command);
  }

}


