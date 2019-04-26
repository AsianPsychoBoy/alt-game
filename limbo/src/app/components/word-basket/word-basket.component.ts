import { Component, OnInit, HostListener } from '@angular/core';
import { HyperlinkService } from '../../services/hyperlink.service';
import { Word, PART_OF_SPEECH, NOUN_TYPES } from '../../common/Word';
import { GameProgressionService } from '../../services/game-progression.service';

@Component({
  selector: 'app-word-basket',
  templateUrl: './word-basket.component.html',
  styleUrls: ['./word-basket.component.scss']
})
export class WordBasketComponent implements OnInit {

  commandList: Word[] = [];

  commandIndicator = 0;

  constructor(public hyperlinkService: HyperlinkService, private gameService: GameProgressionService) { }

  ngOnInit() {
  }

	toggleWord(word: Word) {
    const index = this.commandList.findIndex((w) => w.id === word.id);
    if (index < 0) {
      if (this.commandList.length <= 2) {
        this.commandList.push(word);
      }
    } else {
      this.commandList.splice(index, 1);
    }
  }

  checkSelected(word: Word) {
    return this.commandList.find((w) => w.id === word.id);
  }

  @HostListener('document:keyup.enter')
  runCommand() {
    if (this.commandList.length > 0) {
      this.gameService.checkCombination(this.commandList).subscribe(
        success => {
          if (success) {
            // this.commandIndicator = 2;
            // setTimeout(() => {
              this.commandList = [];
            //   this.commandIndicator = 0;
            // }, 600);
          } else {
			this.commandList = [];
  //  this.commandIndicator = 1;
  //  setTimeout(() => this.commandIndicator = 0, 600);
          }
        }
      );
    }
  }

  shouldPromptEnter(): boolean {
    return this.commandList.length === 2;
  }
}
