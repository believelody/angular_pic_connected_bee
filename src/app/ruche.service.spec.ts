import { TestBed } from '@angular/core/testing';

import { RucheService } from './ruche.service';

describe('RucheService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RucheService = TestBed.get(RucheService);
    expect(service).toBeTruthy();
  });
});
