import { Cashflow } from './Cashflow';
import { Gruporendas } from './Gruporendas';

export class Simulacao {

        public cto2dat: Date;
        public ctotcon: number;
        public ctopraz: number;
        public ctoper: number;
        public ctoap: string;
        public ctoiva: number;
        public cto1ren: Date;
        public ctojurdif: string;
        public ctodado: string;
        public ctovaljurdif: number;
        public ctotxim: number;
        public gruporendas: Gruporendas[] = [];
        public cashflow: Cashflow[] = [];

    constructor( ) {
        this.cto2dat = new Date();
        this.cto1ren = new Date();
        this.ctoap = 'A';
        this.ctodado = 'T';
        this.ctojurdif = 'C';
        this.gruporendas[0] = new Gruporendas();
        this.gruporendas[1] = new Gruporendas();
        this.gruporendas[2] = new Gruporendas();
    }

}
