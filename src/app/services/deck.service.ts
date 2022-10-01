import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { card } from '../interfaces/card';

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  private deck!:card[];
  private card!:card
  

  constructor(private http:HttpClient) {
    this.setDeck();
  }
  
  getOne(){
    //this.card = {suit:"H",value:"A"}
    return this.card; 
  }

  setDeck(){
    this.getAces().subscribe({
      next:(cards:card[]) => {this.deck = cards},
      error:() => {"error al llenar las cartas"}
    })
  }

  getAces(){
    return this.http.get<card[]>("https://633231a73ea4956cfb6e374d.mockapi.io/api/Cards/Card");
  }

  getDeck(){
    return this.deck;
  }
}
