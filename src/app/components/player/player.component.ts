import { Component, OnInit } from '@angular/core';
import { card } from 'src/app/interfaces/card';
import { player } from 'src/app/interfaces/player';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent implements OnInit {
  player: player= { gameCards: [] as card[]} as player;
  constructor() {
  }

  ngOnInit(): void {}

  askForCard(card: card) {
    if(typeof card === "undefined"){
      return;
    }
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
