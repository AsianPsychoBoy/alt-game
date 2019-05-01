import { Component, OnInit, Input } from '@angular/core';
import { GameProgressionService } from 'src/app/services/game-progression.service';

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

}
