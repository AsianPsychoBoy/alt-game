import { Directive, TemplateRef, ViewContainerRef, Input, Host, SkipSelf, Optional } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Directive({
	selector: '[appTextPiece]'
})
export class TextPieceDirective {

	private prevCount = 0;

	addCopy$ = new BehaviorSubject<TemplateRef<any>>(undefined);

	@Input() set appTextPiece(count: number) {
		if (count > 0) {
			this.addCopy$.next(this.templateRef);
		} else {

		}
		this.prevCount = count;
	}

	constructor(
		private templateRef: TemplateRef<any>,
	) { }
}
