import { Component, OnInit } from '@angular/core';
import { GameProgressionService } from 'src/app/services/game-progression.service';

@Component({
  selector: 'app-sanity-bar',
  templateUrl: './sanity-bar.component.html',
  styleUrls: ['./sanity-bar.component.scss']
})
export class SanityBarComponent implements OnInit {

  constructor(private gps: GameProgressionService) { }

  ngOnInit() {
  }

}
