import { Component, OnInit } from '@angular/core';
import { card } from 'src/app/interfaces/card';
import { player } from 'src/app/interfaces/player';

@Component({
  selector: 'app-croupier',
  templateUrl: './croupier.component.html',
  styleUrls: ['./croupier.component.css']
})
export class CroupierComponent implements OnInit {
  croupier: player = {gameCards: [] as card[]} as player;
  constructor() { }

  ngOnInit(): void {
  }

  askForCard(card: card) {
    if(typeof card === "undefined"){
      return;
    }
    this.croupier.gameCards.push(card)
  }
  getCroupierCards() {
    return this.croupier.gameCards;
  }
}
