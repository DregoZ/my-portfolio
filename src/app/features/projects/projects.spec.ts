import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { Projects } from './projects';
import { CvService } from '../../core/services/cv-data.service';
import '../../../test-setup';

describe('Projects', () => {
  let component: Projects;
  let fixture: ComponentFixture<Projects>;
  let cvServiceMock: any;

  beforeEach(async () => {
    cvServiceMock = {
      getCvProjects: () => of({ projects: [] }),
    };

    await TestBed.configureTestingModule({
      imports: [Projects],
      providers: [
        provideNoopAnimations(),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: CvService, useValue: cvServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Projects);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
