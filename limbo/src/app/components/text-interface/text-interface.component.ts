import { Component, OnInit } from '@angular/core';
import { GameProgressionService } from 'src/app/services/game-progression.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-text-interface',
  templateUrl: './text-interface.component.html',
  styleUrls: ['./text-interface.component.scss']
})
export class TextInterfaceComponent implements OnInit {

  constructor(private gps: GameProgressionService, private route: ActivatedRoute) { }

  ngOnInit() {
	  this.route.params.subscribe(p => {
		p.id;
	  });
  }

  gotoLevel(n: number) {
	this.gps.gotoLevel(n).subscribe(
		success => {}
	);
  }

}
