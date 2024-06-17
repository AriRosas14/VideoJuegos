import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { ProductoVideojuego } from "../app/prod" 
import { TokenResponse } from './token';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private apiUrl = 'http://localhost:8000';
  private loggedIn = new BehaviorSubject<boolean>(false);
  private currentUserSubject = new BehaviorSubject<string | null>(localStorage.getItem('username'));
  private currentUserRole = new BehaviorSubject<string | null>(localStorage.getItem('user_role'));
  
  constructor(private http: HttpClient) {
    this.loggedIn.next(this.getAccessToken() !== null);
    this.currentUserSubject.next(localStorage.getItem('username'));
    this.currentUserRole.next(localStorage.getItem('role'));
  }

  //Cliente
  /*registrarCliente(datosCliente: any): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/clientes`, datosCliente);
  }
  getClientes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/clientes`);
  }
  getClienteYDireccion(clienteId: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/clientes/${clienteId}`)
  }
  eliminarCliente(clienteId: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/clientes/${clienteId}`);
  }
  editarClienteYDireccion(clienteId: any, datosCliente: any): Observable<any> {
    console.log(datosCliente);
    return this.http.put<any>(`${this.apiUrl}/clientes/${clienteId}`, datosCliente);
  }*/

  //Productos

  getProductos(): Observable<ProductoVideojuego[]> {
    const storeName = localStorage.getItem('selectedStore');
    if (!storeName) {
      throw new Error('Nombre de tienda no encontrado en localStorage');
    }

    return this.http.get<ProductoVideojuego[]>(`${this.apiUrl}/productos/tienda/${storeName}`);
  }

  // Método para crear un nuevo producto
  createProducto(productoData: any): Observable<any> {
    const url = `${this.apiUrl}/productos/`;
    return this.http.post<any>(url, productoData);
  }

  //Actualizar y eliminar productos
  obtenerProductos(): Observable<ProductoVideojuego[]> {
    const url = `${this.apiUrl}/productos/`;
    return this.http.get<ProductoVideojuego[]>(url);
  }

  actualizarProducto(titulo: string, precio: number, cantidad: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/productos/${titulo}`, { precio, cantidad });
  }

  eliminarProducto(titulo: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/productos/${titulo}`);
  }

  //login
  login(username: string, password: string): Observable<TokenResponse> {
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);
  
    return this.http.post<TokenResponse>(`${this.apiUrl}/token`, body.toString(), {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    })
    .pipe(
      tap(response => {
        console.log('Respuesta del servidor', response); // Log de depuración
        console.log(response.rol)
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('username', username);
        localStorage.setItem('user_role', response.rol);
        console.log('Rol guardado en localStorage:', localStorage.getItem('user_role'));
        this.loggedIn.next(true);
        this.currentUserSubject.next(username);
        this.currentUserRole.next(response.rol);
      }, error => {
        console.log('Error en la solicitud de inicio de sesión', error); // Log de depuración
      })
    );
  }

  autenticarConTokenGuardado() {
    const accessToken = localStorage.getItem('access_token');
    const username = localStorage.getItem('username');
    const userRole = localStorage.getItem('user_role');

    if (accessToken && username && userRole) {
      // Autenticar al usuario con el token guardado
      this.loggedIn.next(true);
      this.currentUserSubject.next(username);
      this.currentUserRole.next(userRole);
    } else {
      // Si no hay token válido, cerrar sesión
      this.logout();
    }
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
    localStorage.removeItem('user_role');
    this.loggedIn.next(false);
    this.currentUserSubject.next(null);
    this.currentUserRole.next(null);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getUserRole(): Observable<string | null> {
    return this.currentUserRole.asObservable();
  }

  public get currentUserValue(): string | null {
    return this.currentUserSubject.value;
  }

  public get currentUserRoleValue(): string | null {
    return this.currentUserRole.value;
  }

  //registro
  registerUser(username: string, password: string): Observable<any> {
    const nombreTienda = localStorage.getItem('selectedStore');

    const userData = {
        nombre: username,
        password: password,
        rol: 'cliente',
        nombre_tienda: nombreTienda
    };

    console.log(userData);

    return this.http.post<any>(`${this.apiUrl}/usuarios/`, userData)
        .pipe(
            catchError((error) => {
                console.error('Error al registrar usuario:', error);
                let errorMessage = 'Error al registrar usuario. Por favor, intenta de nuevo más tarde.';
                if (error.status === 422) {
                    // Manejar errores específicos de validación del servidor si es necesario
                    errorMessage = 'Los datos proporcionados no son válidos. Por favor, verifica los campos y vuelve a intentarlo.';
                }
                return throwError(errorMessage);
            })
        );
  }


  //Obtener ventas por tienda
  getVentasMiTienda(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    console.log(headers);

    return this.http.get<any>(`${this.apiUrl}/ventas/mi-tienda`, { headers })
    .pipe(
      catchError(error => {
        console.error('Error al obtener ventas:', error);
        return throwError(error); // Manejo básico de errores
      })
    );
  }

  //obtener empleados por la tienda del administrador
  getEmpleadosMiTienda(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${this.apiUrl}/empleados/mi-tienda`, { headers });
  }
 
  agregarAlCarrito(item: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/carrito/agregar/`, item);
  }

  obtenerCarrito(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/carrito/`);
  }

  vaciarCarrito(): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/carrito/vaciar/`);
  }

  realizarCompra(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/compra/`, {});
  }

  eliminarProductoDelCarrito(nombreProducto: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/carrito/eliminar/${nombreProducto}`);
  }

}
