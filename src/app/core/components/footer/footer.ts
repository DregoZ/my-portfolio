import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';
import { CvService } from '../../services/cv-data.service';
import packageInfo from '../../../../../package.json';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  langService = inject(LanguageService);
  private cvService = inject(CvService);
  currentYear = new Date().getFullYear();
  version = packageInfo.version;
  socials = signal<any[]>([]);

  ngOnInit() {
    this.cvService.getSocials().subscribe((data) => {
      this.socials.set(data.socials || []);
    });
  }
}
