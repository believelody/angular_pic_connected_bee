import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component';
import { ReportComponent } from './report/report.component';
import { RucheListComponent } from './ruche-list/ruche-list.component';
import { RucherListComponent } from './rucher-list/rucher-list.component';
import { RucherDetailComponent } from './rucher-detail/rucher-detail.component';
import { RucheDetailComponent } from './ruche-detail/ruche-detail.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'reports', component: ReportComponent, canActivate: [AuthGuard] },
  { path: 'ruchers', component: RucherListComponent, canActivate: [AuthGuard] },
  { path: 'ruchers/:id', component: RucherDetailComponent, canActivate: [AuthGuard] },
  { path: 'ruchers/:idRucher/ruches', component: RucheListComponent, canActivate: [AuthGuard] },
  { path: 'ruchers/:idRucher/ruches/:idRuche', component: RucheDetailComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
