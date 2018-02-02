import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimulRescComponent } from './simulresc.component';

const routes: Routes = [
    { path: '', component: SimulRescComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SimulRescRoutingModule { }
