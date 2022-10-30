import { TestBed } from '@angular/core/testing';

import { LmsGuardGuard } from './lms-guard.guard';

describe('LmsGuardGuard', () => {
  let guard: LmsGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LmsGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
