import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Cashflow } from '../../data/simul/Cashflow';

import { MatTableDataSource } from '@angular/material';

@Component({
    selector: 'app-dialogcashflow',
    templateUrl: './dialogcashflow.component.html',
    styleUrls: ['./dialogcashflow.component.scss']

})

export class DialogCashflowComponent implements OnInit {
    cashflow: Cashflow[];
    dataSource: MatTableDataSource<Cashflow>;
    displayedColumns = ['datainiper', 'capinicio', 'valor', 'capital', 'juro', 'imposto' ];
    closeResult: string;
    modalCashflow: any;

    constructor(
        public dialogRef: MatDialogRef<DialogCashflowComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
            this.cashflow = this.data.cashflow;
            this.dataSource = new MatTableDataSource(this.cashflow);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
