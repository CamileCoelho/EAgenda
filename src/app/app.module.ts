import { APP_INITIALIZER, NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardModule } from './views/dashboard/dashboard.module'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistroModule } from './views/registro/registro.module';
import { LoginModule } from './views/login/login.module';
import { AuthService } from './core/auth/services/auth.service';

function logarUsuarioSalvoFactory(authService: AuthService) {
  return () => authService.logarUsuarioSalvo();
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
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
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: logarUsuarioSalvoFactory,
    deps: [AuthService],
    multi: true,
  }],
  bootstrap: [AppComponent],
})
export class AppModule { }
