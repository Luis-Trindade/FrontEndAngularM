import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { ClienteService } from '../../services/cliente/cliente.service';


@Directive({
    selector: '[validaNif][formControlName][app],[validaNif][formControl],[validaNif][ngModel]',
    providers: [
        { provide: NG_ASYNC_VALIDATORS, useExisting: forwardRef(() => NifValidatorDirective), multi: true },
        ClienteService
    ]
})
export class NifValidatorDirective implements Validator {

    constructor( @Attribute('validaNif') public validaNif: string,
                 private _clienteservice: ClienteService) {
    }

    validate(c: AbstractControl): { [key: string]: any } {
        return this._clienteservice.validateNifRemote(c.value).debounceTime(500).first();
    }
}
