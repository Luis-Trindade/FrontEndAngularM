import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimulComponent } from './simul.component';

const routes: Routes = [
    { path: '', component: SimulComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SimulRoutingModule { }
