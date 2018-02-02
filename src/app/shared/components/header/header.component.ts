import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    @Output() toggleEvent = new EventEmitter();


    constructor(private translate: TranslateService,
                public router: Router) {
        this.router.events.subscribe((val) => {
            if (val instanceof NavigationEnd && window.innerWidth <= 992) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {}

    toggleSidebar() {
        this.toggleEvent.emit(null)
    }

    onLoggedout() {
        localStorage.removeItem('authToken');
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
}
