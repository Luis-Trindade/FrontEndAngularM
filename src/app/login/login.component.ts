import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { AuthService } from '../services/auth/auth.service';

@Component({
    selector: 'app-login',
    /* encapsulation: ViewEncapsulation.None, */
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [ AuthService ],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    name: string;
    password: string;
    onSubmitError = false;
    constructor(private _authservice: AuthService,
                public router: Router) {
    }

    ngOnInit() {

    }

    onSubmit({ value, valid }: { value: any, valid: boolean }) {
        if ( valid ) {
            this._authservice.postAuthentication(value.name, value.password)
                .subscribe(res => {
                    this.router.navigate(['/dashboard']);
                },
                err => {
                    this.onSubmitError = true;
                });
        }
    }

}
