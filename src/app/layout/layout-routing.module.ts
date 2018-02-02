import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from '../services/auth/auth.guard';
import { AuthService } from '../services/auth/auth.service';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        canActivate: [ AuthGuard ],
        children: [
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'clientes', loadChildren: './clientes/clientes.module#ClientesModule' },
            { path: 'simul', loadChildren: './simul/simul.module#SimulModule' },
            { path: 'simulresc', loadChildren: './simulresc/simulresc.module#SimulRescModule' },
            { path: 'cliente/:id', loadChildren: './cliente/cliente.module#ClienteModule' }
            ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        AuthGuard,
        AuthService
    ],
})
export class LayoutRoutingModule { }
