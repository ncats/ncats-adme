import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StructureImageDialogComponent } from './structure-image-dialog.component';

describe('StructureImageDialogComponent', () => {
  let component: StructureImageDialogComponent;
  let fixture: ComponentFixture<StructureImageDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StructureImageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
