import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { GameComponent } from './components/game/game.component';
import { PlayerComponent } from './components/player/player.component';
import { CroupierComponent } from './components/croupier/croupier.component';


@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    PlayerComponent,
    CroupierComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
