

export class SimulacaoRescisao {

        public data: Date;
        public contrato: number;
        public ctotipo: string;
        public cliente: string;
        public datarescisao: Date;
        public valortotal: number;
        public rescisaocomiva: number;
        public rescisaosemiva: number;
        public jurosmora: number;
        public debitosatraso: number;
        public despesasciva: number;
        public caucao: number;
        public proximarenda: Date;
        public valorseguro: number;
        public capital: number;
        public juro: number;

    constructor( ) {
        this.data = new Date();
        this.ctotipo = '';
        this.cliente = '';

    }

}
