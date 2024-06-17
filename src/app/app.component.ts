import { Component } from '@angular/core';
import { ProductosService } from './productos.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'puntoVenta';

  constructor(private authService: ProductosService) {}

  ngOnInit(): void {
    this.authService.autenticarConTokenGuardado();
  }
}
