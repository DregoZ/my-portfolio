import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, catchError, of } from 'rxjs';
import { LanguageService } from './language.service';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class CvService {
  private http = inject(HttpClient);
  private langService = inject(LanguageService);
  private lang$ = toObservable(this.langService.lang);

  getCvData(): Observable<any> {
    return this.lang$.pipe(
      switchMap((lang) => this.http.get(`/assets/data/cv-data-${lang}.json`)),
      catchError((error) => {
        console.error('Error loading CV data:', error);
        return of({ personal: {}, skills: [], experience: [], projects: [] });
      }),
    );
  }

  getCvTechnology(): Observable<any> {
    return this.lang$.pipe(
      switchMap((lang) => this.http.get(`/assets/data/technology-${lang}.json`)),
      catchError((error) => {
        console.error('Error loading technology data:', error);
        return of({ technologies: [] });
      }),
    );
  }

  getCvExperience(): Observable<any> {
    return this.lang$.pipe(
      switchMap((lang) => this.http.get(`/assets/data/about-${lang}.json`)),
      catchError((error) => {
        console.error('Error loading personal data:', error);
        return of({ experience: [] });
      }),
    );
  }

  getCvProjects(): Observable<any> {
    return this.lang$.pipe(
      switchMap((lang) => this.http.get(`/assets/data/projects-${lang}.json`)),
      catchError((error) => {
        console.error('Error loading projects data:', error);
        return of({ projects: [] });
      }),
    );
  }
}
