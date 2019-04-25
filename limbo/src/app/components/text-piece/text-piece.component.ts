import { Component, OnInit, TemplateRef, Input, ViewChild } from '@angular/core';
import { trigger,state, style, transition, animate } from '@angular/animations';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-text-piece',
  templateUrl: './text-piece.component.html',
  styleUrls: ['./text-piece.component.scss'],
  animations: [
    trigger('textAppear', [
      state('in', style({ opacity: 1, transform: 'translateY(0)' })),
      transition(':enter', [
        style({ transform: 'translateY(-40%)', opacity: '0'}),
        animate('600ms cubic-bezier(0.165, 0.84, 0.44, 1)')
      ])
    ])
  ]
})
export class TextPieceComponent implements OnInit {
  private prevCount = 0;

  addCopy$ = new Subject<TemplateRef<any>>();

  @Input() set unlockCount(count: number) {
    if (count > 0) {
      this.addCopy$.next(this.templateRef);
    } else {

    }
    this.prevCount = count;
  }

  @ViewChild('textTemplateref') templateRef: TemplateRef<any>

  constructor() { }

  ngOnInit() {
  }

}
