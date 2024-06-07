import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
}

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private carrito: Producto[] = [];
  private carritoSubject: BehaviorSubject<Producto[]> = new BehaviorSubject<Producto[]>([]);

  obtenerCarrito(): Observable<Producto[]> {
    return this.carritoSubject.asObservable();
  }

  agregarAlCarrito(producto: Producto) {
    const existingProduct = this.carrito.find((p) => p.id === producto.id);

    if (existingProduct) {
      existingProduct.cantidad++;
    } else {
      const productoCopia = { ...producto, cantidad: 1 };
      this.carrito.push(productoCopia);
    }

    this.carritoSubject.next(this.carrito);
  }

  decrementarCantidad(producto: Producto) {
    if (producto.cantidad > 1) {
      producto.cantidad--;
      this.carritoSubject.next(this.carrito);
    }
  }

  incrementarCantidad(producto: Producto) {
    producto.cantidad++;
    this.carritoSubject.next(this.carrito);
  }

  quitarDelCarrito(index: number) {
    this.carrito.splice(index, 1);
    this.carritoSubject.next(this.carrito);
  }

  calcularTotal(): number {
    return this.carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
  }

  obtenerProductos(): Producto[] {
    return this.carrito;
  }

  limpiarCarrito() {
    this.carrito = [];
    this.carritoSubject.next(this.carrito);
  }
}
