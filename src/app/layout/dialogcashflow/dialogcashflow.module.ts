import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DialogCashflowComponent } from './dialogcashflow.component';
import { MatDialogModule, MatTableModule, MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        CommonModule,
        MatTableModule,
        MatDialogModule,
        MatButtonModule,
        FlexLayoutModule,
        TranslateModule
    ],
    declarations: [ DialogCashflowComponent ],
    exports: [ DialogCashflowComponent ],
    entryComponents: [ DialogCashflowComponent ]
})
export class DialogCashflowModule { }
