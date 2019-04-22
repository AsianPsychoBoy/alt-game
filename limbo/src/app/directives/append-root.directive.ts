import { Directive, ViewContainerRef, ViewChildren, QueryList, OnInit, TemplateRef, AfterViewInit } from '@angular/core';
import { TextPieceDirective } from './text-piece.directive';
import { merge, Observable, Subscription } from 'rxjs';

@Directive({
  selector: '[appAppendRoot]'
})
export class AppendRootDirective implements AfterViewInit {

  @ViewChildren(TextPieceDirective)
  textPieces !: QueryList<TextPieceDirective>;

  createViewSubscription: Subscription;

  constructor(public viewContainer: ViewContainerRef) { }

  ngAfterViewInit() {
    console.log(this.textPieces);
    this.textPieces.changes.subscribe(() => {
      this.createViewSubscription.unsubscribe();
      this.createViewSubscription = merge(...this.textPieces.map(textPiece => textPiece.addCopy$))
      .subscribe(template => {
        this.viewContainer.createEmbeddedView(template);
      });
    });
  }

}
