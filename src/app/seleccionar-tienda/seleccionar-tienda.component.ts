import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seleccionar-tienda',
  templateUrl: './seleccionar-tienda.component.html',
  styleUrl: './seleccionar-tienda.component.css'
})
export class SeleccionarTiendaComponent {

  constructor(private router: Router){}

  selectStore(storeId: string) {
    localStorage.setItem('selectedStore', storeId);
    this.router.navigate(['/inicio']);
  }

}
