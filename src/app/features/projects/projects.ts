import { Component, inject, signal } from '@angular/core';
import { LanguageService } from '../../core/services/language.service';
import { CommonModule } from '@angular/common';
import { CvService } from '../../core/services/cv-data.service';
import { LoadingState } from '../../shared/components/loading-state/loading-state';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { ProjectCard } from '../../shared/components/project-card/project-card';
import { staggerFadeIn } from '../../shared/animations/animations';
import { GeometricBg } from '../../core/components/geometric-bg/geometric-bg';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, LoadingState, TranslatePipe, ProjectCard, GeometricBg],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
  animations: [staggerFadeIn],
})
export class Projects {
  private cvService = inject(CvService);
  langService = inject(LanguageService);
  projects = signal<any[]>([]);

  ngOnInit() {
    this.cvService.getCvProjects().subscribe((data) => {
      this.projects.set(data.projects || []);
    });
  }
}
