import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { GameProgressionService } from 'src/app/services/game-progression.service';
import { ActivatedRoute } from '@angular/router';
import { trigger,state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-text-interface',
  templateUrl: './text-interface.component.html',
  styleUrls: ['./text-interface.component.scss'],
  animations: [
    trigger('textAppear', [
      state('in', style({ opacity: 1, transform: 'translateY(0)' })),
      transition(':enter', [
        style({ transform: 'translateY(-40%)', opacity: '0'}),
        animate('400ms cubic-bezier(0.165, 0.84, 0.44, 1)')
      ])
    ])
  ]
})
export class TextInterfaceComponent implements OnInit {

  constructor(public gps: GameProgressionService, private route: ActivatedRoute, private viewContainer: ViewContainerRef) { }

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

  scrollToBottom() {
    const el:Element = document.getElementsByClassName('text-container').item(0);
    el.scrollTop = el.scrollHeight;
    console.log('scroll', el, el.scrollTop, el.scrollHeight)
  }

}
