import { Injectable } from '@angular/core';
import { Word, VERB_TYPES, PART_OF_SPEECH, NOUN_TYPES } from '../common/Word';
import { Observable, Subject } from 'rxjs';
import { ITEMS_ID, Item } from '../common/Item';

@Injectable()
export class GameProgressionService {

	currentLevel = 0;
	currentLevelIndex = 0;

	sanityScore = 100;
	sanityScore$ = new Subject<number>();
	curiosityScore = 100;
	curiosityScore$ = new Subject<number>();

	currentCommand: Word[];
	currentItems: Item[] = [];
	currentLocation: PLACES = PLACES.title;
	previousLocation: PLACES;

	displayText = new Subject<{
		text: string,
		type: 'error' | 'text'
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
				`I can't get to "${words[1]}" from here.`
			] :
			type === ERR_MSG_TYPES.cannotSee ? [
				`I can't see "${words[1]}" around here.`
			] :
			type === ERR_MSG_TYPES.cannotThink ? [
				`${words[1]} does not remind me of anything.`
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
			let levelOverwrite: Partial<GameLevel> = {};

			// parts of speech must match
			if (wordCommand[0].properties.partOfSpeech === PART_OF_SPEECH.verb && wordCommand[1].properties.partOfSpeech === PART_OF_SPEECH.noun) {

				if (wordCommand[1].properties.type === NOUN_TYPES.back) {
					wordCommand[1].properties.type = NOUN_TYPES.place;
					wordCommand[1].string = this.previousLocation.toString();
				}

				if (wordCommand[0].properties.type === VERB_TYPES.think) {
					levelOverwrite = {
						place: this.currentLocation,
						number: this.currentLevel
					};
				}

				for (let i = 0; i < levels.length; i ++) {
					if (
						(levels[i].requirement.level.length === 0 || levels[i].requirement.level.findIndex(lvl => lvl === (this.currentLevel - this.currentLevel % 1)) >= 0) &&
						(levels[i].requirement.place.length === 0 || levels[i].requirement.place.findIndex(place => place === this.currentLocation) >= 0) &&
            (!levels[i].requirement.sublevel || levels[i].requirement.sublevel === this.currentLevel) &&
            levels[i].requirement.command.length > 0 &&
						levels[i].requirement.command[0] === wordCommand[0].properties.type &&
						levels[i].requirement.command[1] === wordCommand[1].string
						// Do the items checking
					) {
						console.log('command navigate: ', levels[i]);
						matchedIndex = i;
						isBad = levels[i].isBad;
						break;
					}
				}
			}

			if (matchedIndex) {
				const newLevel = Object.assign({}, levels[matchedIndex], levelOverwrite);
				this.currentLevel = newLevel.number;
				this.currentLevelIndex = matchedIndex;
				levels[matchedIndex].unlocked++;
				for (let i = 0; i < newLevel.getItems.length; i++) {
					if (!this.currentItems.map(i => i.id).includes(newLevel.getItems[i])) {
            this.currentItems.push(new Item(newLevel.getItems[i]));
            // right now eahch item can only appear once
					}
        }
				if (isBad) {
					this.sanityScore -= 33;
					this.sanityScore$.next(this.sanityScore);
				}
				if (this.previousLocation !== this.currentLocation) {
					this.previousLocation = this.currentLocation;
				}
				this.currentLocation = newLevel.place;
			} else {
				if (wordCommand[0].properties.type === VERB_TYPES.travelTo && wordCommand[1].properties.type === NOUN_TYPES.place) {
					this.displayText.next({
						text: this.generateErrorMessage(wordCommand, ERR_MSG_TYPES.cannotReach),
						type: 'error'
					});
				} else if (wordCommand[0].properties.type === VERB_TYPES.examine) {
					this.displayText.next({
						text: this.generateErrorMessage(wordCommand, ERR_MSG_TYPES.cannotSee),
						type: 'error'
					});
				} else if (wordCommand[0].properties.type === VERB_TYPES.think) {
					this.displayText.next({
						text: this.generateErrorMessage(wordCommand, ERR_MSG_TYPES.cannotThink),
						type: 'error'
					});
				} else {
					this.displayText.next({
						text: this.generateErrorMessage(wordCommand, ERR_MSG_TYPES.nonesense),
						type: 'error'
					});
				}
			}
			subscriber.next(true);
			subscriber.complete();
		});
	}

	gotoLevel(n: number): Observable<boolean> {
		return new Observable((subscriber) => {
			const levelIndex = levels.findIndex(lvl => lvl.number === n);
			if (levelIndex >= 0 && typeof levels[levelIndex].requirement.level.find(lvl => lvl === (this.currentLevel - this.currentLevel % 1)) === 'number') {
				this.currentLevel = levels[levelIndex].number;
				this.currentLevelIndex = levelIndex;
				levels[levelIndex].unlocked++;
				if (this.previousLocation !== this.currentLocation) {
					this.previousLocation = this.currentLocation;
				}
				this.currentLocation = levels[levelIndex].place;
        // console.log('goto', levelIndex, n, this.currentLevel);
        if (levels[levelIndex].isBad) {
					this.sanityScore -= 33;
					this.sanityScore$.next(this.sanityScore);
				} else if (n > this.currentLevel) {
          this.sanityScore += 15;
          this.sanityScore$.next(this.sanityScore);
        }
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
	title,
	tutorial,
	outsideOfBuilding,
	building,
	room,
	office,
	hallway
}

interface GameLevel {
  number: number;
	unlocked: number;
	isBad: boolean;
	place: PLACES;
	getItems: ITEMS_ID[];
	requirement: {
    level: number[];
    sublevel?: number;
		command: string[];
		items: ITEMS_ID[];
		place: PLACES[]
	};
}

const levels: GameLevel[] = [
	{
		number: 0,
	unlocked: 0,
	getItems: [],
		isBad: false,
		place: PLACES.title,
		requirement: {
			level: [1],
			command: [],
			items: [],
			place: [PLACES.tutorial]
		}
	},
	{
		number: 1.001,
		unlocked: 0,
		getItems: [],
		isBad: true,
		place: PLACES.tutorial,
		requirement: {
			level: [1],
			command: [],
			items: [],
			place: [PLACES.tutorial]
		}
	},
	{
		number: 1,
	unlocked: 0,
	getItems: [],
		isBad: false,
		place: PLACES.tutorial,
		requirement: {
			level: [0, 2],
			command: [],
			items: [],
			place: [PLACES.title]
		}
	},
	{
		number: 2,
	unlocked: 0,
	getItems: [],
		isBad: false,
		place: PLACES.outsideOfBuilding,
		requirement: {
			level: [1, 3],
			command: [],
			items: [],
			place: [PLACES.tutorial]
		}
	},
	{
		number: 2.1,
	unlocked: 0,
	getItems: [],
		isBad: false,
		place: PLACES.building,
		requirement: {
			level: [2],
			command: [VERB_TYPES.travelTo, 'building'],
			items: [],
			place: [PLACES.outsideOfBuilding]
		}
	},
//	 {
//		 number: 2.2,
//		 unlocked: 0, getItems: [],
//		 isBad: true,
//		 requirement: {
//			 level: 2,
//			 command: ['cold', 'inside'],
//			 items: []
//		 }
//	 },
	{
		number: 3,
	unlocked: 0,
	getItems: [],
		isBad: false,
		place: PLACES.building,
		requirement: {
			level: [2, 4],
			command: [],
			items: [],
			place: [PLACES.building],
		}
	},
	{
		number: 3.4,
	unlocked: 0,
	getItems: [],
		isBad: false,
		place: PLACES.room,
		requirement: {
			level: [3],
			command: [VERB_TYPES.travelTo, 'room'],
			items: [],
			place: [PLACES.building],
		}
	},
	{
		number: 3.1,
	unlocked: 0,
	getItems: [],
		isBad: true,
		place: PLACES.room,
		requirement: {
			level: [3],
			command: [VERB_TYPES.examine, 'Alan Bennet'], // eyes alan
			items: [],
			place: [PLACES.room],
		}
	},
	{
		number: 3.11,
	unlocked: 0,
	getItems: [],
		isBad: false,
		place: PLACES.room,
		requirement: {
			level: [3],
			command: [],
			items: [],
			place: [PLACES.room],
		}
	},
	{
		number: 3.2,
	unlocked: 0,
	getItems: [],
		isBad: false,
		place: PLACES.room,
		requirement: {
			level: [3],
			command: [VERB_TYPES.examine, 'room'], // inside room
			items: [],
			place: [PLACES.room],
		}
	},
	{
		number: 3.3,
	unlocked: 0,
	getItems: [],
		isBad: false,
		place: PLACES.office,
		requirement: {
			level: [3],
			command: [VERB_TYPES.travelTo, 'office'],
			items: [],
			place: [PLACES.room],
		}
	},
	{
		number: 3.5,
	unlocked: 0,
	getItems: [],
		isBad: false,
		place: PLACES.room,
		requirement: {
			level: [3],
			command: [VERB_TYPES.travelTo, 'room'],
			items: [],
			place: [PLACES.office],
		}
	},
	{
		number: 4,
	unlocked: 0,
	getItems: [],
		isBad: false,
		place: PLACES.building,
		requirement: {
			level: [3, 5],
			command: [],
			items: [],
			place: [PLACES.room]
		}
  },
  {
		number: 4.1,
	unlocked: 0,
	getItems: [],
		isBad: false,
		place: PLACES.room,
		requirement: {
			level: [4],
			sublevel: 4,
			command: [VERB_TYPES.travelTo, 'room'],
			items: [],
			place: [PLACES.building]
		}
  },
  {
		number: 4.2,
	unlocked: 0,
	getItems: [],
		isBad: false,
		place: PLACES.room,
		requirement: {
			level: [4],
			sublevel: 4.1,
			command: [VERB_TYPES.examine, 'Blake Caulfield'],
			items: [],
			place: [PLACES.room]
		}
  },
  {
		number: 4.3,
	unlocked: 0,
	getItems: [],
		isBad: false,
		place: PLACES.room,
		requirement: {
			level: [4],
			sublevel: 4.2,
			command: [VERB_TYPES.examine, 'Blake Caulfield'],
			items: [],
			place: [PLACES.room]
		}
  },
  {
		number: 4.31,
	unlocked: 0,
	getItems: [],
		isBad: false,
		place: PLACES.room,
		requirement: {
			level: [4],
			command: [VERB_TYPES.examine, 'Blake Caulfield'],
			items: [],
			place: [PLACES.room]
		}
  },
  {
		number: 4.51,
	unlocked: 0,
	getItems: [],
		isBad: false,
		place: PLACES.room,
		requirement: {
			level: [4],
			command: [VERB_TYPES.examine, 'backpack'],
			items: [],
			place: [PLACES.room]
		}
  },
  {
		number: 4.5,
		unlocked: 0,
		getItems: [],
		isBad: false,
		place: PLACES.room,
		requirement: {
        level: [4],
        sublevel: 4.3,
			command: [VERB_TYPES.travelTo, 'hallway'],
			items: [],
			place: [PLACES.room]
		}
	},
	{
		number: 4.6,
		unlocked: 0,
		getItems: [],
		isBad: false,
		place: PLACES.room,
		requirement: {
			level: [4],
			command: [VERB_TYPES.examine, 'room'],
			items: [],
			place: [PLACES.room]
		}
	},
	{
		number: 4.7,
		unlocked: 0,
		getItems: [],
		isBad: false,
		place: PLACES.hallway,
		requirement: {
      	level: [4],
			command: [VERB_TYPES.travelTo, 'hallway'],
			items: [],
			place: [PLACES.room]
		}
	},
	{
		number: 4.8,
		unlocked: 0,
		getItems: [],
		isBad: true,
		place: PLACES.hallway,
		requirement: {
		  level: [4],
		  sublevel: 4.7,
			command: [VERB_TYPES.examine, 'shadow'],
			items: [],
			place: [PLACES.hallway]
		}
	},
	{
		number: 4.801,
		unlocked: 0,
		getItems: [],
		isBad: false,
		place: PLACES.hallway,
		requirement: {
			level: [4],
			command: [],
			items: [],
			place: [PLACES.hallway]
		}
	},
	{
		number: 4.4,
		unlocked: 0,
		getItems: [],
		isBad: false,
		place: PLACES.room,
		requirement: {
      	level: [4],
			command: [VERB_TYPES.travelTo, 'room'],
			items: [],
			place: [PLACES.hallway]
		}
  },
  {
		number: 5,
		unlocked: 0,
		getItems: [],
		isBad: false,
		place: PLACES.office,
		requirement: {
      	level: [4, 6],
			command: [],
			items: [],
			place: [PLACES.room]
		}
  },
  {
		number: 5.1,
		unlocked: 0,
		getItems: [],
		isBad: false,
		place: PLACES.room,
		requirement: {
      	level: [5],
			command: [VERB_TYPES.travelTo, 'room'],
			items: [],
			place: [PLACES.office]
		}
  },
  {
		number: 5.3,
		unlocked: 0,
		getItems: [],
		isBad: false,
		place: PLACES.room,
		requirement: {
      	level: [5],
			command: [VERB_TYPES.interact, 'backpack'],
			items: [],
			place: [PLACES.room]
		}
  },
  {
		number: 6,
		unlocked: 0,
		getItems: [],
		isBad: false,
		place: PLACES.room,
		requirement: {
      	level: [5],
			command: [],
			items: [],
			place: [PLACES.room]
		}
  },
  {
		number: 7,
		unlocked: 0,
		getItems: [],
		isBad: false,
		place: PLACES.room,
		requirement: {
      	level: [6],
			command: [],
			items: [],
			place: [PLACES.room]
		}
  },
	{
	number: 0.1,
	unlocked: 0,
	getItems: [ITEMS_ID.cold_key],
		isBad: false,
		place: undefined,
		requirement: {
			level: [],
			command: [VERB_TYPES.think, 'cold'],
			items: [],
			place: []
		}
	},
	{
	number: 0.2,
	unlocked: 0,
	getItems: [ITEMS_ID.limbo_key],
		isBad: false,
		place: undefined,
		requirement: {
			level: [],
			command: [VERB_TYPES.think, 'limbo'],
			items: [],
			place: []
		}
	},
	{
	number: 0.3,
	unlocked: 0,
	getItems: [ITEMS_ID.exit_key],
		isBad: false,
		place: undefined,
		requirement: {
			level: [],
			command: [VERB_TYPES.think, 'exit'],
			items: [],
			place: []
		}
	},
];

enum ERR_MSG_TYPES {
	nonesense,
	cannotReach,
	cannotSee,
	cannotThink
}
