import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'; // Importa el servicio de autenticación

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  usuarioAutenticado: boolean = false;

  
  ngOnInit(): void {
  }
  
  logout(){}
}
