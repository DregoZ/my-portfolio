import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { Technology } from './technology';
import { CvService } from '../../core/services/cv-data.service';
import '../../../test-setup';

describe('Technology', () => {
  let component: Technology;
  let fixture: ComponentFixture<Technology>;
  let cvServiceMock: any;

  beforeEach(async () => {
    cvServiceMock = {
      getCvTechnology: () => of({ technologies: [] }),
    };

    await TestBed.configureTestingModule({
      imports: [Technology],
      providers: [
        provideNoopAnimations(),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: CvService, useValue: cvServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Technology);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
