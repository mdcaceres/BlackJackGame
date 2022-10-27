import { Component, OnInit } from '@angular/core';
import { card } from 'src/app/interfaces/card';
import { detail } from 'src/app/interfaces/detail';
import { player } from 'src/app/interfaces/player';
import { DetailService } from 'src/app/services/detail.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent implements OnInit {

  player: player= { gameCards: [] as card[]} as player;
  constructor(
    private detailService: DetailService) {
  }

  ngOnInit(): void {}

  askForCard(gameId:number,card: card) {
    if(typeof card === "undefined"){
      return;
    }
    this.player.gameCards.push(card);
    
    this.detailService.create({
      idCard:card.id,
      idGame:gameId,
      isCrupier:false
    } as detail).subscribe({
      next: resp =>{
        
      }
    });
  }

  saveCard(card: card){
    this.player.gameCards.push(card);
  }

  stopPlaying() {
    return {
      playerCards: this.player.gameCards
    };
  }

  getPlayerCards() {
    return this.player.gameCards;
  }

  reset(){
    this.player.gameCards = [];
  }
  
}
