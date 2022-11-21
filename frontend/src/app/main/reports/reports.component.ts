import { DatePipe } from '@angular/common';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { Reporte1 } from 'src/app/interfaces/report1';
import { Reporte2 } from 'src/app/interfaces/report2';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {
  data1: Reporte1 = {} as Reporte1;
  data2: Reporte2[] = [];
  data3: any[] = [];

  constructor(private apiReportes: ReportService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.loadReports();
  }
  ngAfterViewInit() {}

  loadReports() {
    this.apiReportes.getReporte1().subscribe({
      next: (resp) => {
        this.data1 = resp.data[0];
        this.data1.victoriasJugador =
          this.data1.totalJuegos - this.data1.victoriasCroupier;
        this.loadReport1(this.data1);
      },
      error: (err) => {
        console.log('Error report1: ', err);
      },
    });

    this.apiReportes.getReporte2().subscribe({
      next: (resp) => {
        resp.data.forEach((data: Reporte2) => {
          this.data2.push({date: this.datePipe.transform(data.date,'dd/MM')!, cantidadJuegos: data.cantidadJuegos, cantidadJugadores: data.cantidadJugadores})
        });
        this.loadReport2(this.data2);
      },
      error: (err) => {
        console.log('Error report2: ', err);
      },
    });

    this.apiReportes.getReporte3().subscribe({
      next: (resp) => {
        this.data3 = resp.data;
      },
      error: (err) => {
        console.log('Error report3: ', err);
      },
    });
  }

  loadReport1(data: any) {
    this.pieChartData = {
      ...this.pieChartData,
      datasets: [
        {
          ...this.pieChartData.datasets[0],
          data: [data.victoriasCroupier, data.victoriasJugador],
        },
      ],
    };
  }

  loadReport2(data: any) {
    this.barChartData = {
      ...this.barChartData,
      labels: data.map((x: any) => x.date),
      datasets: [
        {
          ...this.barChartData.datasets[0],
          data: data.map((x: any) => x.cantidadJugadores),
        },
        {
          ...this.barChartData.datasets[1],
          data: data.map((x: any) => x.cantidadJuegos),
        },
      ],
    };
  }

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [['Casa Gana'], ['Jugador Gana']],
    datasets: [
      {
        data: [],
      },
    ],
  };
  public pieChartType: ChartType = 'pie';

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  public barChartType: ChartType = 'bar';
  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Jugadores' },
      { data: [], label: 'Juegos' },
    ],
  };

  public doughnutChartLabels: string[] = [
    'Black Jacks Jugadores',
    'Black Jacks Casa',
  ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [350, 450] }, //3er reporte
    ],
  };
  public doughnutChartType: ChartType = 'doughnut';
}
