import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { card } from '../interfaces/card';
import { Game } from '../interfaces/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
 
   apiUrl=environment.url;

  constructor(private http:HttpClient) { }

  getDeck():Observable<card []>{
    const url= this.apiUrl;
    const headers={'content-type':'json/application'}
    return this.http.get<card[]>(url, {headers:headers})

  }

  verifyWinner(pointsPlayer:number, pointsCroupier:number){

    let playerWin= null;

    const pPlayer=pointsPlayer;
    const pCroupier=pointsCroupier;
    
    if(pPlayer>21 || pCroupier> pPlayer){
      //player perdio
      playerWin=false;
    }
    else if(pPlayer > pCroupier && pPlayer<=21 || pCroupier>21){
       //player win
       playerWin=true;
    }
    else if (pPlayer == pCroupier ) {
      playerWin=null;
    }

    return playerWin;

  }

  //dieces, jotas, reinas y reyes tienen un valor de 10 cada una
  //ases pueden tener dos valores diferentes: uno u once
calculatePoints(deck: card[], asValue: boolean):number{
  console.log(deck); 
  
    const deckCards :card[]=deck; 
    let points:number =0;
    let asCard:number= asValue? 11:1;
    
   for (const card of deckCards) {

       if(card.value == 'J' || card.value == 'Q' || card.value == 'K'){
        points += 10
       }
       else if(card.value == 'A'){
        points += asCard
       }
       else{
        points += Number(card.value)
       }
   }
   return points;
  }
  getGames():Observable<any>{
    //const url= environment.urlAPI + 'games';
    const url='http://localhost:7466/api/games';
    const headers={'content-type':'json/application'}
    return this.http.get(url, {headers:headers})

  }
}
