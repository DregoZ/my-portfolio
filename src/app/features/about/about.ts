import { Component, inject, OnInit, signal } from '@angular/core';
import { CvService } from '../../core/services/cv-data.service';
import { LanguageService } from '../../core/services/language.service';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { staggerFadeIn } from '../../shared/animations/animations';
import { GeometricBg } from '../../core/components/geometric-bg/geometric-bg';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, TranslatePipe, GeometricBg],
  templateUrl: './about.html',
  styleUrl: './about.css',
  animations: [staggerFadeIn],
})
export class About implements OnInit {
  private cvService = inject(CvService);
  langService = inject(LanguageService);

  personal = signal<any>(null);
  skills = signal<any[]>([]);
  experience = signal<any[]>([]);

  ngOnInit() {
    this.cvService.getCvExperience().subscribe({
      next: (data) => {
        this.personal.set(data.personal || null);
        this.skills.set(data.skills || []);
        this.experience.set(data.experience || []);
      },
    });
  }
}
