import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderingComponent } from './rendering.component';

describe('RenderingComponent', () => {
  let component: RenderingComponent;
  let fixture: ComponentFixture<RenderingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RenderingComponent]
    });
    fixture = TestBed.createComponent(RenderingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
