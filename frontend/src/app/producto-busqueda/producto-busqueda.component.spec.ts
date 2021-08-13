import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoBusquedaComponent } from './producto-busqueda.component';

describe('ProductoBusquedaComponent', () => {
  let component: ProductoBusquedaComponent;
  let fixture: ComponentFixture<ProductoBusquedaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoBusquedaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoBusquedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
