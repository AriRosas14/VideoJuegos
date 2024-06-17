import { Component } from '@angular/core';
import { ProductoVideojuego } from '../prod';
import { ProductosService } from '../productos.service';

@Component({
  selector: 'app-update-delete-video',
  templateUrl: './update-delete-video.component.html',
  styleUrl: './update-delete-video.component.css'
})
export class UpdateDeleteVideoComponent {
  productos: ProductoVideojuego[] = [];

  constructor(private productoService: ProductosService) {}

 
  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productoService.obtenerProductos().subscribe(
      productos => {
        // Inicializar los campos nuevoPrecio y nuevaCantidad para cada producto
        this.productos = productos.map(producto => ({
          ...producto,
          nuevoPrecio: producto.precio, // inicializa con el precio actual
          nuevaCantidad: producto.cantidad // inicializa con la cantidad actual
        }));
      },
      error => {
        console.error('Error al cargar productos:', error);
        // Manejo de errores: mostrar un mensaje de error al usuario
      }
    );
  }

  actualizarProducto(titulo: string, nuevoPrecio: number, nuevaCantidad: number) {
    if (nuevoPrecio >= 0 && nuevaCantidad >= 0) {
      this.productoService.actualizarProducto(titulo, nuevoPrecio, nuevaCantidad).subscribe(
        response => {
          console.log('Producto actualizado:', response);
          // Actualizar la lista de productos después de la actualización si es necesario
          this.cargarProductos();
        },
        error => {
          console.error('Error al actualizar producto:', error);
          // Manejo de errores: mostrar un mensaje de error al usuario
        }
      );
    }
  }

  eliminarProducto(titulo: string) {
    this.productoService.eliminarProducto(titulo).subscribe(
      response => {
        console.log('Producto eliminado:', response);
        // Actualizar la lista de productos después de la eliminación si es necesario
        this.cargarProductos();
      },
      error => {
        console.error('Error al eliminar producto:', error);
        // Manejo de errores: mostrar un mensaje de error al usuario
      }
    );
  }

  recargarPagina() {
    window.location.reload(); // Método para recargar la página
  }
}
