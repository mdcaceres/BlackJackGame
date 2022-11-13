import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
 
  data1 :any[]=[]
  data2 :any={};
  data3 : any[]=[]


  constructor(private apiReportes: ReportService) { 

     this.data1=this.apiReportes.getReporte1();
     this.data2=this.apiReportes.getReporte2();
     this.data3=this.apiReportes.getReporte3();
  }

  ngOnInit(): void {
     
  }
  
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      }
    }
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [ [ 'Casa Gana' ], [ 'Jugador Gana' ]],
    datasets: [ {
      data: [ 300, 500 ]  //Obtenemos de acá el primer reporte
    } ]
  };
  public pieChartType: ChartType = 'pie';

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: {
        display: true,
      }
    }
  };
  
  public barChartType: ChartType = 'bar';
  public barChartData: ChartData<'bar'> = {
    labels: [ '07/11', '08/11', '09/11', '10/11', '11/11', '12/11', '13/11' ],
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Jugadores' },
      { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Juegos' }
    ]
  };  

  public doughnutChartLabels: string[] = [ 'Black Jacks Jugadores', 'Black Jacks Casa' ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [ 350, 450] }, //3er reporte
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';
}
