import { Directive, TemplateRef, Input, ElementRef, Renderer2, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
	selector: '[appErrorMsgPiece]'
})
export class ErrorMsgPieceDirective {

	addErrorMsg$ = new Subject<TemplateRef<any>>();

	@Input()
	set appErrorMsgPiece(count: any) {
		this.addErrorMsg$.next(this.templateRef);
	}

	constructor(public templateRef: TemplateRef<any>) { }

}
