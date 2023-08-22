import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowersSizeComponent } from './browers-size.component';

describe('BrowersSizeComponent', () => {
  let component: BrowersSizeComponent;
  let fixture: ComponentFixture<BrowersSizeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrowersSizeComponent]
    });
    fixture = TestBed.createComponent(BrowersSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
