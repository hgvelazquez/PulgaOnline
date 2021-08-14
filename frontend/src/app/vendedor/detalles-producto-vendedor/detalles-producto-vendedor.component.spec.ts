import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesProductoVendedorComponent } from './detalles-producto-vendedor.component';

describe('DetallesProductoVendedorComponent', () => {
  let component: DetallesProductoVendedorComponent;
  let fixture: ComponentFixture<DetallesProductoVendedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesProductoVendedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesProductoVendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
