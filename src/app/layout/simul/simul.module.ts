import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SimulRoutingModule } from './simul-routing.module';
import { SimulComponent } from './simul.component';
import { PageHeaderModule } from '../../shared';
import { TranslateModule } from '@ngx-translate/core';
import { DialogChartLinesModule } from '../dialogchartlines/dialogchartlines.module';
import { DialogCashflowModule } from '../dialogcashflow/dialogcashflow.module';
import { DialogErrorModule } from '../dialogerror/dialogerror.module';
import {
    MatCardModule, MatDialogModule, MatGridListModule, MatInputModule, MatRadioModule,
    MatSelectModule, MatListModule, MatButtonModule, MatDatepickerModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
// import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

@NgModule({
  imports: [
        CommonModule,
        SimulRoutingModule,
        FormsModule,
        MatDialogModule,
        MatCardModule,
        MatInputModule,
        MatSelectModule,
        MatRadioModule,
        MatDatepickerModule,
        MatGridListModule,
        MatListModule,
        MatButtonModule,
        DialogErrorModule,
        DialogChartLinesModule,
        DialogCashflowModule,
        FlexLayoutModule,
        TranslateModule,
        PageHeaderModule
  ],
  declarations: [SimulComponent]
})
export class SimulModule { }
