import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DialogChartLinesComponent } from './dialogchartlines.component';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        Ng2Charts,
        FlexLayoutModule,
        TranslateModule
    ],
    declarations: [ DialogChartLinesComponent ],
    exports: [ DialogChartLinesComponent ],
    entryComponents: [ DialogChartLinesComponent ]
})
export class DialogChartLinesModule { }
