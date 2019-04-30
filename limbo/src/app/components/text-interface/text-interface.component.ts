import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { GameProgressionService } from 'src/app/services/game-progression.service';
import { ActivatedRoute } from '@angular/router';
import { textAppear } from 'src/app/common/animations';

@Component({
	selector: 'app-text-interface',
	templateUrl: './text-interface.component.html',
	styleUrls: ['./text-interface.component.scss'],
	animations: [
		textAppear
	]
})
export class TextInterfaceComponent implements OnInit {

	constructor(public gps: GameProgressionService, private route: ActivatedRoute, private viewContainer: ViewContainerRef) { }

	ngOnInit() {
		this.route.params.subscribe(p => {
		p.id;
		});

		this.scrollToTop();
	}

	gotoLevel(n: number) {
	this.gps.gotoLevel(n).subscribe(
		success => {}
	);
	}

	scrollToBottom() {
		const el: Element = document.getElementsByClassName('text-container').item(0);
		el.scrollTop = el.scrollHeight;
		console.log('scroll', el, el.scrollTop, el.scrollHeight);
	}

	scrollToTop() {
		const el: Element = document.getElementsByClassName('text-container').item(0);
		el.scrollTop = 0;
	}

}
