import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalProductoComponent } from './principal-producto.component';

describe('PrincipalProductoComponent', () => {
  let component: PrincipalProductoComponent;
  let fixture: ComponentFixture<PrincipalProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrincipalProductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
