import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogClienteComponent } from './dialogcliente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NifValidatorDirective } from '../../directives/validanif/validanif.directive';
import { TranslateModule } from '@ngx-translate/core';
import {
    MatDialogModule, MatInputModule, MatRadioModule, MatSelectModule, MatButtonModule,
    MatCheckboxModule, MatGridListModule, MatDatepickerModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatDialogModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        MatButtonModule,
        MatCheckboxModule,
        MatGridListModule,
        MatDatepickerModule,
        FlexLayoutModule,
        TranslateModule,
        ReactiveFormsModule
    ],
    declarations: [ DialogClienteComponent, NifValidatorDirective ],
    exports: [ DialogClienteComponent ],
    entryComponents: [ DialogClienteComponent ]
})
export class DialogClienteModule { }
