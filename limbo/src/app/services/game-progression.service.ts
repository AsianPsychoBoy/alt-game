import { Injectable } from '@angular/core';
import { Word } from '../common/Word';
import { Observable } from 'rxjs';

@Injectable()
export class GameProgressionService {

  currentLevel = 0;
  currentLevelIndex = 0;

  currentItems: [];

  constructor() { }

  checkCombination(wordCommand: Word[]): Observable<boolean> {
    return new Observable((subscriber) => {
      const command = wordCommand.map(word => word.id);
      for (let i = 0; i < levels.length; i ++) {
        if (
          levels[i].requirement.level === (this.currentLevel - this.currentLevel % 1) &&
          levels[i].requirement.command.every((id, index) => id === command[index])
          // Do the items checking
        ) {
          this.currentLevel = levels[i].number;
          this.currentLevelIndex = i;
          levels[i].unlocked = true;
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
      const levelIndex = levels.findIndex(lvl => lvl.number === n);
      if (levelIndex >= 0 && levels[levelIndex].requirement.level === (this.currentLevel - this.currentLevel % 1)) {
        this.currentLevel = levels[levelIndex].number;
        this.currentLevelIndex = levelIndex;
        levels[levelIndex].unlocked = true;
        console.log('goto', levelIndex, n, this.currentLevel);
        subscriber.next(true);
        subscriber.complete();
      } else {
        subscriber.next(false);
        subscriber.complete();
      }
    });
  }

  isUnlocked(n: number) {
	return !!levels.find(lvl => lvl.number === n && lvl.unlocked);
  }

}

const levels = [
  {
    number: 1,
    unlocked: false,
    requirement: {
		  level: 0,
      items: []
    }
  },
  {
    number: 1.1,
    unlocked: false,
    requirement: {
      level: 1,
      command: [2, 3],
      items: []
    }
  },
  {
    number: 2,
    unlocked: false,
    requirement: {
      level: 1,
      command: [],
      items: []
    }
  },
  {
    number: 2.1,
    unlocked: false,
    requirement: {
      level: 2,
      command: [6, 5], // eyes alan
      items: []
    }
  },
  {
    number: 2.2,
    unlocked: false,
    requirement: {
      level: 2,
      command: [2, 4], // inside room
      items: []
    }
  },
  {
    number: 2.2,
    unlocked: false,
    requirement: {
      level: 2,
      command: [6, 4], // eyes room
      items: []
    }
  }
];
