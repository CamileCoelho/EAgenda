import { ToastrModule } from 'ngx-toastr';
import ptBr from '@angular/common/locales/pt';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { registerLocaleData } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './views/login/login.module';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from './core/auth/services/auth.service';
import { RegistroModule } from './views/registro/registro.module';
import { DashboardModule } from './views/dashboard/dashboard.module'; 
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { httpTokenInterceptor } from './core/auth/services/http-token.interceptor';
import { APP_INITIALIZER, DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';

function logarUsuarioSalvoFactory(authService: AuthService) {
  return () => authService.logarUsuarioSalvo();
}

registerLocaleData(ptBr);

@NgModule({
  declarations: [AppComponent],
  imports: [
    MatProgressSpinnerModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    NgbModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),

    CoreModule,
    RegistroModule,
    LoginModule,
    DashboardModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: logarUsuarioSalvoFactory,
      deps: [AuthService],
      multi: true,
    },
    {
      provide: LOCALE_ID,
      useValue: 'pt',
    },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL',
    },
    provideHttpClient(withInterceptors([httpTokenInterceptor])),
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
