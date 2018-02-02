import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-dialogconfirm',
    templateUrl: './dialogconfirm.component.html',
    styleUrls: ['./dialogconfirm.component.scss']

})

export class DialogConfirmComponent implements OnInit {
    Header: string;
    Mensagem: string;
    isError: boolean;
    notifyParent: EventEmitter<any> = new EventEmitter();
    isHidden: boolean;

    closeResult: string;
    modalConfirm: any;

    constructor(
        public dialogRef: MatDialogRef<DialogConfirmComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
        this.isHidden = true;
        this.Header = this.data.Header;
        this.Mensagem = this.data.Mensagem;
        this.isError = this.data.isError;
        this.dialogRef.disableClose = true;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    notify(result: boolean) {
        this.notifyParent.emit(result );
    }

    clickedOK() {
        this.notify(true);
        this.dialogRef.close();
    }

    clickedCancel() {
        this.notify(false);
        this.dialogRef.close();
    }
}
