import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { card } from '../interfaces/card';

@Injectable({
  providedIn: 'root'
})
export class GameService {
/*
  cartas:card[]=  [{suit:"S",value:"A"},{suit:"S",value:"2"},{suit:"S",value:"3"},
                         {suit:"S",value:"4"},{suit:"S",value:"5"},{suit:"S",value:"6"},
                         {suit:"S",value:"7"},{suit:"S",value:"J"}];*/
 
   apiUrl=environment.url

  constructor(private http:HttpClient) { }

  getDeck():Observable<card []>{
    const url= this.apiUrl;
    const headers={'content-type':'json/application'}
    return this.http.get<card[]>(url, {headers:headers})

  }

  getWinner(pointsPlayer:number, pointCroupier:number){
     //pp >=21?
    /*verificación de la jugada, que podrá ser ejecutada cuando el jugador desee plantarse 
      o si el jugador tiene más de 21 puntos. En ella se deben generar el juego del croupier
     para saber si el usuario ganó o perdió.
     Por último, mostrar un mensaje en pantalla y reiniciar el juego.*/
 
  }
  //En el blackjack, las cartas de dieces, jotas, reinas y reyes tienen un valor de 10 cada una.
  //Los ases pueden tener dos valores diferentes: uno u once
calculatePoints(deck: card[], asValue: boolean):number{
  
    const deckCards :card[]=deck; 
    let points:number =0;
    let asCard:number= asValue? 11:1;
    
   for (const card of deckCards) {

       if(card.value == 'J' || card.value == 'Q' || card.value == 'K'){
        points += 10;
        break;
       }
       if(card.value == 'A'){
        points += asCard
       }
       else{
        points += Number(card.value)
       }
   }
   return points;
  }

}
