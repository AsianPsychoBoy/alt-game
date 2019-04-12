import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { HyperlinkService } from '../services/hyperlink.service';
import { Word } from '../common/Word';

@Directive({
	selector: '[appHyperlink]'
})
export class HyperlinkDirective implements OnInit {

  word: Word;

	constructor(private el: ElementRef, private hyperlinkService: HyperlinkService) { }

  ngOnInit() {
    this.word = new Word(this.el.nativeElement.innerText, this.hyperlinkService.newWordId());
    this.el.nativeElement.classList.add('linkableWord');
  }

	@HostListener('mousedown')
	initialWord() {
    this.hyperlinkService.addWord(this.word);
    this.el.nativeElement.classList.add('linkedWord');
  }

  @HostListener('window:mouseup')
  clearWords() {
    if (this.hyperlinkService.isLinking) {
      this.hyperlinkService.clearWords();
      this.el.nativeElement.classList.remove('linkedWord');
    }
  }

  @HostListener('mouseover')
  addWord() {
    if (this.hyperlinkService.isLinking) {
      this.hyperlinkService.addWord(this.word);
      this.el.nativeElement.classList.add('linkedWord');
    }
  }

}
