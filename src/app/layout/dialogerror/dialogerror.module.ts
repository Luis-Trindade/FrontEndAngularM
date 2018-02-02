import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DialogErrorComponent } from './dialogerror.component';
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
    declarations: [ DialogErrorComponent ],
    exports: [ DialogErrorComponent ],
    entryComponents: [ DialogErrorComponent ]
})
export class DialogErrorModule { }
