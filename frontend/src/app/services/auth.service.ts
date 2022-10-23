import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from'src/environments/environment';
import { playerLogin, playerRegister} from '../interfaces/player';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   url: string= environment.urlAPI;

  constructor(private http:HttpClient){

  }

  postLogin(data: playerLogin): Observable<any>{

      const url= this.url + "players/login";

      const usuario= {
        email: data.email,
        password:data.password
      }

      const body= JSON.stringify(usuario);

      const headers= {'content-type': 'application/json'}

     return  this.http.post(url, body, {headers:headers});

  }

  postRegister(data: playerRegister): Observable<any>{

    const url= this.url + "players/register";

    const usuario= {
      name:data.username,
      email: data.email,
      password:data.password
    }

    const body= JSON.stringify(usuario);

    const headers= {'content-type': 'application/json'}

   return  this.http.post(url, body, {headers:headers});

}

}
