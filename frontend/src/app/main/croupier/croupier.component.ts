import { Component, OnInit } from '@angular/core';
import { card } from 'src/app/interfaces/card';
import { detail } from 'src/app/interfaces/detail';
import { player } from 'src/app/interfaces/player';
import { DetailService } from 'src/app/services/detail.service';

@Component({
  selector: 'app-croupier',
  templateUrl: './croupier.component.html',
  styleUrls: ['./croupier.component.css']
})
export class CroupierComponent implements OnInit {
  croupier: player = {gameCards: [] as card[]} as player;

  constructor(private detailService: DetailService) { }

  ngOnInit(): void {
  }

  askForCard(gameId:number,card: card) {
    if(typeof card === "undefined"){
      return;
    }
    this.croupier.gameCards.push(card)
    
    this.detailService.create({
      idCard:card.id,
      idGame:gameId,
      isCrupier:true
    } as detail)
  }
  getCroupierCards() {
    return this.croupier.gameCards;
  }

  reset(){
    this.croupier.gameCards = [];
  }
}
