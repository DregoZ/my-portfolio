import { Component, inject, signal } from '@angular/core';
import { CvService } from '../../core/services/cv-data.service';
import { LanguageService } from '../../core/services/language.service';
import { CommonModule } from '@angular/common';
import { AnimatedBg } from '../../core/components/animated-bg/animated-bg';
import { LoadingState } from '../../shared/components/loading-state/loading-state';
import { TechCard } from '../../shared/components/tech-card/tech-card';
import { staggerFadeIn } from '../../shared/animations/animations';

@Component({
  selector: 'app-technology',
  standalone: true,
  imports: [CommonModule, AnimatedBg, LoadingState, TechCard],
  templateUrl: './technology.html',
  styleUrl: './technology.css',
  animations: [staggerFadeIn],
})
export class Technology {
  private cvService = inject(CvService);
  langService = inject(LanguageService);

  title = signal<string>('');
  desc = signal<string>('');
  technologies = signal<any[]>([]);

  ngOnInit() {
    this.cvService.getCvTechnology().subscribe((data) => {
      this.title.set(data.title || '');
      this.desc.set(data.desc || '');
      this.technologies.set(data.technologies || []);
    });
  }
}
