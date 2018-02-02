import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteComponent } from './cliente.component';
import { PageHeaderModule } from '../../shared';
import { DialogClienteModule } from '../dialogcliente/dialogcliente.module';
import { DialogErrorModule } from '../dialogerror/dialogerror.module';
import { DialogConfirmModule } from '../dialogconfirm/dialogconfirm.module';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule, MatMenuModule, MatIconModule, MatCardModule, MatGridListModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule, MatPaginatorModule } from '@angular/material';

@NgModule({
  imports: [
        CommonModule,
        MatButtonModule,
        MatMenuModule,
        Ng2Charts,
        ClienteRoutingModule,
        MatIconModule,
        MatTableModule,
        MatCardModule,
        MatPaginatorModule,
        MatGridListModule,
        TranslateModule,
        DialogClienteModule,
        DialogErrorModule,
        DialogConfirmModule,
        FlexLayoutModule,
        PageHeaderModule
  ],
  declarations: [
      ClienteComponent
    ]
})
export class ClienteModule { }
