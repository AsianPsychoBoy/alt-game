import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HyperlinkDirective } from './directives/hyperlink.directive';

import { HyperlinkService } from './services/hyperlink.service';

@NgModule({
  declarations: [
    AppComponent,
    HyperlinkDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    HyperlinkService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
