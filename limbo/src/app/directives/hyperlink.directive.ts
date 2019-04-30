import { Directive, ElementRef, HostListener, OnInit, Input } from '@angular/core';
import { HyperlinkService } from '../services/hyperlink.service';
import { Word, AllWordProperties, PART_OF_SPEECH } from '../common/Word';
import { GameProgressionService } from '../services/game-progression.service';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
	selector: '[appHyperlink]'
})
export class HyperlinkDirective implements OnInit {

	word: Word;

	offsetX: number;
	offsetY: number;

	@Input() set wordProperties(propString: string) {
	const propList = propString.split(' ');
	const prop: AllWordProperties = {
		partOfSpeech: propList[0] as any,
		type: propList[1] as any
	};
		this.word = new Word(this.el.nativeElement.innerText, this.hyperlinkService.newWordId(), prop);
	};

	constructor(private el: ElementRef, private hyperlinkService: HyperlinkService, private gameProgressionService: GameProgressionService) { }

	ngOnInit() {
		const element: HTMLElement = this.el.nativeElement;
		element.classList.add('linkable-word');

		fromEvent(document.body, 'mousemove')
		.subscribe((e: MouseEvent) => {
			const rect = element.getBoundingClientRect();
			const xDistance = e.clientX - (rect.left + (rect.right - rect.left) / 2);
			const yDistance = e.clientY - (rect.top + (rect.bottom - rect.top) / 2);
			const xOffset = xDistance > 0 ? Math.sqrt(xDistance) : - Math.sqrt(-xDistance);
			const yOffset = yDistance > 0 ? Math.sqrt(yDistance) : - Math.sqrt(-yDistance);
			console.log()
			element.style.transform = `translate(${-xOffset / 7}px, ${-yOffset / 7}px)`;
		});
	}

	@HostListener('click')
	toggleWord() {
		this.hyperlinkService.toggleWord(this.word);
		// this.el.nativeElement.classList.add('linkedWord');
	}

	// @HostListener('mousedown')
	// initialWord() {
	//	 this.hyperlinkService.addWord(this.word);
	//	 this.el.nativeElement.classList.add('linkedWord');
	// }

	// @HostListener('window:mouseup')
	// clearWords() {

	//	 this.hyperlinkService.isLinking.take(1).subscribe(
	//		 isLinking => {
	//			 if (isLinking) {
	//				 this.gameProgressionService.checkCombination(this.hyperlinkService.linkedWords);
	//				 this.hyperlinkService.clearWords();
	//			 }
	//		 }
	//	 )

	//	 this.el.nativeElement.classList.remove('linkedWord');
	// }

	// @HostListener('mouseover')
	// addWord() {
	//	 this.hyperlinkService.isLinking.take(1).subscribe(
	//		 isLinking => {
	//			 if (isLinking) {
	//				 this.hyperlinkService.addWord(this.word);
	//				 this.el.nativeElement.classList.add('linkedWord');
	//			 }
	//		 }
	//	 )
	// }

}
