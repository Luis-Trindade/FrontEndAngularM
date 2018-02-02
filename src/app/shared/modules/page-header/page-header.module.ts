import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PageHeaderComponent } from './page-header.component';
import { MatChipsModule, MatIconModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MatChipsModule,
        MatIconModule
    ],
    declarations: [PageHeaderComponent],
    exports: [PageHeaderComponent]
})
export class PageHeaderModule { }
