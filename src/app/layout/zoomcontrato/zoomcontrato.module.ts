import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';
import { ZoomContratoComponent } from './zoomcontrato.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatInputModule, MatButtonModule, MatSelectModule, MatGridListModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        MatDialogModule,
        MatButtonModule,
        MatSelectModule,
        MatInputModule,
        MatGridListModule,
        FlexLayoutModule,
        ReactiveFormsModule
    ],
    declarations: [ZoomContratoComponent],
    exports: [ZoomContratoComponent],
    entryComponents: [ ZoomContratoComponent ]
})
export class ZoomContratoModule { }
