import { Component, ViewContainerRef, ContentChildren, QueryList, OnInit, TemplateRef, AfterViewInit } from '@angular/core';
import { TextPieceDirective } from '../../../directives/text-piece.directive';
import { merge, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-text-screen',
  templateUrl: './text-screen.component.html',
  styleUrls: ['./text-screen.component.scss']
})
export class TextScreenComponent implements AfterViewInit {

  @ContentChildren(TextPieceDirective)
  textPieces !: QueryList<TextPieceDirective>;

  createViewSubscription: Subscription;

  constructor(public viewContainer: ViewContainerRef) { }

  ngAfterViewInit() {
    this.createViewSubscription = merge(...this.textPieces.map(textPiece => textPiece.addCopy$))
    .subscribe(template => {
      this.viewContainer.createEmbeddedView(template);
    });
    this.textPieces.changes.subscribe(() => {
      this.createViewSubscription.unsubscribe();
      this.createViewSubscription = merge(...this.textPieces.map(textPiece => textPiece.addCopy$))
      .subscribe(template => {
        this.viewContainer.createEmbeddedView(template);
      });
    });
  }

}
