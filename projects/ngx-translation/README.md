# NgxTranslation

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.0.

## Code scaffolding

Run `ng generate component component-name --project ngx-translation` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project ngx-translation`.
> Note: Don't forget to add `--project ngx-translation` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build ngx-translation` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build ngx-translation`, go to the dist folder `cd dist/ngx-translation` and run `npm publish`.

## Running unit tests

Run `ng test ngx-translation` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Usage
In an Angular CLI project, import the `TranslationModule` in your `app.module.ts`.

The translations should be found under the following path: `./assets/i18n/`
The translation files should be named after ISO Alpha 2 standard for the language. E. g. `./assets/i18n/de.json` and `./assets/i18n/en.json`.

If it is needed to add translations dynamically, it is possible to include the `TranslationService` and add translations from TypeScript:

```ts
  ngOnInit() {
    const de = {
      i18n: {
      }
    };
    const en = {
      i18n: {
      }
    };
    de.i18n[this.constructor.name] = {
      login: 'Einloggen',
      logout: 'Ausloggen'
    };
    en.i18n[this.constructor.name] = {
      login: 'Login',
      logout: 'Logout'
    };
    this.translationService.add('de', de);
    this.translationService.add('en', en);
  }
```