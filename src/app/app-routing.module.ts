import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ProductosComponent } from './productos/productos.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { LoginComponent } from './login/login.component';
import { VentaComponent } from './venta/venta.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { CarritoComponent } from './carrito/carrito.component';

const rutas: Routes = [
  {path: 'inicio', component: VentaComponent},
  {path: 'productos', component: ProductosComponent},
  {path: 'clientes', component:ClientesComponent},
  {path: 'proveedores', component:ProveedoresComponent},
  {path: 'login', component:LoginComponent},
  {path: 'empleados', component: EmpleadosComponent},
  {path: 'carrito',component: CarritoComponent},
  {path: '*', component: InicioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(rutas)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
