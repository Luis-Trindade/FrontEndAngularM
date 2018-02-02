import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ObservableMedia } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
    @ViewChild('snav', {read: MatSidenav}) snav: MatSidenav;

    navMode = 'side';

    constructor(private observableMedia: ObservableMedia,
                public router: Router) { }

    ngOnInit() {
        if (this.observableMedia.isActive('xs') || this.observableMedia.isActive('sm')) {
            this.navMode = 'over';
        }

        if (this.router.url === '/') {
            this.router.navigate(['/dashboard']);
        }
        this.observableMedia.asObservable()
            .subscribe(change => {
                switch (change.mqAlias) {
                    case 'xs':
                    case 'sm':
                        this.navMode = 'over';
                        this.snav.close();
                        break;
                    default:
                        this.navMode = 'side';
                        this.snav.open();
                        break;
                }
            });
    }


}
