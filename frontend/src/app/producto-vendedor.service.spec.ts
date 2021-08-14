import { TestBed } from '@angular/core/testing';

import { ProductoVendedorService } from './producto-vendedor.service';

describe('ProductoVendedorService', () => {
  let service: ProductoVendedorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductoVendedorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
