import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DashboardComponent } from './dashboard.component'; 

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule],
})
export class DashboardModule {}
