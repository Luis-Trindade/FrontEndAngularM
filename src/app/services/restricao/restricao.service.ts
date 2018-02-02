import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AppConfig } from '../config/app.config';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RestricaoService {
    constructor ( private httpClient: HttpClient, private config: AppConfig) {}

    getRestricaoValues(aRestricao: string) {
        const serviceUrl =
            'http://' +
            this.config.getConfig('hostBridge') +
            ':' + this.config.getConfig('portBridge') +
            '/api/restricaoLst?listagem=' + aRestricao;
        return this.httpClient.get<any[]>(serviceUrl);
    }
}
