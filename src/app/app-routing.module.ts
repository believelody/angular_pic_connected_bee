import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './test/test.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component';
import { ReportComponent } from './report/report.component';
import { RucheListComponent } from './ruche-list/ruche-list.component';
import { RucherListComponent } from './rucher-list/rucher-list.component';
import { RucherDetailComponent } from './rucher-detail/rucher-detail.component';
import { RucheDetailComponent } from './ruche-detail/ruche-detail.component';

const routes: Routes = [
  { path: 'test', component: TestComponent },
  { path: '', component: DashboardComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'reports', component: ReportComponent },
  { path: 'ruchers', component: RucherListComponent },
  { path: 'ruchers/:id', component: RucherDetailComponent },
  { path: 'ruchers/:idRucher/ruches', component: RucheListComponent },
  { path: 'ruchers/:idRucher/ruches/:idRuche', component: RucheDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
