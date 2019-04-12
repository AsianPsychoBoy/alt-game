import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { HyperlinkService } from '../services/hyperlink.service';
import { Word } from '../common/Word';
import { GameProgressionService } from '../services/game-progression.service';

@Directive({
	selector: '[appHyperlink]'
})
export class HyperlinkDirective implements OnInit {

  word: Word;

	constructor(private el: ElementRef, private hyperlinkService: HyperlinkService, private gameProgressionService: GameProgressionService) { }

  ngOnInit() {
    this.word = new Word(this.el.nativeElement.innerText, this.hyperlinkService.newWordId());
    this.el.nativeElement.classList.add('linkableWord');
  }

	@HostListener('click')
  toggleWord() {
    this.hyperlinkService.toggleWord(this.word);
    // this.el.nativeElement.classList.add('linkedWord');
  }

	// @HostListener('mousedown')
	// initialWord() {
  //   this.hyperlinkService.addWord(this.word);
  //   this.el.nativeElement.classList.add('linkedWord');
  // }

  // @HostListener('window:mouseup')
  // clearWords() {

  //   this.hyperlinkService.isLinking.take(1).subscribe(
  //     isLinking => {
  //       if (isLinking) {
  //         this.gameProgressionService.checkCombination(this.hyperlinkService.linkedWords);
  //         this.hyperlinkService.clearWords();
  //       }
  //     }
  //   )

  //   this.el.nativeElement.classList.remove('linkedWord');
  // }

  // @HostListener('mouseover')
  // addWord() {
  //   this.hyperlinkService.isLinking.take(1).subscribe(
  //     isLinking => {
  //       if (isLinking) {
  //         this.hyperlinkService.addWord(this.word);
  //         this.el.nativeElement.classList.add('linkedWord');
  //       }
  //     }
  //   )
  // }

}
