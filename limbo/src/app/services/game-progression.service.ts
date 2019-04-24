import { Injectable } from '@angular/core';
import { Word } from '../common/Word';
import { Observable, Subject } from 'rxjs';
import { NumberSymbol } from '@angular/common';

@Injectable()
export class GameProgressionService {

  currentLevel = 0;
  currentLevelIndex = 0;

  sanityScore = 100;
  sanityScore$ = new Subject<number>();

  currentCommand: Word[];
  currentItems: [];
  currentLocation: [];

  displayText = new Subject<{
    text: string,
    wordList: string[]
  }>();

  constructor() { }

  generateErrorMessage(wordCommand: Word[]) {
    const words = wordCommand.map(w => w.string);
    const msgList = [
      `"${words.join(', ')}", I thought to myself, "what non-sense!"`,
      `"${words.join('? ')}?", why do these words come to mind?`
    ];
    return msgList[Math.floor(Math.random() * msgList.length)];
  }

  checkCombination(wordCommand: Word[]): Observable<boolean> {
    this.currentCommand = wordCommand;
    return new Observable((subscriber) => {
      let matched = false;
      let isBad = false;
      for (let i = 0; i < levels.length; i ++) {
        if (
          levels[i].requirement.level === (this.currentLevel - this.currentLevel % 1) &&
          levels[i].requirement.command.length > 0 &&
		  levels[i].requirement.command[0] === wordCommand[0].properties.type &&
		  levels[i].requirement.command[1] === wordCommand[1].string
          // Do the items checking
        ) {
          this.currentLevel = levels[i].number;
          this.currentLevelIndex = i;
          levels[i].unlocked++;
          console.log('command navigate: ', levels[i].number);
          matched = true;
          isBad = levels[i].isBad;
          break;
        }
      }

      if (matched && !isBad) {
        subscriber.next(true);
        subscriber.complete();
      } else {
        if (matched && isBad) {
          this.sanityScore -= 33;
          this.sanityScore$.next(this.sanityScore);
        } else {
          this.displayText.next({
            text: this.generateErrorMessage(wordCommand),
            wordList: []
          });
        }
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

  getSanityScore(): Observable<number> {
    return this.sanityScore$.asObservable();
  }

}

export interface Level {
	number: number;
	unlocked: number;
	isBad: boolean;
}

export enum PLACES {
	outsideOfBuilding,
	building,
	room,
	office

}

const levels = [
  {
    number: 1.1,
    unlocked: 0,
	isBad: false,
	place: PLACES.outsideOfBuilding,
    requirement: {
      level: 1,
      command: [],
      items: []
    }},
  {
    number: 1,
    unlocked: 0,
	isBad: false,
	place: PLACES.outsideOfBuilding,
    requirement: {
		level: 0,
      items: []
    }
  },
  {
    number: 2,
    unlocked: 1,
	isBad: false,
	place: PLACES.outsideOfBuilding,
    requirement: {
		  level: 1,
      items: []
    }
  },
  {
    number: 2.1,
    unlocked: 0,
	isBad: false,
	place: PLACES.building,
    requirement: {
      level: 2,
      command: ['travelTo', 'building'],
	  items: [],
	  place: PLACES.outsideOfBuilding
    }
  },
//   {
//     number: 2.2,
//     unlocked: 0,
//     isBad: true,
//     requirement: {
//       level: 2,
//       command: ['cold', 'inside'],
//       items: []
//     }
//   },
  {
    number: 3,
    unlocked: 0,
    isBad: false,
    requirement: {
      level: 2,
      command: [],
      items: []
    }
  },
  {
    number: 3.1,
    unlocked: 0,
    isBad: false,
    requirement: {
      level: 3,
      command: ['eyes', 'Alan Bennet'], // eyes alan
      items: []
    }
  },
  {
    number: 3.11,
    unlocked: 0,
    isBad: false,
    requirement: {
      level: 3,
      command: [],
      items: []
    }
  },
  {
    number: 3.2,
    unlocked: 0,
    isBad: false,
    requirement: {
      level: 3,
      command: ['inside', 'room'], // inside room
      items: []
    }
  },
  {
    number: 3.2,
    unlocked: 0,
    isBad: false,
    requirement: {
      level: 3,
      command: ['eyes', 'room'], // eyes room
      items: []
    }
  },
  {
    number: 3.3,
    unlocked: 0,
    isBad: false,
    requirement: {
      level: 3,
      command: ['walked', 'room'], // walked room
      items: []
    }
  },
  {
    number: 4,
    unlocked: 0,
    isBad: false,
    requirement: {
      level: 3,
      command: [],
      items: []
    }
  },
];
