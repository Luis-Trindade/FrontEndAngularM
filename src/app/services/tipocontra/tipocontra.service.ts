import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AppConfig } from '../config/app.config';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class TipoContraService {
    constructor ( private httpClient: HttpClient, private config: AppConfig) {}

    getTipoContraValues() {
        const serviceUrl =
            'http://' +
            this.config.getConfig('hostBridge') +
            ':' + this.config.getConfig('portBridge') +
            '/api/tipocontra/short';
        return this.httpClient.get<any[]>(serviceUrl);
    }
}
