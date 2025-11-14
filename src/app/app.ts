import { Component, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { LangChangeEvent, TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TranslateModule],
  template: `
    <h1>{{ 'welcome.title' | translate:{ name: 'sam' } }}</h1>
    <button (click)="switchLang('fr')">fr</button>
    <button (click)="switchLang('en')">en</button>

    {{ lang().lang }}

    <router-outlet />
  `,
  styleUrl: './app.css'
})
export class App {
  private translateService = inject(TranslateService)
  protected readonly title = signal('myapp');

  constructor() {
    effect(() => {
      console.log(this.lang())
    })
  }

  lang = toSignal(this.translateService.onLangChange, {
    initialValue: {} as LangChangeEvent
  })

  switchLang(lang: string) {
  
    this.translateService.use(lang)
  }
}
