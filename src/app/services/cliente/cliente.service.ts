import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Cliente } from '../../data/cliente/Cliente';
import { Observable } from 'rxjs/Observable';
import { AppConfig } from '../config/app.config';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ClienteService {
    constructor ( private httpClient: HttpClient, private config: AppConfig) {}

    postClienteValues(client: Cliente) {
        const serviceUrl = 'http://' + this.config.getConfig('hostBridge') + ':' + this.config.getConfig('portBridge') + '/api/clientes';

        return this.httpClient.post(serviceUrl, client)
            .map((responseData) => {
                return this.setClienteFromJsonPost(responseData);
            });
    }

    putClienteValues(client: Cliente) {
        const serviceUrl =
            'http://' +
            this.config.getConfig('hostBridge') +
            ':' + this.config.getConfig('portBridge') +
            '/api/clientes/' + client.clinum;
        return this.httpClient.put(serviceUrl, client)
            .map((responseData) => {
                return this.setClienteFromJsonPost(responseData);
            });
    }

    deleteCliente(client: number) {
        const serviceUrl =
            'http://' +
            this.config.getConfig('hostBridge') +
            ':' + this.config.getConfig('portBridge') +
            '/api/clientes/' + client;
        return this.httpClient.delete(serviceUrl);
    }

    validateNifRemote( clinfis: string ) {
        const serviceUrl =
            'http://' +
            this.config.getConfig('hostBridge') +
            ':' + this.config.getConfig('portBridge') +
            '/api/clientes/valida_nif?nif=' + clinfis;
          return new Observable(observer => {
            this.httpClient.get(serviceUrl)
                .subscribe(data => {
                    observer.next(null);
                }, err => {
                    if ( err.status === 200) {
                        observer.next(null);
                    } else {
                        observer.next({validaNif: true});
                    }
                })
          });
    }

    setClienteFromJsonPost(jsonClient) {
        const oCliente = new Cliente();
        oCliente.clinom = jsonClient.client.clinom;
        oCliente.cliwww = jsonClient.client.cliwww;
        oCliente.clitlx = jsonClient.client.clitlx;
        oCliente.clitel = jsonClient.client.clitel;
        oCliente.clinum = jsonClient.client.clinum;
        oCliente.clitcli = jsonClient.client.clitcli;
        oCliente.clinfis = jsonClient.client.clinfis;
        oCliente.climor = jsonClient.client.climor;
        oCliente.climor2 = jsonClient.client.climor2;
        oCliente.clipais = jsonClient.client.clipais;
        oCliente.clicop = jsonClient.client.clicop;
        oCliente.clicop2 = jsonClient.client.clicop2;
        oCliente.cliloc = jsonClient.client.cliloc;
        oCliente.restocliente.datanascimento = jsonClient.restocliente.datanascimento;
        oCliente.cliehsucursal = jsonClient.client.cliehsucursal;
        oCliente.cliivacaixa = jsonClient.client.cliivacaixa;
        oCliente.clibanco = jsonClient.client.clibanco;

        return oCliente;
    }

    setClienteFromJson(jsonClient) {
        const oCliente = new Cliente();
        oCliente.clinom = jsonClient.client[0].clinom;
        oCliente.cliwww = jsonClient.client[0].cliwww;
        oCliente.clitlx = jsonClient.client[0].clitlx;
        oCliente.clitel = jsonClient.client[0].clitel;
        oCliente.clinum = jsonClient.client[0].clinum;
        oCliente.clitcli = jsonClient.client[0].clitcli;
        oCliente.clinfis = jsonClient.client[0].clinfis;
        oCliente.climor = jsonClient.client[0].climor;
        oCliente.climor2 = jsonClient.client[0].climor2;
        oCliente.clipais = jsonClient.client[0].clipais;
        oCliente.clicop = jsonClient.client[0].clicop;
        oCliente.clicop2 = jsonClient.client[0].clicop2;
        oCliente.cliloc = jsonClient.client[0].cliloc;
        if ( jsonClient.restocliente ) {
            oCliente.restocliente.datanascimento = jsonClient.restocliente[0].datanascimento;
        }
        oCliente.cliehsucursal = jsonClient.client[0].cliehsucursal;
        oCliente.cliivacaixa = jsonClient.client[0].cliivacaixa;
        oCliente.clibanco = jsonClient.client[0].clibanco;

        return oCliente;
    }

    setClientesFromJsonArray(jsonArrayClientes) {
        const osClientes: Cliente[] = [];
        jsonArrayClientes.forEach( oItem => {
            const oCliente = new Cliente();
            oCliente.clinum = oItem.clinum;
            oCliente.clinom = oItem.clinom;
            oCliente.clitel = oItem.clitel;
            oCliente.clitel = oItem.clitlx;
            oCliente.clinfis = oItem.clinfis;
            osClientes.push(oCliente);
        });
        return osClientes;
    }

    getCliente(clinum: number) {
        const serviceUrl =
            'http://' +
            this.config.getConfig('hostBridge') +
            ':' + this.config.getConfig('portBridge') +
            '/api/clientes/' + clinum;
        return this.httpClient.get(serviceUrl)
            .map((responseData) => {
                return this.setClienteFromJson(responseData);
            });
    }

    getClienteDefaults() {
        const serviceUrl =
            'http://' +
            this.config.getConfig('hostBridge') +
            ':' + this.config.getConfig('portBridge') +
            '/api/clientes/defaults';
        return this.httpClient.get(serviceUrl)
            .map((responseData) => {
            // console.log(JSON.stringify(responseData));
            const responseMapped = { client: [] };
            responseMapped.client[0] = responseData[0];
                return this.setClienteFromJson(responseMapped);
            });
    }

    getListaClientes(oStart: number, oTamanho: number, aSearch: string, aRestricao: string, aOrdenacao: any[]) {
        const baseUrl =
            'http://' +
            this.config.getConfig('hostBridge') +
            ':' + this.config.getConfig('portBridge') +
            '/api/clientes/';
        let restUrlClientes = baseUrl;
        const countUrlClientes = baseUrl + '/count';
        let countFilteredUrlClientes = baseUrl + '/count';

        let queryParams = '?';

        queryParams = queryParams + 'start=' + oStart;

        queryParams = queryParams + '&length=' + oTamanho;
        if ( aSearch ) {
            queryParams = queryParams + '&search[value]=' + aSearch;
        } else {
            queryParams = queryParams + '&search[value]='
        }

        queryParams = queryParams + '&restricao=' + aRestricao;
        if ( aOrdenacao.length > 0 ) {
            const ordem = '&order[0][column]=' + aOrdenacao[0].column + '&order[0][dir]=' + aOrdenacao[0].order;
            queryParams = queryParams + ordem;
        } else {
            queryParams = queryParams + '&order[0][column]=0&order[0][dir]=asc';
        }

        restUrlClientes = restUrlClientes + queryParams;
        countFilteredUrlClientes = countFilteredUrlClientes + queryParams;
        return this.httpClient.get(restUrlClientes)
            .map((responseData: any) => {
                return this.setClientesFromJsonArray(responseData.data);
            });
    }

    getCountListaClientes(globalFilter, restricaoselected) {
        const baseUrl =
            'http://' +
            this.config.getConfig('hostBridge') +
            ':' + this.config.getConfig('portBridge') +
            '/api/clientes/';
        let countUrlClientes = baseUrl + 'count';
        let queryParams = '?';
        if ( globalFilter ) {
            queryParams = queryParams + '&search[value]=' + globalFilter;
        } else {
            queryParams = queryParams + '&search[value]='
        }

        queryParams = queryParams + '&restricao=' + restricaoselected;
        countUrlClientes = countUrlClientes + queryParams;
        return this.httpClient.get<number>(countUrlClientes);
    }
}
