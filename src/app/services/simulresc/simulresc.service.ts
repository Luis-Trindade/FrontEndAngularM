import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SimulacaoRescisao } from '../../data/simulresc/SimulacaoRescisao';
import { Observable } from 'rxjs/Observable';

import { AppConfig } from '../config/app.config';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SimulRescService {
    constructor ( private httpClient: HttpClient, private config: AppConfig) {}

    postSimulValues(simul: SimulacaoRescisao) {
        const serviceUrl =
            'http://' +
            this.config.getConfig('hostBridge') +
            ':' + this.config.getConfig('portBridge') +
            '/api/simulresc';
        return this.httpClient.post(serviceUrl, this.setJsonPostFromSimulacao(simul))
            .map((responseData) => {
                return this.setSimulacaoFromJsonPost(responseData);
            });
    }

    setJsonPostFromSimulacao(simul: SimulacaoRescisao) {
        const jsonSimul: any = {};
        jsonSimul.contrato = simul.contrato;
        jsonSimul.data = simul.data;
        jsonSimul.ctotipo = simul.ctotipo;
        jsonSimul.cliente = simul.cliente;
        jsonSimul.datarescisao = simul.datarescisao;
        jsonSimul.valortotal = simul.valortotal;
        jsonSimul.rescisaocomiva = simul.rescisaocomiva;
        jsonSimul.rescisaosemiva = simul.rescisaosemiva;
        jsonSimul.jurosmora = simul.jurosmora;
        jsonSimul.debitosatraso = simul.debitosatraso;
        jsonSimul.despesasciva = simul.despesasciva;
        jsonSimul.caucao = simul.caucao;
        jsonSimul.proximarenda = simul.proximarenda;
        jsonSimul.valorseguro = simul.valorseguro;
        jsonSimul.capital = simul.capital;
        jsonSimul.juro = simul.juro;

        return jsonSimul;
    }

    setSimulacaoFromJsonPost(jsonSimul) {
        const aSimul = new SimulacaoRescisao();
        aSimul.data = jsonSimul.simul.data;
        aSimul.contrato = jsonSimul.simul.contrato;
        aSimul.ctotipo = jsonSimul.simul.ctotipo;
        aSimul.cliente = jsonSimul.simul.cliente;
        aSimul.datarescisao = jsonSimul.simul.datarescisao;
        aSimul.valortotal = jsonSimul.simul.valortotal;
        aSimul.rescisaocomiva = jsonSimul.simul.rescisaocomiva;
        aSimul.rescisaosemiva = jsonSimul.simul.rescisaosemiva;
        aSimul.jurosmora = jsonSimul.simul.jurosmora;
        aSimul.debitosatraso = jsonSimul.simul.debitosatraso;
        aSimul.despesasciva = jsonSimul.simul.despesasciva;
        aSimul.caucao = jsonSimul.simul.caucao;
        aSimul.proximarenda = jsonSimul.simul.proximarenda;
        aSimul.valorseguro = jsonSimul.simul.valorseguro;
        aSimul.capital = jsonSimul.simul.capital;
        aSimul.juro = jsonSimul.simul.juro;

        return aSimul;
    }


}
