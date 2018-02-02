import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SimulRescRoutingModule } from './simulresc-routing.module';
import { SimulRescComponent } from './simulresc.component';
import { PageHeaderModule } from '../../shared';
import { TranslateModule } from '@ngx-translate/core';

import { ZoomContratoModule } from '../zoomcontrato/zoomcontrato.module';
import { DialogErrorModule } from '../dialogerror/dialogerror.module';
import {
    MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatDatepickerModule,
    MatGridListModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
        CommonModule,
        SimulRescRoutingModule,
        FormsModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        MatDatepickerModule,
        MatGridListModule,
        DialogErrorModule,
        FlexLayoutModule,
        TranslateModule,
        ZoomContratoModule,
        PageHeaderModule
  ],
  declarations: [SimulRescComponent]
})
export class SimulRescModule { }
