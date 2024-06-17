
import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../productos.service';
import { CarritoService } from '../carrito.service';
import { ProductoVideojuego } from '../prod';


@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {
  tienda: string = "";
  productos: ProductoVideojuego[] = [];
  productosPaginados: ProductoVideojuego[] = [];
  //Paginacion
  limit: number = 12;
  currentPage: number = 1;
  totalPages: number = 1;
  totalPagesArray: number[] = [];
  mostrarSpinner = false;

  constructor(private service: ProductosService) {}

  ngOnInit(): void {
    const selectedStore = localStorage.getItem('selectedStore');
    this.tienda = selectedStore !== null ? selectedStore : '';
  
    this.obtenerProductos();


  }



  obtenerProductos() {
    this.mostrarOcultarSpinner(true);

    this.service.getProductos().subscribe(
    productos => {
        this.productos = productos;
        this.totalPages = Math.ceil(this.productos.length / this.limit);
        this.totalPagesArray = Array.from({length: this.totalPages}, (_, i) => i + 1);
        this.updatePaginatedProducts();
        this.mostrarOcultarSpinner(false);
      },
      error => {
        console.error(error);
        this.mostrarOcultarSpinner(false);
      }
    );
  }

  

  updatePaginatedProducts(): void {
    const startIndex = (this.currentPage - 1) * this.limit;
    const endIndex = startIndex + this.limit;
    this.productosPaginados = this.productos.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedProducts();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedProducts();
    }
  }

  setPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedProducts();
    }
  }

  mostrarOcultarSpinner(mostrar: boolean) {
    this.mostrarSpinner = mostrar;
  }

  agregarAlCarrito(item: ProductoVideojuego) {
    const nombre = item.titulo; // Obtener nombre del producto
    const cantidad = 1; // Definir la cantidad que se quiere agregar

    const itemParaAgregar = { nombre, cantidad };

    this.service.agregarAlCarrito(itemParaAgregar).subscribe(
      response => {
        console.log('Producto agregado al carrito:', response);
        // Manejar la respuesta según sea necesario
      },
      error => {
        console.error('Error al agregar producto al carrito:', error);
        // Manejar el error según sea necesario
      }
    );
  }


}
