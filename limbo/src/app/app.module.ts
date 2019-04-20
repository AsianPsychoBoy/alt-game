import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HyperlinkDirective } from './directives/hyperlink.directive';

import { HyperlinkService } from './services/hyperlink.service';
import { GameProgressionService } from './services/game-progression.service';
import { WordBasketComponent } from './components/word-basket/word-basket.component';
import { TextInterfaceComponent } from './components/text-interface/text-interface.component';
import { SanityBarComponent } from './components/sanity-bar/sanity-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    HyperlinkDirective,
    WordBasketComponent,
    TextInterfaceComponent,
    SanityBarComponent
  ],
  imports: [
	BrowserModule,
	AppRoutingModule
  ],
  providers: [
    HyperlinkService,
    GameProgressionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
