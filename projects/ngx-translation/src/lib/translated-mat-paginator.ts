import { MatPaginatorIntl } from '@angular/material';
import { TranslateService, LangChangeEvent, TranslationChangeEvent } from '@ngx-translate/core';
import { TranslationRegistryService, ITranslation } from './translation-registry.service';

export class TranslatedMatPaginator extends MatPaginatorIntl implements ITranslation {
    id = 'paginator';

    constructor(registry: TranslationRegistryService, private translate: TranslateService) {
        super();

        registry.register(this);

        this.translate.onLangChange.subscribe((e: LangChangeEvent) => {
            this.changes.next();
            this.getTranslations();
        });
        this.translate.onTranslationChange.subscribe((e: TranslationChangeEvent) => {
            this.changes.next();
            this.getTranslations();
        });
    }

    getTranslation(): object {
        return {
            de: {
                i18n: {
                    paginator: {
                        firstPageLabel: 'Erste Seite',
                        getRangeLabel: '{{start}} - {{end}} von {{length}}',
                        itemsPerPageLabel: 'Einträge pro Seite:',
                        lastPageLabel: 'Letzte Seite',
                        nextPageLabel: 'Nächste Seite',
                        previousPageLabel: 'Vorherige Seite',
                    }
                }
            },
            en: {
                i18n: {
                    paginator: {
                        firstPageLabel: 'First Page',
                        getRangeLabel: '{{start}} - {{end}} of {{length}}',
                        itemsPerPageLabel: 'Items per page:',
                        lastPageLabel: 'Last page',
                        nextPageLabel: 'Next page',
                        previousPageLabel: 'Previous page',
                    }
                }
            }
        };
    }

    getTranslations() {
        const translation = this.translate.instant([
            'i18n.paginator.firstPageLabel',
            'i18n.paginator.itemsPerPageLabel',
            'i18n.paginator.lastPageLabel',
            'i18n.paginator.nextPageLabel',
            'i18n.paginator.previousPageLabel'
        ]);
        this.firstPageLabel = translation['i18n.paginator.firstPageLabel'];
        this.itemsPerPageLabel = translation['i18n.paginator.itemsPerPageLabel'];
        this.lastPageLabel = translation['i18n.paginator.lastPageLabel'];
        this.nextPageLabel = translation['i18n.paginator.nextPageLabel'];
        this.previousPageLabel = translation['i18n.paginator.previousPageLabel'];
        this.getRangeLabel = (page: number, pageSize: number, length: number) => {
            let startIndex = 0;
            let endIndex = 0;
            if (length !== 0 && pageSize !== 0) {
                length = Math.max(length, 0);
                startIndex = page * pageSize;
                endIndex = startIndex < length ?
                    Math.min(startIndex + pageSize, length) :
                    startIndex + pageSize;
            }

            const result = this.translate.instant('i18n.paginator.getRangeLabel', {
                start: startIndex + 1,
                end: endIndex,
                length
            });
            return result;
        };
    }
}
