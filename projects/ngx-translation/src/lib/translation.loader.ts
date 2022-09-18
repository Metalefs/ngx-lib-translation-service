import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TranslationRegistryService } from './translation-registry.service';
import { TranslateLoader } from '@ngx-translate/core';

export class TranslationLoader implements TranslateLoader {
    prefix: string;
    suffix: string;

    constructor(private registry: TranslationRegistryService, private http: HttpClient, prefix?: string, suffix?: string) {
        this.prefix = prefix;
        this.suffix = suffix;
    }

    getTranslation(lang: string): Observable<object> {
        return this.http.get(`${this.prefix}${lang}${this.suffix}`)
            .pipe(map((res: object) => {
                let result = res;
                if (this.registry && this.registry.registeredComponents) {
                    this.registry.getTranslations().forEach((translationObj: any) => {
                        let translation = translationObj[lang];
                        if (!translation) {
                            translation = translationObj.en;
                        }
                        result = this.merge(result, translation);
                    });
                }
                return result;
            }));
    }

    private merge(current: object, additionalTranslation: object): object {
        return this.mergeDeep(current, additionalTranslation);
    }

    /**
     * Simple object check.
     * @param item Object
     */
    private isObject(item: object): boolean {
        return (item && typeof item === 'object' && !Array.isArray(item));
    }

    /**
     * Deep merge two objects.
     * @param target Object
     * @param ...sources objects
     */
    private mergeDeep(target: object, ...sources: object[]) {
        if (!sources.length) {
            return target;
        }
        const source = sources.shift();
        if (this.isObject(target) && this.isObject(source)) {
            for (const key in source) {
                if (this.isObject(source[key])) {
                    if (!target[key]) {
                        Object.assign(target, { [key]: {} });
                    }
                    this.mergeDeep(target[key], source[key]);
                } else {
                    Object.assign(target, { [key]: source[key] });
                }
            }
        }

        return this.mergeDeep(target, ...sources);
    }
}
