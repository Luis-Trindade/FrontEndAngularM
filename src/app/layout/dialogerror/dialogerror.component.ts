import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-dialogerror',
    templateUrl: './dialogerror.component.html',
    styleUrls: ['./dialogerror.component.scss']

})

export class DialogErrorComponent implements OnInit {
    Header: string;
    Mensagem: string;
    isError: boolean;
    // notifyParent: EventEmitter<any> = new EventEmitter();
    isHidden: boolean;

    closeResult: string;
    modalError: any;

    constructor(
        public dialogRef: MatDialogRef<DialogErrorComponent>,
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
}
