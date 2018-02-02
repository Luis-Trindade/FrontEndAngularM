import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente/cliente.service';
import { RestricaoService } from '../../services/restricao/restricao.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Sort } from '@angular/material';
import { DialogErrorComponent } from '../dialogerror/dialogerror.component';
import { DialogClienteComponent } from '../dialogcliente/dialogcliente.component';

import {Cliente} from '../../data/cliente/Cliente';

@Component({
    selector: 'app-clientes',
    templateUrl: './clientes.component.html',
    styleUrls: ['./clientes.component.scss'],
    animations: [routerTransition()],
    providers: [
        ClienteService,
        RestricaoService
    ]
})
export class ClientesComponent implements AfterViewInit {
    @ViewChild('clientesPaginator')
    private clientesPaginator: MatPaginator;
    @ViewChild(MatSort)
    private clientesSort: MatSort;

    cliente: Cliente;
    clientes: Cliente[];
    operacao = 'Inserir';
    public restricao: any[];
    restricaoselected = '--';
    filtroSearch = '';
    totalRecords = 100;
    ordenacao = [];
    displayedColumns = [ 'clinum', 'clinom', 'clitlx', 'clitel', 'clinfis' ];
    public dataSource: MatTableDataSource<Cliente>;

    errorHeader: string;
    errorMessage: string;
    isError: boolean;

    constructor(private _clienteservice: ClienteService,
                private _restricaoservice: RestricaoService,
                public dialogCliente: MatDialog,
                public dialogError: MatDialog,
                private parentRouter: Router) {
    }

    ngAfterViewInit() {
        this.cliente = new Cliente();
        this._restricaoservice.getRestricaoValues('CLIENT')
            .subscribe(res => {
                this.restricao = [ {codigo: '--', descricao: '--' } ];
                res.forEach(item => {
                   this.restricao.push({ codigo: item.codigo, descricao: item.descricao });
                });
            }, error => {
                const dialogErrorRef = this.dialogError.open(DialogErrorComponent, {
                    width: '400px',
                    data: { isError: true, Header: 'Erro', Mensagem: 'Erro ao obter a lista de restrições.' }
                });
            });
        this.clientesPaginator.page.subscribe(() => {
            this.loadListaClientes();
        });
        this.loadListaClientes();
    }

    // DIALOG REGISTO CLIENTE
    openClienteDialog() {
        const dialogClienteRef = this.dialogCliente.open(DialogClienteComponent, {
            width: '800px',
            data: { cliente: this.cliente.clinum,
                operacao: this.operacao
            }
        });
        const sub = dialogClienteRef.componentInstance.notifyParent.subscribe((data) => {
            this.getNotificationFromRegister(data);
        });
    }

    getNotificationFromRegister(oEvento) {
        if ( oEvento.status === 200 ) {
            // this.modalError.open(false, 'Cliente Registado', oEvento.msg);
            const dialogErrorRef = this.dialogError.open(DialogErrorComponent, {
                width: '400px',
                data: { isError: false, Header: 'Cliente Registado', Mensagem: oEvento.msg }
            });
        } else {
            // this.modalError.open(true, 'Erro no registo do cliente', oEvento.msg);
            const dialogErrorRef = this.dialogError.open(DialogErrorComponent, {
                width: '400px',
                data: { isError: true, Header: 'Erro no registo do cliente', Mensagem: oEvento.msg }
            });
        }
    }

    // CARREGAR LISTA CLIENTES
    loadListaClientes() {
        this._clienteservice.getCountListaClientes(this.filtroSearch, this.restricaoselected)
            .subscribe(res => {
                this.totalRecords = res;
            }, error => {
                // this.modalError.open(true, 'Erro', 'Erro ao obter a lista de clientes.');
                const dialogErrorRef = this.dialogError.open(DialogErrorComponent, {
                    width: '400px',
                    data: { isError: true, Header: 'Erro', Mensagem: 'Erro ao obter a lista de clientes.' }
                });
            });
        this._clienteservice.getListaClientes(this.clientesPaginator.pageIndex * this.clientesPaginator.pageSize,
            this.clientesPaginator.pageSize,
            this.filtroSearch,
            this.restricaoselected,
            this.ordenacao)
            .subscribe(res => {
                this.clientes = res;
                this.dataSource = new MatTableDataSource(this.clientes);
            }, error => {
                // this.modalError.open(true, 'Erro', 'Erro ao obter a lista de clientes.');
                const dialogErrorRef = this.dialogError.open(DialogErrorComponent, {
                    width: '400px',
                    data: { isError: true, Header: 'Erro', Mensagem: 'Erro ao obter a lista de clientes.' }
                });
            });
    }

    // CARREGAR DETALHE CLIENTE(DUPLO CLIQUE)
    loadPaginaCliente(oEvento) {
        this.parentRouter.navigateByUrl('/cliente/' + oEvento.clinum);
    }

    sortData(sort: Sort) {
        let aOrdenacao = {};
        this.ordenacao = [];
        switch ( sort.active) {
            case 'clinum': {
                aOrdenacao = { column: 0, order: sort.direction};
                this.ordenacao.push(aOrdenacao);
                break;
            }
            case 'clinom': {
                aOrdenacao = { column: 1, order: sort.direction};
                this.ordenacao.push(aOrdenacao);
                break;
            }
            case 'clitlx': {
                aOrdenacao = { column: 2, order: sort.direction};
                this.ordenacao.push(aOrdenacao);
                break;
            }
            case 'clitel': {
                aOrdenacao = { column: 3, order: sort.direction};
                this.ordenacao.push(aOrdenacao);
                break;
            }
            case 'clinfis': {
                aOrdenacao = { column: 4, order: sort.direction};
                this.ordenacao.push(aOrdenacao);
                break;
            }
            default: {
                aOrdenacao = { };
                break;
            }
        }
        this.loadListaClientes();
    }
}
