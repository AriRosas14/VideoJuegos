import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../carrito.service';
import { ProductosService } from '../productos.service';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
}

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carrito: any[] = [];

  constructor(private carritoService: ProductosService) {}

  ngOnInit(): void {
    this.obtenerCarrito();
  }

  obtenerCarrito(): void {
    this.carritoService.obtenerCarrito().subscribe(
      response => {
        this.carrito = response.carrito;
      },
      error => {
        console.error('Error al obtener el carrito:', error);
      }
    );
  }

  eliminarProducto(nombreProducto: string): void {
    this.carritoService.eliminarProductoDelCarrito(nombreProducto).subscribe(
      response => {
        console.log(response);  // Manejar la respuesta como desees
        this.obtenerCarrito();  // Actualizar el contenido del carrito después de eliminar
      },
      error => {
        console.error('Error al eliminar producto del carrito:', error);
        // Manejar el error apropiadamente
      }
    );
  }

  vaciarCarrito(): void {
    this.carritoService.vaciarCarrito().subscribe(
      () => {
        this.carrito = [];
        console.log('Carrito vaciado');
      },
      error => {
        console.error('Error al vaciar el carrito:', error);
      }
    );
  }

  realizarCompra(): void {
    this.carritoService.realizarCompra().subscribe(
      () => {
        this.carrito = [];
        console.log('Compra realizada correctamente');
        alert('Compra realizada correctamente');
      },
      error => {
        console.error('Error al realizar la compra:', error);
      }
    );
  }
}
