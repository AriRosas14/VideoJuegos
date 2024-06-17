import { Component } from '@angular/core';
import { ProductosService } from '../productos.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder,private authService: ProductosService, private router: Router){
        //Formulario de Regisgtro
        this.registerForm = this.formBuilder.group({
          username: ['', Validators.required], // Campo para el nombre de usuario
          password: ['', Validators.required], // Campo para la contraseña
          confirmPassword: ['', Validators.required] // Campo para confirmar la contraseña
        }, {
          validators: this.passwordMatchValidator // Validador personalizado para comparar contraseñas
        });
  }



   // Validador personalizado para verificar si las contraseñas coinciden
  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordsNotMatch: true };
  }

  register() {
    if (this.registerForm.valid) {
      // Lógica para enviar el formulario al backend
      const { username, password } = this.registerForm.value;
      this.authService.registerUser(username, password).subscribe(
        (response) => {
          console.log('Usuario registrado exitosamente:', response);
          // Limpiar formulario u otras operaciones post-registro
          this.errorMessage = '';
          this.registerForm.reset(); // Reiniciar el formulario después del registro exitoso
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error al registrar usuario:', error);
          if (error.status === 400 && error.error.detail === 'El nombre de usuario ya está en uso') {
            this.errorMessage = 'El nombre de usuario ya está en uso. Por favor, elige otro nombre.';
          } else {
            this.errorMessage = 'Error al registrar usuario. Por favor, intenta de nuevo más tarde.';
          }
        }
      );
    }
  }
}
