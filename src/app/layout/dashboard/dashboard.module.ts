import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { TranslateModule } from '@ngx-translate/core';
import { AngularWeatherWidgetModule, WeatherApiName } from 'angular-weather-widget';
import { DialogErrorModule } from '../dialogerror/dialogerror.module';
import { MatCardModule, MatChipsModule, MatGridListModule, MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        CommonModule,
        Ng2Charts,
        DashboardRoutingModule,
        DialogErrorModule,
        TranslateModule,
        MatCardModule,
        MatChipsModule,
        MatIconModule,
        FlexLayoutModule,
        MatGridListModule,
        AngularWeatherWidgetModule.forRoot({
            key: '6db95282debf29f37dc2b26cd07f8fb3',
            name: WeatherApiName.OPEN_WEATHER_MAP,
            baseUrl: 'http://api.openweathermap.org/data/2.5'
        })
    ],
    declarations: [DashboardComponent]
})
export class DashboardModule { }
