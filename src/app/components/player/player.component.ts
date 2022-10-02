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
  constructor() {
    this.player = {} as player;
    this.croupier = {} as player;
  }

  ngOnInit(): void {}

  askForCard(card: card, isCroupier: boolean) {
    isCroupier
      ? this.croupier.gameCards.push(card)
      : this.player.gameCards.push(card);
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
