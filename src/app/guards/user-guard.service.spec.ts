/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserGuardService } from './user-guard.service';

describe('Service: UserGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserGuardService]
    });
  });

  it('should ...', inject([UserGuardService], (service: UserGuardService) => {
    expect(service).toBeTruthy();
  }));
});
