import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'; // Importa el servicio de autenticación
import { ProductosService } from '../productos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  usuarioAutenticado: boolean = false;
  esAdmin: boolean = false;

  constructor(private authService: ProductosService, private router: Router) {}

 ngOnInit(): void {
    this.authService.isLoggedIn().subscribe((loggedIn: boolean) => {
      this.usuarioAutenticado = loggedIn;
      console.log('Usuario autenticado:', this.usuarioAutenticado);
    });

    this.authService.getUserRole().subscribe((role: string | null) => {
      this.esAdmin = role === 'administrador';
      console.log('Es administrador:', this.esAdmin);
    });
}

  logout() {
    this.authService.logout();
    this.router.navigate(['inicio'])
  }
}
