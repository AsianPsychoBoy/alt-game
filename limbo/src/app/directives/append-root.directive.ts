import { Directive, ViewContainerRef, ViewChildren, QueryList, OnInit, TemplateRef } from '@angular/core';
import { TextPieceDirective } from './text-piece.directive';
import { merge, Observable, Subscription } from 'rxjs';

@Directive({
  selector: '[appAppendRoot]'
})
export class AppendRootDirective implements OnInit {

  @ViewChildren(TextPieceDirective)
  textPieces !: QueryList<TextPieceDirective>;

  createViewSubscription: Subscription;

  constructor(public viewContainer: ViewContainerRef) { }

  ngOnInit() {
    this.textPieces.changes.subscribe(() => {
      this.createViewSubscription.unsubscribe();
      this.createViewSubscription = merge(...this.textPieces.map(textPiece => textPiece.addCopy$))
      .subscribe(template => {
        this.viewContainer.createEmbeddedView(template);
      });
    });
  }

}
