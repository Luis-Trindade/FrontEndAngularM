import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesComponent } from './clientes.component';
import { PageHeaderModule } from '../../shared';
import { DialogClienteModule } from '../dialogcliente/dialogcliente.module';
import { TranslateModule } from '@ngx-translate/core';
import { DialogErrorModule } from '../dialogerror/dialogerror.module';
import {
    MatTableModule, MatPaginatorModule, MatSortModule, MatIconModule, MatButtonModule, MatCardModule,
    MatInputModule, MatSelectModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
      CommonModule,
      PageHeaderModule,
      FormsModule,
      ClientesRoutingModule,
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
      MatIconModule,
      MatButtonModule,
      MatCardModule,
      MatInputModule,
      MatSelectModule,
      FlexLayoutModule,
      TranslateModule,
      DialogClienteModule,
      DialogErrorModule
  ],
  declarations: [
      ClientesComponent
    ]
})
export class ClientesModule { }
