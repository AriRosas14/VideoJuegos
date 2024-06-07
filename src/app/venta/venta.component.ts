
import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../productos.service';
import { CarritoService } from '../carrito.service';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
}

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {
  elementos: Producto[] = [];
  client: any[] = [];
  empleados: any[]= [];
  opciones: string[] = ['Tarjeta', 'Efectivo', 'Transferencia'];

  constructor(private service: ProductosService, private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.obtenerClientes();
    this.obtenerProductos();
    this.obtenerEmpleados();
  }

  obtenerClientes() {
    this.service.getClientes().subscribe(
      (data) => {
        this.client = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  obtenerEmpleados() {
    this.service.getEmpleado().subscribe(
      (data) => {
        this.empleados = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  obtenerProductos() {
    this.service.getProductos().subscribe(
      (data) => {
        this.elementos = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  agregarAlCarrito(producto: Producto) {
    this.carritoService.agregarAlCarrito(producto);
  }
}