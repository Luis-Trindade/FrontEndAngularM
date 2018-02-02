import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Simulacao } from '../../data/simul/Simulacao';
import { Observable } from 'rxjs/Observable';

import { AppConfig } from '../config/app.config';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SimulService {
    constructor ( private httpClient: HttpClient, private config: AppConfig) {}

    postSimulValues(simul: Simulacao) {
        const serviceUrl =
            'http://' +
            this.config.getConfig('hostBridge') +
            ':' + this.config.getConfig('portBridge') +
            '/api/simul';
        return this.httpClient.post(serviceUrl, this.setJsonPostFromSimulacao(simul))
            .map((responseData) => {
                return this.setSimulacaoFromJsonPost(responseData);
            });
    }

    setJsonPostFromSimulacao(simul: Simulacao) {
        const jsonSimul: any = {};
        jsonSimul.cto2dat = simul.cto2dat;
        jsonSimul.ctotcon = simul.ctotcon;
        jsonSimul.ctopraz = simul.ctopraz;
        jsonSimul.ctoper = simul.ctoper;
        jsonSimul.ctoap = simul.ctoap;
        jsonSimul.ctoiva = simul.ctoiva;
        jsonSimul.cto1ren = simul.cto1ren;
        jsonSimul.ctojurdif = simul.ctojurdif;
        jsonSimul.ctodado = simul.ctodado;
        jsonSimul.ctovaljurdif = simul.ctovaljurdif;
        jsonSimul.ctotxim = simul.ctotxim;

        jsonSimul.qtd1 = simul.gruporendas[0].quantidade;
        jsonSimul.qtd2 = simul.gruporendas[1].quantidade;
        jsonSimul.qtd3 = simul.gruporendas[2].quantidade;
        jsonSimul.valor1 = simul.gruporendas[0].valor;
        jsonSimul.valor2 = simul.gruporendas[1].valor;
        jsonSimul.valor3 = simul.gruporendas[2].valor;
        jsonSimul.factor1 = simul.gruporendas[0].factor;
        jsonSimul.factor2 = simul.gruporendas[1].factor;
        jsonSimul.factor3 = simul.gruporendas[2].factor;
        return jsonSimul;
    }

    setSimulacaoFromJsonPost(jsonSimul){
        const aSimul = new Simulacao();

        aSimul.cto2dat = jsonSimul.simul.cto2dat;
        aSimul.ctotcon = jsonSimul.simul.ctotcon;
        aSimul.ctopraz = jsonSimul.simul.ctopraz;
        aSimul.ctoper = jsonSimul.simul.ctoper;
        aSimul.ctoap = jsonSimul.simul.ctoap;
        aSimul.ctoiva = jsonSimul.simul.ctoiva;
        aSimul.cto1ren = jsonSimul.simul.cto1ren;
        aSimul.ctojurdif = jsonSimul.simul.ctojurdif;
        aSimul.ctodado = jsonSimul.simul.ctodado;
        aSimul.ctovaljurdif = jsonSimul.simul.ctovaljurdif;
        aSimul.ctotxim = jsonSimul.simul.ctotxim;
        jsonSimul.gruposrendas.forEach((item, index) => { aSimul.gruporendas[index] = item; });
        jsonSimul.cashflow.forEach(item => { aSimul.cashflow.push(item); });

        return aSimul;
    }


}
