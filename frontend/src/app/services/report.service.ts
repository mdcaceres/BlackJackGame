import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private _reporte1=[300,500]
  
  private _reporte2={dias:['07/11', '08/11', '09/11', '10/11', '11/11', '12/11', '13/11']
                     ,jugadores:[ 65, 59, 80, 81, 56, 55, 40 ],
                         juegos:[ 28, 48, 40, 19, 86, 27, 90 ]}

  private _reporte3=[350, 450]

  constructor() { }

  getReporte1(){
    return this._reporte1;
  }

  getReporte2(){
    return this._reporte2;
  }

  getReporte3(){
    return this._reporte3;
  }
  
}
