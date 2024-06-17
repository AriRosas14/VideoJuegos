import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { ProductosComponent } from './productos/productos.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { VentaComponent } from './venta/venta.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { CarritoComponent } from './carrito/carrito.component';
import { RegistrosComponent } from './registros/registros.component';
import { RegisterComponent } from './register/register.component';
import { SeleccionarTiendaComponent } from './seleccionar-tienda/seleccionar-tienda.component';
import { FooterComponent } from './footer/footer.component';
import { ProductosService } from './productos.service';
import { AuthInterceptorService } from './login/auth-interceptor.service';
import { UpdateDeleteVideoComponent } from './update-delete-video/update-delete-video.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    ProductosComponent,
    NavBarComponent,
    VentaComponent,
    EmpleadosComponent,
    CarritoComponent,
    RegistrosComponent,
    RegisterComponent,
    SeleccionarTiendaComponent,
    FooterComponent,
    UpdateDeleteVideoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule
   ],
  providers: [
    ProductosService,
    { provide: HTTP_INTERCEPTORS, useClass:  AuthInterceptorService , multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
