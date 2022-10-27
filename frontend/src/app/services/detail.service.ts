import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { detail } from '../interfaces/detail';

@Injectable({
  providedIn: 'root'
})
export class DetailService {

  apiUrl = environment.urlAPI; 

  constructor(private http : HttpClient) { }

  create(detail:detail):Observable<detail>{
    return this.http.post<detail>(`${this.apiUrl}games/${detail.idGame}/details`,{
    idCard:detail.idCard,
    isCroupier:detail.isCrupier
    }); 
  }
  getGameDetail(idGame: number): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}games/${idGame}`);
  }
}
