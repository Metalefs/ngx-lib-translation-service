import { Component } from '@angular/core';
import { TranslationBase, TranslationRegistryService, TranslationService } from 'projects/ngx-translation/src/public-api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends TranslationBase {
  id = 'AppComponent';

  constructor(registry: TranslationRegistryService,
              private translate: TranslateService,
              private translationService: TranslationService) {
    super(registry);
  }

  getTranslation(): object {
    this.addTranslation('de', {
      login: 'Einloggen',
      logout: 'Ausloggen'
    });
    this.addTranslation('en', {
      login: 'Login',
      logout: 'Logout'
    });
    this.replaceTranslation('en', 'general.libtranslation', {teste:'SCALOBALOBA'})
    return this.translation;
  }

  changeLanguage(): void {
    const lang = this.translationService.getBrowserLanguage();
    this.translationService.setBrowserLanguage(lang === 'de' ? 'en' : 'de');
  }

  reload(): void {
    this.translate.reloadLang(this.translate.currentLang);
  }
}
