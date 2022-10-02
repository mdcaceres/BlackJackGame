import { Component, OnInit } from '@angular/core';
import { card } from 'src/app/interfaces/card';
import { player } from 'src/app/interfaces/player';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent implements OnInit {
  player: player;
  croupier: player;
  counter: number = 0;
  constructor() {
    this.player = { gameCards: [] as card[]} as player;
    this.croupier = {gameCards: [] as card[]} as player;
  }

  ngOnInit(): void {}

  askForCard(card: card, isCroupier: boolean) {
    if(typeof card === "undefined"){
      return;
    }
    console.log(card);
    isCroupier
      ? this.croupier.gameCards.push(card)
      : this.player.gameCards.push(card);

    console.log(this.player.gameCards)
    console.log(this.player.gameCards[0].image)
    this.counter++;
  }

  stopPlaying() {
    return {
      playerCards: this.player.gameCards,
      croupierCards: this.croupier.gameCards,
    };
  }

  getPlayerCards() {
    return this.player.gameCards;
  }
  getCroupierCards() {
    return this.croupier.gameCards;
  }
}
