import { Component, OnInit } from '@angular/core';
import { GameProgressionService } from 'src/app/services/game-progression.service';

@Component({
  selector: 'app-text-interface',
  templateUrl: './text-interface.component.html',
  styleUrls: ['./text-interface.component.scss']
})
export class TextInterfaceComponent implements OnInit {

  constructor(private gps: GameProgressionService) { }

  ngOnInit() {
  }

}
