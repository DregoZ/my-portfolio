import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { About } from './about';
import { CvService } from '../../core/services/cv-data.service';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import '../../../test-setup';

describe('About', () => {
  let component: About;
  let fixture: ComponentFixture<About>;
  let cvServiceMock: any;

  beforeEach(async () => {
    cvServiceMock = {
      getCvExperience: () =>
        of({
          personal: {
            name: 'Test User',
            photo: 'test.jpg',
            summary: 'Test Summary',
            title: 'Test Title',
          },
          skills: [],
          experience: [],
        }),
    };

    await TestBed.configureTestingModule({
      imports: [About],
      providers: [
        { provide: CvService, useValue: cvServiceMock },
        provideNoopAnimations(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(About);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
