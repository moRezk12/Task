import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { authGuard } from './core/guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path : "login" , component : LoginComponent },
  {path : "home" , component : HomeComponent , canActivate : [authGuard] },
  {path : "dash" , loadChildren : () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) , canActivate: [authGuard] },
  {path : "**" , component : LoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
