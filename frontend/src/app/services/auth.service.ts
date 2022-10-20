import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from'src/environments/environment';

interface Usuario{
  email:string,
  password:string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  urlApiBase: string= environment.urlTestLogin;

  constructor(private http:HttpClient){

  }

  postLogin(data: Usuario): Observable<any>{

      const url= this.urlApiBase + "api/Usuario";

      const usuario= {
        nombredeUsuario: data.email,
        password:data.password
      }

      const body= JSON.stringify(usuario);

      const headers= {'content-type': 'application/json'}

     return  this.http.post(url, body, {headers:headers});

  }

  //return validateToken()

}
