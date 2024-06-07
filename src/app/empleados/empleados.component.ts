import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from '../productos.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})
export class EmpleadosComponent implements OnInit {
  formulario: FormGroup;
  empleados: any[] = [];
  editMode = false;

  constructor(private service: ProductosService){
    this.formulario = new FormGroup({
      nombre: new FormControl("", Validators.required),
      ape1 : new FormControl("", Validators.required),
      ape2 : new FormControl("", Validators.required),
      phone: new FormControl("", Validators.required),
      sueldo: new FormControl("", Validators.required)
    })
  }
  ngOnInit(): void {
    this.service.getEmpleado().subscribe(
      (data) =>{
        this.empleados = data;
      },
      (error) => {
        console.error(error);
      }
    )
  }

  guardarEmpleado(){
    const datosEmpleado = this.formulario.value;

    this.service.guardarEmpleado(datosEmpleado).subscribe(
      (respuesta) => {
        console.log(respuesta);
      },
      (error) =>{
        console.error(error);
      }
    )
  }

  guardarCambios(){}

  eliminarEmpleado(empleado : any){}

  editarEmpleado(empleado: any){}

}
