import { Component, OnInit, TemplateRef, Input, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { textAppear } from 'src/app/common/animations';

@Component({
  selector: 'app-text-piece',
  templateUrl: './text-piece.component.html',
  styleUrls: ['./text-piece.component.scss'],
  animations: [
    textAppear
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
