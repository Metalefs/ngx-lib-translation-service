import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { GetDescendantProps } from './util/getPropByPath';

@Injectable({
  providedIn: 'root'
})
export class TranslationRegistryService {
  registeredComponents = new Array<ITranslation>();
  newRegistrationSubscription = new Subject();

  constructor() {
  }

  public register(component: ITranslation | TranslationBase) {
    if (this.registeredComponents.every(c => c.id !== component.id)) {
      this.registeredComponents.push(component);
      this.newRegistrationSubscription.next('');
    }
  }

  public getTranslations(): Array<object> {
    const result = this.registeredComponents.map(c => c.getTranslation());
    return result;
  }
}

export interface ITranslation {
  id: string;
  getTranslation(): object;
}
export abstract class TranslationBase implements ITranslation {
  public abstract id: string;
  protected translation = {
    de: {
      general: {
        libtranslation: {
          test: 'testtesttest de'
        }
      }
    },
    en: {
      general: {
        libtranslation: {
          test: 'testtesttest en'
        }
      }
    }
  };

  constructor(private registry: TranslationRegistryService) {
    this.registry.register(this);
  }

  protected addTranslation(lang: string, obj: object): void {
    GetDescendantProps(this.translation[lang], this.id, obj);
  }

  protected replaceTranslation(lang: string, key: string, obj: object): void {
    GetDescendantProps(this.translation[lang], key, obj);
    console.log(this.translation);
  }

  abstract getTranslation(): object;
}
