import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:'auth', loadChildren:()=> import('./auth/auth.module').then(m => m.AuthModule)},

  {path:'main', loadChildren:()=> import('./main/main.module').then(m => m.MainModule),
   canActivate:[AuthGuard],
   canLoad:[AuthGuard]},
   
  {path:'**', redirectTo:'auth'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
