import { TestBed } from '@angular/core/testing';

import { DepartmentsemployeesService } from './departmentsemployees.service';

describe('DepartmentsemployeesService', () => {
  let service: DepartmentsemployeesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartmentsemployeesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
