import { Injectable } from '@angular/core';
import { Word } from 'app/common/Word';

@Injectable()
export class HyperlinkService {

  wordCount = 0

  linkedWords: Word[] = [];

  isLinking: boolean;

  constructor() { }

  newWordId(): number {
    return ++this.wordCount;
  }

	addWord(w: Word) {
    this.isLinking = true;
    this.linkedWords.push(w);
    console.log('yah', this.linkedWords)
  }

  clearWords() {
    this.isLinking = false;
    this.linkedWords = [];
    console.log('yeet', this.linkedWords)
  }

}
