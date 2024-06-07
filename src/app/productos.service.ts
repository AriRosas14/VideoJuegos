import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Prod } from "../app/prod"
import { Cliente } from "../app/clientes"


interface Product {
  id: number;
  nombre: string;
  precio: number;
  seleccionado?: boolean; // Nuevo campo para seguimiento de selección
}

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private apiUrl: 'http://localhost:3000' = "http://localhost:3000";
  constructor(private http: HttpClient) {}

  //Cliente
  registrarCliente(datosCliente: any): Observable<any>{
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
  }

  //Empresa
  registrarProveedro(datosProveedor: any): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/proveedor`, datosProveedor);
  }
  getProveedor(): Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/proveedor`);  
  }
  eliminarProveedor(prov: any): Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/proveedor/${prov}`);
  }

  //Productos
  getProductos(): Observable<any[]>{
  return this.http.get<any[]>(`${this.apiUrl}/productos`);
  }
  guardarProducto(producto:any): Observable<any[]>{
    return this.http.post<any[]>(`${this.apiUrl}/productos`, producto);
  } 
  eliminarProducto(productoId: any): Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/productos/${productoId}`);
  }


//Empleado
getEmpleado(): Observable<any[]>{
  return this.http.get<any[]>(`${this.apiUrl}/empleados`);
}
guardarEmpleado(empleado:any): Observable<any[]>{
  return this.http.post<any[]>(`${this.apiUrl}/empleados`, empleado);
}

  //Venta
  finalizarCompra(compra:any)  : Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/venta`, compra);
  }


  realizarCompra(idEmpleado: number, idEmpresa: number, selectedProducts: Product[]): Observable<any> {
    const compraData = {
      id_empleado: idEmpleado,
      id_empresa: idEmpresa,
      productos: selectedProducts.map((product) => product.id),
    };

    return this.http.post(`${this.apiUrl}/compra`, compraData);
  }

  guardarUsuario(usuario:any): Observable<any[]>{
    return this.http.post<any[]>(`${this.apiUrl}/register`, usuario);
  }
}
