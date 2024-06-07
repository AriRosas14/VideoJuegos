import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioAutenticadoSubject: BehaviorSubject<boolean>;
  public usuarioAutenticado: Observable<boolean>;

  constructor() {
    this.usuarioAutenticadoSubject = new BehaviorSubject<boolean>(false);
    this.usuarioAutenticado = this.usuarioAutenticadoSubject.asObservable();
  }

  login(): Observable<any> {
    // Lógica de inicio de sesión aquí
    // Por ejemplo, puedes autenticar al usuario a través de una llamada HTTP al backend
    // Una vez que la autenticación es exitosa, actualizamos el BehaviorSubject
    return new Observable(observer => {
      // Supongamos que response contiene el resultado de la autenticación
      const response = { success: true }; // Esto es solo un ejemplo
      this.usuarioAutenticadoSubject.next(response.success);
      observer.next(response);
      observer.complete();
    });
  }

  logout(): void {
    // Lógica de cierre de sesión aquí
    // Por ejemplo, puedes limpiar el token de autenticación o realizar una llamada HTTP al backend para cerrar la sesión del usuario
    // Una vez que el usuario ha cerrado sesión, actualizamos el BehaviorSubject
    this.usuarioAutenticadoSubject.next(false);
  }

  isAuthenticated(): boolean {
    return this.usuarioAutenticadoSubject.value;
  }
}
