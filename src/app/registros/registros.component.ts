import { Component } from '@angular/core';
import { ProductosService } from '../productos.service';


@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrl: './registros.component.css'
})
export class RegistrosComponent {
  facturas: any[] = [];

  constructor(private service: ProductosService) {}

  ngOnInit(): void {
    this.service.getFacturas().subscribe(
      (data) => {
        this.facturas = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
