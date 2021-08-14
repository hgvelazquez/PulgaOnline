import { TestBed } from '@angular/core/testing';

import { FormsValidatorService } from './forms-validator.service';

describe('FormsValidatorService', () => {
  let service: FormsValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormsValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
