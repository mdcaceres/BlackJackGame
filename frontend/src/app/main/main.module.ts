import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { LobbyComponent } from './lobby/lobby.component';
import { GameComponent } from './game/game.component';
import { PlayerComponent } from './player/player.component';
import { CroupierComponent } from './croupier/croupier.component';
import { ReportsComponent } from './reports/reports.component';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    LobbyComponent,
    GameComponent,
    PlayerComponent,
    CroupierComponent,
    ReportsComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    NgChartsModule
  ],
  exports:[
    LobbyComponent
  ]
})
export class MainModule { }
