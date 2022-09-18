import { Component } from '@angular/core';
import { TranslationBase, TranslationRegistryService } from 'projects/ngx-translation/src/public-api';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent extends TranslationBase {
  public id = 'TestComponent';

  constructor(
    registry: TranslationRegistryService) {
    super(registry);
  }

  getTranslation(): object {
    this.addTranslation('de', {
      text: 'Ich arbeite als Softwareentwickler bei @medialesson in Pforzheim.',
    });
    this.addTranslation('en', {
      text: 'I am a developer at @medialesson in Pforzheim.',
    });
    return this.translation;
  }
}
