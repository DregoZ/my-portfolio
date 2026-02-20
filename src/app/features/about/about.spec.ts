import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { About } from './about';
import { CvService } from '../../core/services/cv-data.service';

describe('About', () => {
  let component: About;
  let fixture: ComponentFixture<About>;
  let cvServiceMock: any;

  beforeEach(async () => {
    cvServiceMock = {
      getCvData: () =>
        of({
          personal: {
            name: 'Test User',
            photo: 'test.jpg',
            summary: 'Test Summary',
            title: 'Test Title',
          },
          skills: [],
        }),
    };

    await TestBed.configureTestingModule({
      imports: [About],
      providers: [{ provide: CvService, useValue: cvServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(About);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
