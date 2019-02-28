import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt'
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule
} from '@angular/material';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { HeaderComponent } from './header/header.component';
import { MobileComponent } from './mobile/mobile.component';
import { DesktopComponent } from './desktop/desktop.component';
import { ReportComponent } from './report/report.component';
import { RucheListComponent } from './ruche-list/ruche-list.component';
import { RucheDetailComponent } from './ruche-detail/ruche-detail.component';
import { LogoComponent } from './logo/logo.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { MesureService } from './mesure.service';
import { ChartComponent } from './chart/chart.component';
import { ItemComponent } from './item/item.component';
import { SelectRucheComponent } from './select-ruche/select-ruche.component';
import { RucheService } from './ruche.service';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    DashboardComponent,
    SettingsComponent,
    ProfileComponent,
    SidemenuComponent,
    HeaderComponent,
    MobileComponent,
    DesktopComponent,
    ReportComponent,
    RucheListComponent,
    RucheDetailComponent,
    LogoComponent,
    LoginComponent,
    ChartComponent,
    ItemComponent,
    SelectRucheComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    NgbDatepickerModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:9000'],
        blacklistedRoutes: ['/.netlify/functions/app/login']
      }
    })
  ],
  providers: [
    AuthService,
    AuthGuard,
    MesureService,
    RucheService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
