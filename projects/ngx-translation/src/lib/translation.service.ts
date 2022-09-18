import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslationRegistryService } from './translation-registry.service';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  public supportedLanguages: string[] = ['de', 'en'];

  constructor(private translate: TranslateService,
              private registry: TranslationRegistryService) {
    registry.newRegistrationSubscription.subscribe(() => {
      this.supportedLanguages.forEach(l => this.translate.reloadLang(l));
      this.translate.reloadLang(this.translate.currentLang);
    });
  }

  public init(): void {
    this.translate.addLangs(this.supportedLanguages);
    this.translate.setDefaultLang('en');
    this.setBrowserLanguage(this.translate.getBrowserLang());
  }

  /**
   * Gets the browserLang from localStorage.
   * If the language in localStorage is not supported, 'en' will be returned.
   *
   * @returns The browserLang from localStorage.
   */
  public getBrowserLanguage(): string {
    if (localStorage.getItem('medium.browserLang') === null) {
      const currentLang = this.translate.getBrowserLang();

      if (this.supportedLanguages.find(x => {
        return (x === currentLang);
      })) {
        return currentLang;
      } else {
        return 'en';
      }
    } else {
      const lang = localStorage.getItem('medium.browserLang');

      if (!(this.supportedLanguages.find(x => {
        return (x === lang);
      }))) {
        return 'en';
      }

      return lang;
    }
  }


  /**
   * Sets the a language flag in localStorage that can be used to save
   * the users selection and use it the next time he uses the app.
   * If the language is not supported, 'en' will be set.
   *
   * @param lang The language to save.
   */
  public setBrowserLanguage(lang: string) {
    if (this.supportedLanguages.find(x => {
      return (x === lang);
    })) {
      localStorage.setItem('medium.browserLang', lang);
      this.translate.use(lang);
    } else {
      localStorage.setItem('medium.browserLang', 'en');
      this.translate.use(lang);
    }
  }
}
