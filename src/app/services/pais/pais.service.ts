import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AppConfig } from '../config/app.config';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class PaisService {
    constructor ( private httpClient: HttpClient, private config: AppConfig) {}

    getPaisValues() {
        const serviceUrl =
            'http://' +
            this.config.getConfig('hostBridge') +
            ':' + this.config.getConfig('portBridge') +
            '/api/pais/short';
        return this.httpClient.get<any[]>(serviceUrl);
    }
}
