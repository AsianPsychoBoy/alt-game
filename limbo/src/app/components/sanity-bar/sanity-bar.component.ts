import { Component, OnInit } from '@angular/core';
import { GameProgressionService } from 'src/app/services/game-progression.service';

@Component({
	selector: 'app-sanity-bar',
	templateUrl: './sanity-bar.component.html',
	styleUrls: ['./sanity-bar.component.scss']
})
export class SanityBarComponent implements OnInit {

	flash: boolean;

	sanityScore: number = 100;

	constructor(public gps: GameProgressionService) { }

	ngOnInit() {
		this.gps.getSanityScore().subscribe(s => {
			if (this.sanityScore > s) {
				this.flash = true;
				setTimeout(() => this.flash = false, 4000);
			}
			this.sanityScore = s;
		});
	}


}
