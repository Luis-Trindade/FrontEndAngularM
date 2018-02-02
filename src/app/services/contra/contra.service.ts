import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { HttpClient } from '@angular/common/http';
import { Contrato } from '../../data/contra/Contrato';
import { AppConfig } from '../config/app.config';

@Injectable()
export class ContraService {
    constructor ( private httpClient: HttpClient, private config: AppConfig) {}

    setContratosFromJsonArray(jsonArrayContratos) {
        const osContratos: Contrato[] = [];
        jsonArrayContratos.forEach( oItem => {
            const oContrato = new Contrato();
            oContrato.ctonum = oItem.ctonum;
            oContrato.cto2dat = oItem.cto2dat;
            oContrato.ctopraz = oItem.ctopraz;
            oContrato.ctotcon = oItem.ctotcon;
            oContrato.ctoncon = oItem.ctoncon;
            oContrato.ctosub = oItem.ctosub;
            oContrato.ctotipo = oItem.ctotipo;
            oContrato.descricao = oItem.descricao;
            oContrato.ctostatus = oItem.ctostatus;
            oContrato.ctocli = oItem.ctocli;
            oContrato.clinom = oItem.clinom;
            osContratos.push(oContrato);
        });
        return osContratos;
    }

    getListaContratos(oStart: number, oTamanho: number, aSearch: string, aRestricao: string, aOrdenacao: any[], specificSearch: string) {
        const restBaseUrl = 'http://' + this.config.getConfig('hostBridge') + ':' + this.config.getConfig('portBridge');
        let restUrlContratos = restBaseUrl + '/api/contra/short';
        const countUrlContratos = restBaseUrl + '/api/contra/count';
        let countFilteredUrlContratos = restBaseUrl + '/api/contra/count';

        let queryParams = '?';

        queryParams = queryParams + 'start=' + oStart;

        queryParams = queryParams + '&length=' + oTamanho;
        if ( aSearch ) {
            queryParams = queryParams + '&search[value]=' + aSearch;
        } else {
            queryParams = queryParams + '&search[value]='
        }

        queryParams = queryParams + '&restricao=' + aRestricao;
        console.log(aOrdenacao);
        if ( aOrdenacao.length > 0 ) {
            const ordem = '&order[0][column]=' + aOrdenacao[0].column + '&order[0][dir]=' + aOrdenacao[0].order;
            queryParams = queryParams + ordem;
        } else {
            queryParams = queryParams + '&order[0][column]=0&order[0][dir]=asc';
        }

        if ( specificSearch.length > 0 ) {
            queryParams = queryParams + '&' + specificSearch;
        }

        restUrlContratos = restUrlContratos + queryParams;
        countFilteredUrlContratos = countFilteredUrlContratos + queryParams;

        return this.httpClient.get(restUrlContratos)
            .map((responseData: any) => {
                return this.setContratosFromJsonArray(responseData.data);
            });
    }

    getCountListaContratos(globalFilter, clinum) {
        const baseUrl =
            'http://' +
            this.config.getConfig('hostBridge') +
            ':' + this.config.getConfig('portBridge') +
            '/api/contra/';
        let countUrlContratos = baseUrl + 'count';
        let queryParams = '?';
        if ( globalFilter ) {
            queryParams = queryParams + '&search[value]=' + globalFilter;
        } else {
            queryParams = queryParams + '&search[value]='
        }

        queryParams = queryParams + '&ctocli=' + clinum;
        countUrlContratos = countUrlContratos + queryParams;
        return this.httpClient.get<number>(countUrlContratos);
    }
}
