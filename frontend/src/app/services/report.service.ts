import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private apiUrl= environment.urlAPI;

  constructor(private http:HttpClient) { }

  getReporte1():Observable<any>{
    return this.http.get(`${this.apiUrl}reports/1`)
   
  }

  getReporte2():Observable<any>{
    return this.http.get(`${this.apiUrl}reports/2`)
  }

  getReporte3():Observable<any>{
    return this.http.get(`${this.apiUrl}reports/3`)
  }
  
}
