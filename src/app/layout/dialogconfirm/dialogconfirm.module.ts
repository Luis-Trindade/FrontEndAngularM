import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DialogConfirmComponent } from './dialogconfirm.component';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        FlexLayoutModule,
        TranslateModule
    ],
    declarations: [ DialogConfirmComponent ],
    exports: [ DialogConfirmComponent ],
    entryComponents: [ DialogConfirmComponent ]
})
export class DialogConfirmModule { }
