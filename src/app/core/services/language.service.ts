import { Injectable, signal, computed, inject, PLATFORM_ID, effect } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import esTranslations from '../../../assets/i18n/es.json';
import enTranslations from '../../../assets/i18n/en.json';

export type Language = 'es' | 'en';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private platformId = inject(PLATFORM_ID);
  private readonly storageKey = 'portfolio_lang';
  private currentLanguage = signal<Language>('es');

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const savedLang = localStorage.getItem(this.storageKey) as Language;
      if (savedLang && (savedLang === 'es' || savedLang === 'en')) {
        this.currentLanguage.set(savedLang);
      }

      // Cuando cambia el idioma, lo almacena en localStorage
      effect(() => {
        localStorage.setItem(this.storageKey, this.currentLanguage());
      });
    }
  }

  private translations: Record<Language, any> = {
    es: esTranslations,
    en: enTranslations,
  };

  lang = computed(() => this.currentLanguage());

  translate(key: string): string {
    const keys = key.split('.');
    let result = this.translations[this.currentLanguage()];

    for (const k of keys) {
      if (result && result[k]) {
        result = result[k];
      } else {
        return key; // Return key as fallback
      }
    }

    return typeof result === 'string' ? result : key;
  }

  setLanguage(language: Language) {
    this.currentLanguage.set(language);
  }

  toggleLanguage() {
    this.currentLanguage.update((l) => (l === 'es' ? 'en' : 'es'));
  }
}
