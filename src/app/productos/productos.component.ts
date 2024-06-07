import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductosService } from '../productos.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit {
  formulario: FormGroup;
  prod: any[] = [];

  ngOnInit(): void {
    this.service.getProductos().subscribe(
      (data) =>{
        this.prod = data;
      },
      (error) => {
        console.error(error);
      })
  }


  constructor(
    private service: ProductosService
  ){
    this.formulario = new FormGroup({
      nombre: new FormControl("", Validators.required),
      categoria : new FormControl("", Validators.required),
      cantidad : new FormControl("", Validators.required),
      precio : new FormControl("",Validators.required),
      descripcion : new FormControl("", Validators.required),
    });
}

editarProducto(producto: any){}

eliminarProducto(product: any): void{
  console.log(product);
  if(product && product.id_producto){
    const id= product.id_producto;
    const confirmacion = window.confirm(`¿Estás seguro de que quieres eliminar el producto?`);
  
    if (confirmacion) {
      this.service.eliminarProducto(id).subscribe(
        (respuesta) => {
          console.log(respuesta);
          alert("Producto eliminado");
          // Actualizar la lista de clientes después de eliminar uno
          this.service.getProductos().subscribe(
            (data) => {
              this.prod = data;
            },
            (error) => {
              console.error(error);
            }
          );
        },
        (error) => {
          console.error(error);
          // Maneja el error según tus necesidades
        }
      );
    }
  } else {
    console.error('El cliente no tiene un ID válido.');
  }
}
  


guardarProducto(){
  const datosProducto = this.formulario.value;

  this.service.guardarProducto(datosProducto).subscribe(
    (respuesta) => {
      console.log(respuesta);
    },
    (error) =>{
      console.error(error);
    }
  )
}

}


  
