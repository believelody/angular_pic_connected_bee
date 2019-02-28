import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component';
import { ReportComponent } from './report/report.component';
import { RucheListComponent } from './ruche-list/ruche-list.component';
import { RucheDetailComponent } from './ruche-detail/ruche-detail.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';

// AuthGuard est une fonction (appelée 'middleware') qui controle l'accès à une route en vérifiant si l'utilisateur est authentifié ou pas. Si ce n'est pas le cas, la page retournée à chaque clic sera la page login

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'reports', component: ReportComponent, canActivate: [AuthGuard] },
  { path: '/ruches', component: RucheListComponent, canActivate: [AuthGuard] },
  { path: '/ruches/:idRuche', component: RucheDetailComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
