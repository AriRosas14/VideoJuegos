import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ProductosComponent } from './productos/productos.component';
import { LoginComponent } from './login/login.component';
import { VentaComponent } from './venta/venta.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { CarritoComponent } from './carrito/carrito.component';
import { RegistrosComponent } from './registros/registros.component';
import { SeleccionarTiendaComponent } from './seleccionar-tienda/seleccionar-tienda.component';
import { UpdateDeleteVideoComponent } from './update-delete-video/update-delete-video.component';

const rutas: Routes = [
  {path: 'inicio', component: VentaComponent},
  {path: 'altas-video', component: ProductosComponent},
  {path: 'videojuegos', component: UpdateDeleteVideoComponent},
  {path: 'login', component:LoginComponent},
  {path: 'empleados', component: EmpleadosComponent},
  {path: 'carrito',component: CarritoComponent},
  {path: 'registros',component: RegistrosComponent},
  {path: 'seleccion-tienda', component: SeleccionarTiendaComponent},
  {path: '', component: InicioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(rutas)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
