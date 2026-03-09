import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';
import { About } from '../about/about';
import { Projects } from '../projects/projects';
import { Hero } from '../hero/hero';
import { Technology } from '../technology/technology';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, About, Technology, Projects, Hero],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  langService = inject(LanguageService);

  get currentLang() {
    return this.langService.lang();
  }
}
