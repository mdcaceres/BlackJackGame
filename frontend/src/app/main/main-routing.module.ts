import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { LobbyComponent } from './lobby/lobby.component';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [
  {path:"", component:LobbyComponent},
  {path:"game", component:GameComponent},
  {path:"game/:id", component:GameComponent},
  {path:"reportes", component:ReportsComponent},
  {path:'**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
