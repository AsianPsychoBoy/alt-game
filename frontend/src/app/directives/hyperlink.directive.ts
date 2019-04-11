import { Directive, ElementRef, HostListener } from '@angular/core';
import { HyperlinkService } from '../services/hyperlink.service';

@Directive({
	selector: '[appHyperlink]'
})
export class HyperlinkDirective {

	constructor(el: ElementRef, hyperlinkService: HyperlinkService) { }

	@HostListener('mousedown')
	selectLink() {
		this.hyperlinkService
	}

}
