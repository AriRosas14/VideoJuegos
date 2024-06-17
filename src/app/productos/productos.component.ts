import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ProductosService } from '../productos.service';
import { Observable } from 'rxjs';
import { ProductoVideojuego } from '../prod';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit {
  formulario: FormGroup;

  producto: ProductoVideojuego = {
    titulo: '',
    plataforma: '',
    categoria: '',
    precio: 0,
    cantidad: 0,
    nombre_tienda: '' // Si es necesario para tu lógica
    ,
    direccion_tienda: ''
  };


  ngOnInit(): void {

  }



  constructor(private fb: FormBuilder, private apiService: ProductosService) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      cantidad: [0, Validators.required],
      precio: [0, Validators.required],
      descripcion: ['']
    });
  }

  onSubmit(): void {
    this.apiService.createProducto(this.producto)
      .subscribe(
        (response) => {
          console.log('Producto creado exitosamente:', response);
          // Aquí podrías redirigir a otra página, mostrar un mensaje de éxito, etc.
        },
        (error) => {
          console.error('Error al crear producto:', error);
          // Maneja el error adecuadamente según tus necesidades
        }
      );
  }

/*
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
  */


/*guardarProducto(){
  const datosProducto = this.formulario.value;

  this.service.guardarProducto(datosProducto).subscribe(
    (respuesta) => {
      console.log(respuesta);
    },
    (error) =>{
      console.error(error);
    }
  )
}*/

}


  
