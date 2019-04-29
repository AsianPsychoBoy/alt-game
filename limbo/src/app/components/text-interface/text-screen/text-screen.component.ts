import { Component, ViewContainerRef, ContentChildren, QueryList, OnInit, AfterViewInit, Renderer2, ViewChildren, EventEmitter, Output } from '@angular/core';
import { TextPieceDirective } from '../../../directives/text-piece.directive';
import { merge, Observable, Subscription } from 'rxjs';
import { GameProgressionService } from 'src/app/services/game-progression.service';
import { ErrorMsgPieceDirective } from 'src/app/directives/error-msg-piece.directive';
import { TextPieceComponent } from '../../text-piece/text-piece.component';
import { filter } from 'rxjs/operators';
import { textAppear } from 'src/app/common/animations';

@Component({
  selector: 'app-text-screen',
  templateUrl: './text-screen.component.html',
  styleUrls: ['./text-screen.component.scss'],
  animations: [
    textAppear
  ]
})
export class TextScreenComponent implements AfterViewInit {

  @ContentChildren(TextPieceDirective)
  textPieces !: QueryList<TextPieceDirective>;

  @ViewChildren(ErrorMsgPieceDirective)
  errorMsgs !: QueryList<ErrorMsgPieceDirective>;

  createViewSubscription: Subscription;

  newErrorText: string[] = [];

  errMsgCount = 0;

  @Output() heightChanged = new EventEmitter<boolean>();

  constructor(public viewContainer: ViewContainerRef, private gps: GameProgressionService, private renderer2: Renderer2) { }

  ngAfterViewInit() {
    this.createViewSubscription = merge(...this.textPieces.map(textPiece => textPiece.addCopy$))
    .pipe(
      filter(t => !!t)
    )
    .subscribe(template => {
      this.viewContainer.createEmbeddedView(template).detectChanges();
      this.heightChanged.emit(true);
    });
    // this.textPieces.changes.subscribe(() => {
    //   this.createViewSubscription.unsubscribe();
    //   this.createViewSubscription = merge(...this.textPieces.map(textPiece => textPiece.addCopy$))
    //   .subscribe(template => {
    //     this.viewContainer.createEmbeddedView(template).detectChanges();
    //     this.heightChanged.emit(true);
    //   });
    // });

    this.gps.displayText.subscribe(text => {
      this.newErrorText.push(text.text);
      this.errMsgCount += 1;
    });

    this.errorMsgs.first.addErrorMsg$.subscribe(template => {
      console.log('new msg')
      const text = this.newErrorText[this.newErrorText.length - 1];
      this.viewContainer.createEmbeddedView(template, {$implicit: text}).detectChanges();
      this.heightChanged.emit(true);
    })
  }

}
