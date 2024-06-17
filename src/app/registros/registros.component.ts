import { Component } from '@angular/core';
import { ProductosService } from '../productos.service';


@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrl: './registros.component.css'
})
export class RegistrosComponent {
  ventas: any[] = [];

  constructor(private service: ProductosService) {}

  ngOnInit(): void {
    this.fetchVentasMiTienda();
  }

  fetchVentasMiTienda(): void {
    const token = this.service.getAccessToken(); // Método para obtener el token del servicio de autenticación
  
    if (token) {
      this.service.getVentasMiTienda(token).subscribe(
        (data) => {
          this.ventas = data;
        },
        (error) => {
          console.error('Error al obtener las ventas:', error);
          // Manejo de errores (puedes mostrar un mensaje al usuario, por ejemplo)
        }
      );
    } else {
      console.error('No se encontró el token de acceso.'); // Mensaje de error si no se encuentra el token
      // Puedes manejar este caso según la lógica de tu aplicación (por ejemplo, redirigir a la página de inicio de sesión)
    }
  }
}
