import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from '../productos.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})
export class EmpleadosComponent implements OnInit {
  empleados: any[] = [];
  nombreTienda: string = '';

  constructor(private service: ProductosService){

  }
 ngOnInit(): void {
    this.fetchEmpleadosMiTienda();
  }

  fetchEmpleadosMiTienda(): void {
    const token = this.service.getAccessToken(); // Método para obtener el token del servicio de autenticación
  
    if (token) {
      this.service.getEmpleadosMiTienda(token).subscribe(
        (data) => {
          this.nombreTienda = data.nombre_tienda; // Asignamos el nombre de la tienda
          this.empleados = data.empleados;
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
