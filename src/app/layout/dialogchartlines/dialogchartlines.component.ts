import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-dialogchartlines',
    templateUrl: './dialogchartlines.component.html',
    styleUrls: ['./dialogchartlines.component.scss']

})

export class DialogChartLinesComponent implements OnInit {
    // lineChart
    lineChartData: Array<any> = [
        { data: [], label: 'Capital' },
        { data: [], label: 'Juros' },
        { data: [], label: 'Valor' }
    ];
    lineChartLabels: Array<any> = [];
    public lineChartOptions: any = {
        responsive: true
    };

    closeResult: string;
    dialogChartLines: any;


    public lineChartColors: Array<any> = [
        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        { // dark grey
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];
    public lineChartLegend = true;
    public lineChartType = 'line';

    constructor(
        public dialogRef: MatDialogRef<DialogChartLinesComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
            this.lineChartData = this.data.lineChartData;
            this.lineChartLabels = this.data.lineChartLabels;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
