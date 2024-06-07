import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../carrito.service';

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
  carrito: Producto[] = [];
  client: any[] = [];
  empleados: any[]= [];
  opciones: string[] = ['Tarjeta', 'Efectivo', 'Transferencia'];

  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.carritoService.obtenerCarrito().subscribe((data) => {
      this.carrito = data;
    });
  }

  decrementarCantidad(producto: Producto) {
    this.carritoService.decrementarCantidad(producto);
  }

  incrementarCantidad(producto: Producto) {
    this.carritoService.incrementarCantidad(producto);
  }

  quitarDelCarrito(index: number) {
    this.carritoService.quitarDelCarrito(index);
  }

  calcularTotal() {
    return this.carritoService.calcularTotal();
  }

  finalizarCompra() {
    if (this.carrito.length === 0) {
      console.error('El carrito está vacío. No se puede finalizar la compra.');
      return;
    }

    const clienteSeleccionado = (document.getElementById('cliente') as HTMLSelectElement).value;
    const metodoPagoSeleccionado = (document.getElementById('metodoPago') as HTMLSelectElement).value;
    const empleadoSeleccionado = (document.getElementById('empleado') as HTMLSelectElement).value;

    const fechaActual = new Date();
    const fecha = `${fechaActual.getFullYear()}-${fechaActual.getMonth() + 1}-${fechaActual.getDate()}`;
    const hora = `${fechaActual.getHours()}:${fechaActual.getMinutes()}:${fechaActual.getSeconds()}`;

    const total = this.calcularTotal();

    const compra = {
      id_empleado: empleadoSeleccionado,
      id_cliente: clienteSeleccionado,
      metodo_pago: metodoPagoSeleccionado,
      total_venta: total,
      fecha: fecha,
      hora: hora,
      productos: this.carrito.map(producto => ({ id_producto: producto.id, cantidad: producto.cantidad }))
    };

    console.log('Datos de la compra:', compra);

    // Aquí podrías realizar la lógica para enviar los datos al servidor
    // this.service.finalizarCompra(compra).subscribe(
    //   (respuesta) => {
    //    console.log('Compra finalizada correctamente:', respuesta);
    //    // Puedes realizar otras acciones después de finalizar la compra
    //    },
    //    (error) => {
    //      console.error('Error al finalizar la compra:', error);
    //    }
    //  );
  }
}
