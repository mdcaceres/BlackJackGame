import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { detail } from '../interfaces/detail';

@Injectable({
  providedIn: 'root'
})
export class DetailService {

  constructor(private http : HttpClient) { }

  create(detail:detail):Observable<detail>{
    return this.http.post<detail>('....',detail); 
  }
}
