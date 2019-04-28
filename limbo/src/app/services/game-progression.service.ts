import { Injectable } from '@angular/core';
import { Word, VERB_TYPES, PART_OF_SPEECH } from '../common/Word';
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
  currentLocation: PLACES;

  displayText = new Subject<{
    text: string,
    wordList: string[]
  }>();

  constructor() { }

  generateErrorMessage(wordCommand: Word[], type: ERR_MSG_TYPES) {
    const words = wordCommand.map(w => w.string);
	   const msgList =
		type === ERR_MSG_TYPES.nonesense ? [
			`"${words.join(', ')}", I thought to myself, "what non-sense!"`,
			`"${words.join('? ')}?", why do these words come to mind?`
		] :
		type === ERR_MSG_TYPES.cannotReach ? [
			`I can't get to ${words[1]} from here.`
		] : [
			`I don't understand these voices in my head.`
		];
    return msgList[Math.floor(Math.random() * msgList.length)];
  }

  checkCombination(wordCommand: Word[]): Observable<boolean> {
    this.currentCommand = wordCommand;
    return new Observable((subscriber) => {
      let matchedIndex;
      let isBad = false;
      // parts of speech must match
      if (wordCommand[0].properties.partOfSpeech === PART_OF_SPEECH.verb && wordCommand[1].properties.partOfSpeech === PART_OF_SPEECH.noun) {
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
            matchedIndex = i;
            isBad = levels[i].isBad;
            break;
          }
        }
      }

      if (matchedIndex && !isBad) {
        subscriber.next(true);
        subscriber.complete();
        this.currentLocation = levels[matchedIndex].place;
      } else {
        if (matchedIndex && isBad) {
          this.sanityScore -= 33;
          this.sanityScore$.next(this.sanityScore);
          this.currentLocation = levels[matchedIndex].place;
        } else {
          this.displayText.next({
            text: this.generateErrorMessage(wordCommand, ERR_MSG_TYPES.nonesense),
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
      command: [VERB_TYPES.travelTo, 'building'],
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
    place: PLACES.room,
    requirement: {
      level: 2,
      command: [],
      items: [],
      place: PLACES.building,
    }
  },
  {
    number: 3.1,
    unlocked: 0,
    isBad: true,
    place: PLACES.room,
    requirement: {
      level: 3,
      command: [VERB_TYPES.examine, 'Alan Bennet'], // eyes alan
      items: [],
      place: PLACES.room,
    }
  },
  {
    number: 3.11,
    unlocked: 0,
    isBad: false,
    place: PLACES.room,
    requirement: {
      level: 3,
      command: [],
      items: [],
      place: PLACES.room,
    }
  },
  {
    number: 3.2,
    unlocked: 0,
    isBad: false,
    place: PLACES.room,
    requirement: {
      level: 3,
      command: [VERB_TYPES.examine, 'room'], // inside room
      items: [],
      place: PLACES.room,
    }
  },
  {
    number: 3.3,
    unlocked: 0,
    isBad: false,
    place: PLACES.office,
    requirement: {
      level: 3,
      command: [VERB_TYPES.travelTo, 'office'],
      items: [],
      place: PLACES.room,
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

enum ERR_MSG_TYPES {
	nonesense,
	cannotReach,
}
