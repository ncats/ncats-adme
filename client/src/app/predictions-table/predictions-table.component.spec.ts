import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PredictionsTableComponent } from './predictions-table.component';

describe('PredictionsTableComponent', () => {
  let component: PredictionsTableComponent;
  let fixture: ComponentFixture<PredictionsTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PredictionsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PredictionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
