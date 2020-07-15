import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatInputModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TextFileComponent } from './text-file.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigService } from '../services/config.service';
import { LoadingService } from '../services/loading.service';

describe('TextFileComponent', () => {
  let component: TextFileComponent;
  let fixture: ComponentFixture<TextFileComponent>;

  beforeEach(async(() => {

    const configServiceSpy = jasmine.createSpyObj('ConfigService', ['config']);

    const testingModule = TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        FormsModule,
        MatSelectModule,
        MatButtonModule,
        MatInputModule,
        NoopAnimationsModule,
        HttpClientTestingModule
      ],
      declarations: [
        TextFileComponent
      ],
      providers: [
        LoadingService,
        { provide: ConfigService, useValue: configServiceSpy }
      ]
    });

    testingModule.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
