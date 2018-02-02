import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AppConfig } from '../config/app.config';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class VolNegocioService {
    constructor ( private httpClient: HttpClient, private config: AppConfig) {}

    getChartValues() {
        const barChartLabels: string[] = [];
        const dataPropostas: number[] = [];
        const dataContratos: number[] = [];

        const volNegocioUrl =
            'http://' +
            this.config.getConfig('hostBridge') +
            ':' + this.config.getConfig('portBridge') +
            '/api/clientes/mapas/volnegocio';
        return this.httpClient.get(volNegocioUrl)
            .map((chartResults: Array<any>) => {
                chartResults.forEach((element) => {
                    barChartLabels.push(element.ano);
                    dataPropostas.push(element.numprp);
                    dataContratos.push(element.numcto);
                });
                const barChartData = [
                    { data: dataPropostas, label: 'Propostas' },
                    { data: dataContratos, label: 'Contratos' }
                ];
                return { barChartLabels, barChartData };
            });
    }
}
