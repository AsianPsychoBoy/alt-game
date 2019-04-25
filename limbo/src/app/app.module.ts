import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HyperlinkDirective } from './directives/hyperlink.directive';

import { HyperlinkService } from './services/hyperlink.service';
import { GameProgressionService } from './services/game-progression.service';
import { WordBasketComponent } from './components/word-basket/word-basket.component';
import { TextInterfaceComponent } from './components/text-interface/text-interface.component';
import { SanityBarComponent } from './components/sanity-bar/sanity-bar.component';
import { TextPieceDirective } from './directives/text-piece.directive';
import { CommonModule } from '@angular/common';
import { AppendRootDirective } from './directives/append-root.directive';
import { TextScreenComponent } from './components/text-interface/text-screen/text-screen.component';
import { ErrorMsgPieceDirective } from './directives/error-msg-piece.directive';
import { TextPieceComponent } from './components/text-piece/text-piece.component';

@NgModule({
  declarations: [
    AppComponent,
    HyperlinkDirective,
    WordBasketComponent,
    TextInterfaceComponent,
    SanityBarComponent,
    TextPieceDirective,
    AppendRootDirective,
    TextScreenComponent,
    ErrorMsgPieceDirective,
    TextPieceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule
  ],
  providers: [
    HyperlinkService,
    GameProgressionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
