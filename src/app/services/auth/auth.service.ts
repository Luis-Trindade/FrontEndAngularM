import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AppConfig } from '../config/app.config';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {
    constructor(private httpClient: HttpClient, private config: AppConfig) {
    }

    postAuthentication( username: string, password: string) {
        const serviceUrl = 'http://' + this.config.getConfig('hostBridge') + ':' + this.config.getConfig('portBridge') + '/login';

        return this.httpClient.post(serviceUrl, { name: username, password: password } )
            .map((responseData: any) => {
                localStorage.setItem('authToken', responseData.token);
                return responseData;
            })
            .catch((error: any) => Observable.throw(error.error || 'Server error'));
    }

    isLoggedIn() {
        const token = localStorage.getItem('authToken');
        return token != null && ! this.isTokenExpired(token);
    }

    tokenNotExpired(tokenName) {
        if (tokenName === void 0) { tokenName = 'token'; }
        const token = localStorage.getItem(tokenName);
        return token != null && ! this.isTokenExpired(token);
    }

    isTokenExpired(token) {
        const date = this.getTokenExpirationDate(token);
        const offsetSeconds = 0;
        if (date == null) {
            return false;
        }
        // Token expired?
        return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)));
    }

    getTokenExpirationDate(token) {
        const decoded = this.decodeToken(token);
        if (!decoded.hasOwnProperty('exp')) {
            return null;
        }
        const date = new Date(0); // The 0 here is the key, which sets the date to the epoch
        date.setUTCSeconds(decoded.exp);
        return date;
    }

    decodeToken(token) {
        const parts = token.split('.');
        if (parts.length !== 3) {
            throw new Error('JWT must have 3 parts');
        }
        const decoded = this.urlBase64Decode(parts[1]);
        if (!decoded) {
            throw new Error('Cannot decode the token');
        }
        return JSON.parse(decoded);
    }

    urlBase64Decode(str) {
        let output = str.replace(/-/g, '+').replace(/_/g, '/');
        switch (output.length % 4) {
            case 0: {
                break;
            }
            case 2: {
                output += '==';
                break;
            }
            case 3: {
                output += '=';
                break;
            }
            default: {
                throw new Error('Illegal base64url string!');
            }
        }
        return this.b64DecodeUnicode(output);
    }

    b64DecodeUnicode(str) {
        return decodeURIComponent(Array.prototype.map.call(this.b64decode(str), function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }

    b64decode(str) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        let output = '';
        str = String(str).replace(/=+$/, '');
        if (str.length % 4 === 1) {
            throw new Error('\'atob\' failed: The string to be decoded is not correctly encoded.');
        }
        for (
            // initialize result and counters
            let bc = 0, bs = void 0, buffer = void 0, idx = 0;
            // get next character
            buffer = str.charAt(idx++);
            // character found in table? initialize bit storage and add its ascii value;
            ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
                // and if not first of each 4 characters,
                // convert the first 8 bits to one ascii character
            bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0) {
            // try to find character in table (0-63, not found => -1)
            buffer = chars.indexOf(buffer);
        }
        return output;
    }



}


