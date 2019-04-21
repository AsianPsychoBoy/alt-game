import { Injectable } from '@angular/core';
import { Word } from '../common/Word';
import { Observable } from 'rxjs';

@Injectable()
export class GameProgressionService {

  currentLevel = 0;
  currentLevelIndex = 0;

  sanityScore = 100;

  currentItems: [];

  constructor() { }

  checkCombination(wordCommand: Word[]): Observable<boolean> {
    return new Observable((subscriber) => {
      const command = wordCommand.map(word => word.id);
      let matched = false;
      for (let i = 0; i < levels.length; i ++) {
        if (
          levels[i].requirement.level === (this.currentLevel - this.currentLevel % 1) &&
          levels[i].requirement.command.length > 0 &&
          levels[i].requirement.command.every((id, index) => id === command[index])
          // Do the items checking
        ) {
          this.currentLevel = levels[i].number;
          this.currentLevelIndex = i;
          levels[i].unlocked++;
          console.log('command navigate: ', levels[i].number);
          matched = true;
          break;
        }
      }

      if (matched) {
        subscriber.next(true);
        subscriber.complete();
      } else {
        this.sanityScore -= 5;
        subscriber.next(false);
        subscriber.complete();
      }
    });
  }

  gotoLevel(n: number): Observable<boolean> {
    return new Observable((subscriber) => {
      const levelIndex = levels.findIndex(lvl => lvl.number === n);
      if (levelIndex >= 0 && levels[levelIndex].requirement.level === (this.currentLevel - this.currentLevel % 1)) {
        this.currentLevel = levels[levelIndex].number;
        this.currentLevelIndex = levelIndex;
        levels[levelIndex].unlocked++;
        console.log('goto', levelIndex, n, this.currentLevel);
        subscriber.next(true);
        subscriber.complete();
      } else {
        subscriber.next(false);
        subscriber.complete();
      }
    });
  }

  isUnlocked(n: number): number {
    const unlockedLevel = levels.find(lvl => lvl.number === n && lvl.unlocked !== 0);
	  return unlockedLevel ? unlockedLevel.unlocked : 0;
  }

}

const levels = [
  {
    number: 0.1,
    unlocked: 0,
    requirement: {
      level: 0,
      command: [],
      items: []
    }},
  {
    number: 1,
    unlocked: 0,
    requirement: {
		  level: 0,
      items: []
    }
  },
  {
    number: 1.1,
    unlocked: 0,
    requirement: {
      level: 1,
      command: [2, 3],
      items: []
    }
  },
  {
    number: 2,
    unlocked: 0,
    requirement: {
      level: 1,
      command: [],
      items: []
    }
  },
  {
    number: 2.1,
    unlocked: 0,
    requirement: {
      level: 2,
      command: [7, 6], // eyes alan
      items: []
    }
  },
  {
    number: 2.11,
    unlocked: 0,
    requirement: {
      level: 2,
      command: [],
      items: []
    }
  },
  {
    number: 2.2,
    unlocked: 0,
    requirement: {
      level: 2,
      command: [2, 5], // inside room
      items: []
    }
  },
  {
    number: 2.2,
    unlocked: 0,
    requirement: {
      level: 2,
      command: [7, 5], // eyes room
      items: []
    }
  },
  {
    number: 2.3,
    unlocked: 0,
    requirement: {
      level: 2,
      command: [4, 8], // walked room
      items: []
    }
  },
  {
    number: 3,
    unlocked: 0,
    requirement: {
      level: 2,
      command: [],
      items: []
    }
  },
];
