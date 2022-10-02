import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { card } from 'src/app/interfaces/card';
import { GameService } from 'src/app/services/game.service';
import { CroupierComponent } from '../croupier/croupier.component';
import { PlayerComponent } from '../player/player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit, OnDestroy, AfterViewInit {
  private deck: card[] = [];
  private sub: Subscription = new Subscription();
  private cardPlayer: card = {} as card;
  private cardCroupier: card = {} as card;
  private counter: number = 0;
  @ViewChild(PlayerComponent) childPlayer!: PlayerComponent;
  @ViewChild(CroupierComponent) childCroupier!: CroupierComponent;

  constructor(private gameService: GameService) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  
  ngOnInit(): void {
    this.loadDeck();
  }
  ngAfterViewInit() {}

  loadDeck(): void {
    this.sub.add(
      this.gameService.getDeck().subscribe({
        next: (cards: card[]) => {
          for (const card of cards) {
            // const n = new Image();
            // n.src = '../../assets/Cards/' + card.suite + '-' + card.value + '.png';
            // card.image = n;
            card.path = '../../assets/Cards/' + card.suite + '-' + card.value + '.png';
          }
          this.deck = cards;
        },
        error: () => {
          alert('error al cargar cartas');
        },
      })
    );
  }

  send(): void {
    this.counter++;
    let result = this.deck.pop();

    if(result){
      this.cardPlayer = result;
    }

    this.childPlayer.askForCard(this.cardPlayer);   

    if(this.counter >= 2){
      let result = this.deck.pop();

      if(result){
        this.cardCroupier = result;
      }
      this.childCroupier.askForCard(this.cardCroupier);
    }
  }
}
