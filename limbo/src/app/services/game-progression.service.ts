import { Injectable } from '@angular/core';
import { Word } from '../common/Word';
import { Observable } from 'rxjs';

@Injectable()
export class GameProgressionService {

  currentLevel: number = 0;

  currentItems: [];

  constructor() { }

  checkCombination(wordCommand: Word[]): Observable<boolean> {
    return new Observable((subscriber) => {
      const command = wordCommand.map(word => word.id);
      for (let i = 0; i < levels.length; i ++) {
        if (
          levels[i].requirement.level === this.currentLevel &&
          levels[i].requirement.command.every((id, index) => id === command[index])
          // Do the items checking
        ) {
          this.currentLevel = levels[i].number;
          subscriber.next(true);
          subscriber.complete();
        }
      }
      subscriber.next(false);
      subscriber.complete();
    })
  }

}

const levels = [
  {
    number: 1,
    requirement: {
      level: 0,
      command: [2, 3],
      items: []
    }
  }
]
