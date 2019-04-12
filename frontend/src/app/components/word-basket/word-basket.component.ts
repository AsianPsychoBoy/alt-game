import { Component, OnInit } from '@angular/core';
import { HyperlinkService } from '../../services/hyperlink.service';
import { Word } from 'app/common/Word';

@Component({
  selector: 'app-word-basket',
  templateUrl: './word-basket.component.html',
  styleUrls: ['./word-basket.component.scss']
})
export class WordBasketComponent implements OnInit {

  commandList: Word[] = [];

  constructor(private hyperlinkService: HyperlinkService) { }

  ngOnInit() {
  }

	toggleWord(word: Word) {
    const index = this.commandList.findIndex((w) => w.id === word.id);
    if (index < 0) {
      this.commandList.push(word);
    } else {
      this.commandList.splice(index, 1);
    }
  }

  checkSelected(word: Word) {
    return this.commandList.find((w) => w.id === word.id);
  }
}
