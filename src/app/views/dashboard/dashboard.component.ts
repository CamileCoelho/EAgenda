import { Component, OnInit } from '@angular/core';
import { UsuarioTokenViewModel } from 'src/app/core/auth/models/usuario-token.view-module';
import { AuthService } from 'src/app/core/auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  usuarioVM?: UsuarioTokenViewModel;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.obterUsuarioAutenticado().subscribe((res) => {
      this.usuarioVM = res;
    });

 
  }
}
