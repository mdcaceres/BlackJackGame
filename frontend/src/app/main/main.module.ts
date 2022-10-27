import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { LobbyComponent } from './lobby/lobby.component';
import { GameComponent } from './game/game.component';
import { PlayerComponent } from './player/player.component';
import { CroupierComponent } from './croupier/croupier.component';


@NgModule({
  declarations: [
    LobbyComponent,
    GameComponent,
    PlayerComponent,
    CroupierComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ],
  exports:[
    LobbyComponent
  ]
})
export class MainModule { }
