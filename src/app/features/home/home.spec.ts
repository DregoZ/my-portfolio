import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { Home } from './home';
import { CvService } from '../../core/services/cv-data.service';
import '../../../test-setup';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;
  let cvServiceMock: any;

  beforeEach(async () => {
    cvServiceMock = {
      getCvData: () => of({ personal: {}, skills: [], experience: [], projects: [] }),
      getCvTechnology: () => of({ technologies: [] }),
      getCvExperience: () => of({ personal: {}, skills: [], experience: [] }),
      getCvProjects: () => of({ projects: [] }),
      getSocials: () => of({ socials: [] }),
    };

    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [
        provideRouter([]),
        provideNoopAnimations(),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: CvService, useValue: cvServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
