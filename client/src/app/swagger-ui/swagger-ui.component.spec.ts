import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RampApiComponent } from './swagger-ui.component';


describe.skip('SwaggerComponent', () => {
  let component: SwaggerComponent;
  let fixture: ComponentFixture<SwaggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SwaggerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwaggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
