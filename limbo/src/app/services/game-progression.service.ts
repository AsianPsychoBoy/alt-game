import { Injectable } from '@angular/core';
import { Word } from '../common/Word';
import { Observable } from 'rxjs';

@Injectable()
export class GameProgressionService {

  currentLevel = -1;

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
    });
  }

  gotoLevel(n: number): Observable<boolean> {
	return new Observable((subscriber) => {
		const level = levels.find(lvl => lvl.number === n);
		if (level && level.requirement.level === this.currentLevel) {
			this.currentLevel = level.number;
			subscriber.next(true);
			subscriber.complete();
		} else {
			subscriber.next(false);
			subscriber.complete();
		}
	});
  }

}

const levels = [
  {
    number: 0,
    requirement: {
		level: -1,
      items: []
    }
  },
  {
    number: 1,
    requirement: {
      level: 0,
      command: [2, 3],
      items: []
    }
  },
  {
    number: 2,
    requirement: {
      level: 1,
      command: [],
      items: []
    }
  }
];
