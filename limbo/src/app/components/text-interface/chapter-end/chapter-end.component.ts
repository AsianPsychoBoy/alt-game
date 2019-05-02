import { Component, OnInit, Input } from '@angular/core';
import { GameProgressionService } from 'src/app/services/game-progression.service';
import { ITEMS_ID } from 'src/app/common/Item';

@Component({
	selector: 'app-chapter-end',
	templateUrl: './chapter-end.component.html',
	styleUrls: ['./chapter-end.component.scss']
})
export class ChapterEndComponent implements OnInit {

	@Input() requireItems: string[];

	constructor(public gps: GameProgressionService) { }

	ngOnInit() {
  }

  findItem(idKey: string) {
    const item = this.gps.currentItems.find(item => item.id === ITEMS_ID[idKey]);
    return item ? item.name : undefined;
  }


	gotoLevel(n: number) {
    if (this.findItem('cold_key') && this.findItem('limbo_key') && this.findItem('exit_key')) {
      this.gps.gotoLevel(n).subscribe(
        success => {}
      );
    }
  }

}
