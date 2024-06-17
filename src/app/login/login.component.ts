import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductosService } from '../productos.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  selectedTemplate: string | null = null;
  loginForm!: FormGroup;
  showRegister = false;
  error = '';
  
  constructor(
    private authService: ProductosService,
    private fb: FormBuilder,
    private router: Router
  ) {


    //Formulario de inicio de sesion
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

  }

  login() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe({
        next: () => {
          console.log('Login successful');
          // Redirigir a la página principal o a otra página después del login
          this.router.navigate(['inicio'])

        },
        error: err => {
          console.error('Error during login:', err);
          // Manejar errores de autenticación, por ejemplo, mostrar un mensaje al usuario
          this.error = err.error.detail;
        }
      });
    }


}

showRegisterTemplate() {
  this.showRegister = true;
}

showLoginTemplate() {
  this.showRegister = false;
}

}