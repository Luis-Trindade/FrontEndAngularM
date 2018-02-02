import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { APP_INITIALIZER } from '@angular/core';
import { AppConfig } from './services/config/app.config';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './services/auth/auth.guard';
import { AuthService } from './services/auth/auth.service';
import { AngularWeatherWidgetModule, WeatherApiName } from 'angular-weather-widget';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material';
import { MatDatepickerModule, MatNativeDateModule, DateAdapter } from '@angular/material';
import { DateFormat } from './shared/pipes/date-format';
import { FlexLayoutModule } from '@angular/flex-layout';


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
//     for development
//     return new TranslateHttpLoader(http, '/start-angular/SB-Admin-BS4-Angular-4/master/dist/assets/i18n/', '.json');
    return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

export function initConfig(config: AppConfig) {
    return () => config.load();
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FlexLayoutModule,
        BrowserAnimationsModule,
        FormsModule,
        MatDialogModule,
        HttpClientModule,
        AppRoutingModule,
        MatDatepickerModule, MatNativeDateModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        AngularWeatherWidgetModule.forRoot({
            key: '6db95282debf29f37dc2b26cd07f8fb3',
            name: WeatherApiName.OPEN_WEATHER_MAP,
            baseUrl: 'http://api.openweathermap.org/data/2.5'
        })
    ],
    providers: [
        AuthGuard,
        AuthService,
        AppConfig,
        { provide: DateAdapter, useClass: DateFormat },
        { provide: APP_INITIALIZER,
            useFactory: initConfig,
            deps: [AppConfig],
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(private dateAdapter:DateAdapter<Date>) {
        dateAdapter.setLocale('pt-PT'); // DD/MM/YYYY
    }
}
