import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HyperlinkDirective } from './directives/hyperlink.directive';

import { HyperlinkService } from './services/hyperlink.service';
import { GameProgressionService } from './services/game-progression.service';
import { WordBasketComponent } from './components/word-basket/word-basket.component';

@NgModule({
  declarations: [
    AppComponent,
    HyperlinkDirective,
    WordBasketComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    HyperlinkService,
    GameProgressionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
