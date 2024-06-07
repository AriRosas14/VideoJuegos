import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductosService } from '../productos.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  selectedTemplate: string | null = null;
  register!: FormGroup;
  formAccesso!: FormGroup;
  registroVisible: boolean = false;
  
  constructor(
    private service: ProductosService,
    private http: HttpClient,
    private router: Router
  ) {
    //Formulario de Regisgtro
    this.register = new FormGroup({
      name: new FormControl('', Validators.required), // Agregar este control para el nombre
      username: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmpassword: new FormControl('', [Validators.required, this.matchPassword.bind(this)]),
    });

    //Formulario de inicio de sesion
    this.formAccesso = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });

  }



  //Verifica la contraseña que sean iguales
  matchPassword(control: AbstractControl): { [key: string]: any } | null {
    const password = this.register?.get('password')?.value;
    const confirmpassword = control.value;
    if (password !== confirmpassword) {
      return { 'passwordMismatch': true };
    }
    return null;
  }

logIn() {
    // Envía los datos del formulario de inicio de sesión al servicio
  this.service.logIn(this.formAccesso.value).subscribe(response => {
    if (response.success) {
      // Si la autenticación es exitosa, navega a la página de inicio
      this.router.navigate(['/inicio']);
    } else {
      // Muestra un mensaje de error en caso contrario
      console.error('Error en el inicio de sesión:', response.message);
   }
  });
}

  ngOnInit(): void {
  
  }
 
  //Boton del formulario de registro
  registrar() {
    const datosUsuario = this.register.value;

    this.service.guardarUsuario(datosUsuario).subscribe(
      (respuesta) => {
        console.log(respuesta);
      },
      (error) =>{
        console.error(error);
      }
    )
  }



  //Muestra el formulario de inicio de sesion
  showEmailTemplate() {
    this.selectedTemplate = 'email';
  }

  showRegisterTemplate(){
    this.selectedTemplate ='register';   
  }

}

