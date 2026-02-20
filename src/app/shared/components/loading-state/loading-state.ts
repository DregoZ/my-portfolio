import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-loading-state',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-state.html',
  styleUrl: './loading-state.css',
})
export class LoadingState {
  private langService = inject(LanguageService);

  @Input() message?: string;

  get displayMessage(): string {
    return this.message || this.langService.translate('LOADING.DEFAULT');
  }
}
