import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { PipelineService } from '../../services/pipeline/pipeline.service';
import { ClienteService } from '../../services/cliente/cliente.service';
import { ContraService } from '../../services/contra/contra.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog, MAT_DIALOG_DATA, MatPaginator, MatTableDataSource } from '@angular/material';

import { Cliente } from '../../data/cliente/Cliente';
import { Contrato } from '../../data/contra/Contrato';
import { DialogErrorComponent } from '../dialogerror/dialogerror.component';
import { DialogConfirmComponent } from '../dialogconfirm/dialogconfirm.component';
import { DialogClienteComponent } from '../dialogcliente/dialogcliente.component';

@Component({
    selector: 'app-cliente',
    templateUrl: './cliente.component.html',
    styleUrls: ['./cliente.component.scss'],
    animations: [routerTransition()],
    providers: [
        PipelineService,
        ContraService,
        ClienteService
    ]
})
export class ClienteComponent implements AfterViewInit, OnInit, OnDestroy {
    @ViewChild('contratosPaginator')
    private contratosPaginator: MatPaginator;

    public cliente: Cliente;
    contratos: Contrato[];
    operacao = 'Modificar';
    private sub: any;
    public addressMap: string;
    totalRecordContratos = 100;
    // Doughnut
    public doughnutChartLabels: string[] = ['Leasing', 'Imobiliário', 'Crédito', 'Renting'];
    public doughnutChartData: number[] = [350, 450, 100, 200];
    public doughnutChartType = 'doughnut';
    public isDataAvailable = false;
    displayedColumns = [ 'ctonum', 'cto2dat', 'ctopraz', 'ctotcon' ];
    private dataSource: MatTableDataSource<Contrato>;
    // erros
    errorHeader: string;
    errorMessage: string;
    confirmMessage: string;
    isError: boolean;

    constructor(private _pipelineservice: PipelineService,
                private _clienteservice: ClienteService,
                private _contraservice: ContraService,
                public dialogError: MatDialog,
                public dialogConfirm: MatDialog,
                public dialogCliente: MatDialog,
                private route: ActivatedRoute,
                private parentRouter: Router,
                private _sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        this.cliente = new Cliente();
        this.sub = this.route.params.subscribe(params => {
            this.cliente.clinum = +params['id'];
            this._clienteservice.getCliente(this.cliente.clinum)
                .subscribe(res => {
                    console.log(JSON.stringify(res));
                    this.cliente = res;
                    this.addressMap =
                        'https://www.google.com/maps/embed/v1/place?key=AIzaSyB8G1i2Hwt_PIhC7LtRnBWQolyXhPbtjZE&q=+' +
                        this.cliente.climor + ' ' + this.cliente.cliloc;
                }, error => {
                    // this.modalError.open(true, 'Erro', 'Erro ao obter o cliente.');
                    const dialogErrorRef = this.dialogError.open(DialogErrorComponent, {
                        width: '400px',
                        data: { isError: true, Header: 'Erro', Mensagem: 'Erro ao obter o cliente.' }
                    });
                });
        });


        this._pipelineservice.getChartValues(this.cliente.clinum)
            .subscribe(res => {
                this.doughnutChartLabels = res.doughnutChartLabels;
                this.doughnutChartData = res.doughnutChartData;
                this.isDataAvailable = true;
            }, error => {
                // this.modalError.open(true, 'Erro', 'Erro ao obter os valores para o gráfico circular.');
                const dialogErrorRef = this.dialogError.open(DialogErrorComponent, {
                    width: '400px',
                    data: { isError: true, Header: 'Erro', Mensagem: 'Erro ao obter os valores para o gráfico circular.' }
                });
            });
    }

