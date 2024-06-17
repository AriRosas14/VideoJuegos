import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarTiendaComponent } from './seleccionar-tienda.component';

describe('SeleccionarTiendaComponent', () => {
  let component: SeleccionarTiendaComponent;
  let fixture: ComponentFixture<SeleccionarTiendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeleccionarTiendaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeleccionarTiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
