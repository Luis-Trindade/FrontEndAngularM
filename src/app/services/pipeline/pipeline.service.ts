import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AppConfig } from '../config/app.config';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class PipelineService {
    constructor ( private httpClient: HttpClient, private config: AppConfig) {}

    getChartValues(oCliente: number) {
        const doughnutChartLabels: string[] = [];
        const doughnutChartData: number[] = [];

        const serviceUrl =
            'http://' +
            this.config.getConfig('hostBridge') +
            ':' + this.config.getConfig('portBridge') +
            '/api/clientes/mapas/pipeline?procli=' + oCliente;

        return this.httpClient.get(serviceUrl)
            .map((chartResults: Array<any>) => {
                chartResults.forEach((element) => {
                    doughnutChartLabels.push(element.label);
                    doughnutChartData.push(element.value);
                });
                return { doughnutChartLabels, doughnutChartData };
            });
    }
}
