import { Injectable } from '@angular/core';
import { Word } from '../common/Word';

import { BehaviorSubject } from 'rxjs';

@Injectable()
export class HyperlinkService {

	wordCount = 0;

	wordList: Word[] = [];

	constructor() { }

	newWordId(): number {
		return ++this.wordCount;
	}

	toggleWord(word: Word) {
		const index = this.wordList.findIndex((w) => w.string === word.string);
		if (index < 0) {
			this.wordList.push(word);
		} else {
			this.wordList.splice(index, 1);
		}
	}

	// clearWords() {
	//	 this.isLinking.next(false);
	//	 this.linkedWords = [];
	//	 console.log('yeet', this.linkedWords)
	// }

}
