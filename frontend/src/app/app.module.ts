import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

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
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    HyperlinkService,
    GameProgressionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
