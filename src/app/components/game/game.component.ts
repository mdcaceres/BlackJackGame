import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { card } from 'src/app/interfaces/card';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit,OnDestroy {

  private deck:card[] = [];
  private sub: Subscription = new Subscription();
  @Output() onSend = new EventEmitter<card>();

  constructor(private gameService:GameService) { }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.loadDeck();
  }

  loadDeck():void{
    this.sub.add(
      this.gameService.getDeck().subscribe({
      next:(cards:card[]) => {
        for(const card of cards){
          const n = new Image();
          n.src = "./assets/Cards/"+card.suit+"-"+card.value+".png";
          card.image = n;
        }
        this.deck = cards;
      },
      error:() => {alert("error al cargar cartas")}
    })
    )
  }

  send():void{
    let card = this.deck.pop() 
    this.onSend.emit(card);
    console.log(card);
  }
}
