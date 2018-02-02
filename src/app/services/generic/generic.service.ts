import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AppConfig } from '../config/app.config';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GenericService {
    constructor ( private httpClient: HttpClient, private config: AppConfig) {}

    getValues(tableName: string) {
        const serviceUrl =
            'http://' +
            this.config.getConfig('hostBridge') +
            ':' + this.config.getConfig('portBridge') +
            '/api/' + tableName + '/short';
        return this.httpClient.get(serviceUrl);
    }
}