    ngAfterViewInit() {
        this.loadDataContratos({
                            first: this.contratosPaginator.pageIndex * this.contratosPaginator.pageSize,
                            rows: this.contratosPaginator.pageSize
        });
        this.contratosPaginator.page.subscribe(() => {
            this.loadDataContratos({
                            first: this.contratosPaginator.pageIndex * this.contratosPaginator.pageSize,
                            rows: this.contratosPaginator.pageSize
            });
        });
    }


    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    loadDataContratos( oEvento ) {
        const queryAnd = '&ctocli=' + this.cliente.clinum;

        this._contraservice.getCountListaContratos('', this.cliente.clinum)
            .subscribe(res => {
                this.totalRecordContratos = res;
            }, error => {
                const dialogErrorRef = this.dialogError.open(DialogErrorComponent, {
                    width: '400px',
                    data: { isError: true, Header: 'Erro', Mensagem: 'Erro ao obter a lista de contratos.' }
                });
            });
        this._contraservice.getListaContratos(oEvento.first, oEvento.rows, '', '--', [], queryAnd )
            .subscribe(res => {
                this.contratos = res;
                this.dataSource = new MatTableDataSource(this.contratos);
            }, error => {
                const dialogErrorRef = this.dialogError.open(DialogErrorComponent, {
                    width: '400px',
                    data: { isError: true, Header: 'Erro', Mensagem: 'Erro ao obter a lista de contratos.' }
                });
            });
    }

    deleteCliente() {
        // this.modalConfirm.open('Deseja apagar o cliente ' + this.cliente.clinum + '?');
        // const ref = this.dialogConfirm.open(InnerComponent);
        const dialogConfirmRef = this.dialogConfirm.open(DialogConfirmComponent, {
            width: '400px',
            data: { Header: "Confirma?",
                    Mensagem: 'Deseja apagar o cliente ' + this.cliente.clinum + '?'
            }
        });
        const sub = dialogConfirmRef.componentInstance.notifyParent.subscribe((data) => {
            this.getNotificationFromConfirm(data);
        });
    }

    openClienteDialog() {
        const dialogClienteRef = this.dialogCliente.open(DialogClienteComponent, {
            width: '800px',
            data: { cliente: this.cliente,
                operacao: this.operacao
            }
        });
        const sub = dialogClienteRef.componentInstance.notifyParent.subscribe((data) => {
            this.getNotificationFromModify(data);
        });
    }

    getNotificationFromModify(oEvento) {
        if ( oEvento.status === 200 ) {
            // this.modalError.open(false, 'Cliente Modificado', oEvento.msg);
            const dialogErrorRef = this.dialogError.open(DialogErrorComponent, {
                width: '400px',
                data: { isError: false, Header: 'Cliente Modificado', Mensagem: oEvento.msg }
            });
        } else {
            // this.modalError.open(true, 'Erro na modificação do cliente', oEvento.msg);
            const dialogErrorRef = this.dialogError.open(DialogErrorComponent, {
                width: '400px',
                data: { isError: true, Header: 'Erro na modificação do cliente', Mensagem: oEvento.msg }
            });
        }
    }

    getNotificationFromConfirm(oEvento: boolean) {
        if ( oEvento ) {
            this._clienteservice.deleteCliente(this.cliente.clinum)
                .subscribe(res => {
                    // this.modalError.open(false, 'Cliente Apagado', 'O cliente ' + this.cliente.clinum + ' foi apagado com sucesso.');
                    const dialogErrorRef = this.dialogError.open(DialogErrorComponent, {
                        width: '400px',
                        data: { isError: false,
                                Header: 'Cliente Apagado',
                                Mensagem: 'O cliente ' + this.cliente.clinum + ' foi apagado com sucesso.'
                            }
                    });
                    this.parentRouter.navigateByUrl('/clientes');
                }, err => {
                    // this.modalError.open(true, 'Erro', 'Erro ao apagar o cliente ' + this.cliente.clinum + ': ' + err._body);
                    const dialogErrorRef = this.dialogError.open(DialogErrorComponent, {
                        width: '400px',
                        data: { isError: true,
                            Header: 'Erro',
                            Mensagem: 'Erro ao apagar o cliente ' + this.cliente.clinum + ': ' + err._body
                        }
                    });
                });
        }
    }

    mapURL() {
        return this._sanitizer.bypassSecurityTrustResourceUrl(this.addressMap);
    }
}
