import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chapter-end',
  templateUrl: './chapter-end.component.html',
  styleUrls: ['./chapter-end.component.scss']
})
export class ChapterEndComponent implements OnInit {

	@Input() requireItems: string[];

  constructor() { }

  ngOnInit() {
  }

}
