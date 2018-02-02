import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(private translate: TranslateService) {
        translate.addLangs(['pt', 'en', 'fr', 'ur']);
        translate.setDefaultLang('pt');
        const browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/pt|en|fr|ur/) ? browserLang : 'pt');
    }
}
