import { NgModule, APP_INITIALIZER } from '@angular/core';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslationLoader } from './translation.loader';
import { TranslationRegistryService } from './translation-registry.service';
import { TranslationService } from './translation.service';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material';
import { TranslatedMatPaginator } from './translated-mat-paginator';
import { LibComponentComponent } from './lib-component/lib-component.component';

export function HttpLoaderFactory(registry: TranslationRegistryService, http: HttpClient) {
  return new TranslationLoader(registry, http, './assets/i18n/', '.json');
}

export function initTranslation(service: TranslationService) {
  const fn = () => service.init();
  return fn;
}

@NgModule({
  declarations: [
    LibComponentComponent
  ],
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [TranslationRegistryService, HttpClient]
      }
    }),
    MatPaginatorModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initTranslation,
      deps: [TranslationService], multi: true
    },
    {
      provide: MatPaginatorIntl,
      useClass: TranslatedMatPaginator,
      deps: [TranslationRegistryService, TranslateService],
    }
  ],
  exports: [TranslateModule,LibComponentComponent]
})
export class TranslationModule { }
