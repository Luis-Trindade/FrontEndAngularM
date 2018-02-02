import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { SimulRescService } from '../../services/simulresc/simulresc.service';
import { SimulacaoRescisao } from '../../data/simulresc/SimulacaoRescisao';
import { DialogErrorComponent } from '../dialogerror/dialogerror.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ZoomContratoComponent} from '../zoomcontrato/zoomcontrato.component';

@Component({
    selector: 'app-simulresc',
    templateUrl: './simulresc.component.html',
    styleUrls: ['./simulresc.component.scss'],
    animations: [routerTransition()],
    providers: [ SimulRescService ]
})
export class SimulRescComponent implements OnInit {
    simul: SimulacaoRescisao;
    // erros
    errorHeader: string;
    errorMessage: string;
    isError: boolean;

    constructor(public dialogError: MatDialog,
                public dialogZoomContrato: MatDialog,
                private _simulrescservice: SimulRescService) {
    }

    ngOnInit() {
       this.simul = new SimulacaoRescisao();
    }

    fazSimulacaoRescisao() {
        console.log('TESTE');
        this._simulrescservice.postSimulValues(this.simul)
            .subscribe(res => {
                this.simul = res;
            },
                err => {
                    // this.modalError.open(true, 'Erro', 'Erro na simulação do contrato: ' + err._body);
                    const dialogErrorRef = this.dialogError.open(DialogErrorComponent, {
                        width: '400px',
                        data: { isError: true, Header: 'Erro', Mensagem: 'Erro na simulação do contrato: ' + err._body }
                    });
        });
    }

    openZoomContrato() {
        const dialogClienteRef = this.dialogZoomContrato.open(ZoomContratoComponent, {
            width: '800px'
        });
        const sub = dialogClienteRef.componentInstance.notifyParent.subscribe((data) => {
            this.getNotificationFromZoom(data);
        });
    }

    getNotificationFromZoom(oEvento) {
        if ( oEvento.status === 200 ) {
            this.simul.contrato = oEvento.msg;
        } else {
            // this.modalError.open(true, 'Erro na selecção do contrato: ', oEvento.msg);
            const dialogErrorRef = this.dialogError.open(DialogErrorComponent, {
                width: '400px',
                data: { isError: true, Header: 'Erro', Mensagem: 'Erro na selecção do contrato: ' + oEvento.msg }
            });
        }
    }


}
