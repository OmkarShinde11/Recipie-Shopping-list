import { TestBed } from '@angular/core/testing';

import { RecipeActivateGuard } from './recipe-activate.guard';

describe('RecipeActivateGuard', () => {
  let guard: RecipeActivateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RecipeActivateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
