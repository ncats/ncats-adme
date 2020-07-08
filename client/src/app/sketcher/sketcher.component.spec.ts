import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SketcherComponent } from './sketcher.component';

describe('SketcherComponent', () => {
  let component: SketcherComponent;
  let fixture: ComponentFixture<SketcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SketcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SketcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
