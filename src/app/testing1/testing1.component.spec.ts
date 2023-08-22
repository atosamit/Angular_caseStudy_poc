import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Testing1Component } from './testing1.component';

describe('Testing1Component', () => {
  let component: Testing1Component;
  let fixture: ComponentFixture<Testing1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Testing1Component]
    });
    fixture = TestBed.createComponent(Testing1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
