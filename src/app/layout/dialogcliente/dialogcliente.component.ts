import {Component, Input, Output, EventEmitter, OnInit, Inject} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PaisService } from '../../services/pais/pais.service';
import { ClienteService } from '../../services/cliente/cliente.service';
import { Cliente } from '../../data/cliente/Cliente';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-dialogcliente',
    templateUrl: './dialogcliente.component.html',
    styleUrls: ['./dialogcliente.component.scss'],
    providers: [
        ClienteService,
        PaisService ]
})

export class DialogClienteComponent implements OnInit {
    cliente: Cliente;
    operacao: string;
    @Output() notifyParent: EventEmitter<any> = new EventEmitter();

    closeResult: string;
    public pais: any[] = [];
    modalCliente: any;

    constructor(public dialogRef: MatDialogRef<DialogClienteComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private _clienteservice: ClienteService,
                private _paisservice: PaisService ) { }

    ngOnInit() {
        this.cliente = this.data.cliente;
        this.operacao = this.data.operacao;

        this._paisservice.getPaisValues()
            .subscribe(res => {
                this.pais = res;
            }, error => {
                this.notify(400, 'Erro ao obter a lista de paises');
            });

        // defaults
        if ( this.operacao === 'Inserir' ) {
            this.cliente = new Cliente();
            this._clienteservice.getClienteDefaults()
                .subscribe( res => {
                    this.cliente = res;
                    this.cliente.clinum = undefined;
                }, error => {
                    this.notify(400, 'Erro ao obter os defaults para o registo de clientes.');
                });
        }

        /*this.modalCliente = this.modalService.open(content, { size: 'lg' } );
        this.modalCliente.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });*/
    }
/*
    open(content) {
        this._paisservice.getPaisValues()
            .subscribe(res => {
                this.pais = res;
            }, error => {
            this.notify(400, 'Erro ao obter a lista de paises');
        });
        // defaults
        if ( this.operacao === 'Inserir' ) {
            this.cliente = new Cliente();
            this._clienteservice.getClienteDefaults()
                .subscribe( res => {
                    this.cliente = res;
                    this.cliente.clinum = undefined;
                }, error => {
                    this.notify(400, 'Erro ao obter os defaults para o registo de clientes.');
                });
        }

        this.modalCliente = this.modalService.open(content, { size: 'lg' } );
        this.modalCliente.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
*/
    /* Regista ou modifica cliente conforme o tipo de operação */
    public RegModCliente() {
        if ( this.operacao === 'Inserir' ) {
            this._clienteservice.postClienteValues(this.cliente)
                .subscribe(res => {
                    this.cliente = res;
                    this.notify(200, 'O cliente foi registado com sucesso com o número ' + this.cliente.clinum);
                }, error => {
                    this.notify(400, 'Erro no Registo do cliente: ' + error._body);
                    });
        } else if ( this.operacao === 'Modificar' ) {
            this._clienteservice.putClienteValues(this.cliente)
                .subscribe(res => {
                    this.cliente = res;
                    this.notify(200, 'Cliente Modificado com Sucesso!');
            }, error => {
                this.notify(400, 'Erro na modificação do cliente: ' + error._body);
            });
        } else {
            this.cliente = new Cliente();
        }
        this.dialogRef.close();
    }

    notify(oStatus, aMensagem) {
        this.notifyParent.emit({ status: oStatus, msg: aMensagem});
    }

    onNoClick(): void {
        this.dialogRef.close();
    }


}
