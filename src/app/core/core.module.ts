import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthInitializationService, AuthInitializerProvider } from './services/auth.service';

@NgModule({
  
  declarations: [NavbarComponent],
  imports: [CommonModule, RouterModule, NgbCollapseModule],  
  providers: [AuthInitializationService, AuthInitializerProvider],
  exports: [NavbarComponent],
})
export class CoreModule {}
