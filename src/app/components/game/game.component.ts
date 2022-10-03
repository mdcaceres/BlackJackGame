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
import Swal from 'sweetalert2';

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
  playerPoints: number = 0;
  croupierPoints: number = 0;
  private counter: number = 0;
  @ViewChild(PlayerComponent) childPlayer!: PlayerComponent;
  @ViewChild(CroupierComponent) childCroupier!: CroupierComponent;

  constructor(private gameService: GameService) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  
  ngOnInit(): void {
    this.loadDeck();
    this.start();
  }
  ngAfterViewInit() {}

  loadDeck(): void {
    this.sub.add(
      this.gameService.getDeck().subscribe({
        next: (cards: card[]) => {
          for (const card of cards) {
            card.path = '../../assets/Cards/' + card.suite + '-' + card.value + '.png';
          }
          this.deck = this.shuffleArray(cards);
        },
        error: () => {
          alert('error al cargar cartas');
        }
      })
    );
  }

  start(){
    Swal.fire({
      title: 'Are you sure?',
      text: "start a new game",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, lets play it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.sendPlayer();
        this.sendPlayer();
        this.sendCroupier();
      }
    })

  }

  send(): void {
    this.sendPlayer();
    this.sendCroupier(); 

    this.playerPoints = this.gameService.calculatePoints(this.childPlayer.getPlayerCards(),true);
    this.croupierPoints = this.gameService.calculatePoints(this.childCroupier.getCroupierCards(),true);
  }

  sendPlayer(){
    this.counter++;
    let result = this.deck.pop();

    if(result){
      this.cardPlayer = result;
    }
    this.childPlayer.askForCard(this.cardPlayer);  
  }

  sendCroupier():void{
    if(this.counter >= 2){
      let result = this.deck.pop();

      if(result){
        this.cardCroupier = result;
      }
      this.childCroupier.askForCard(this.cardCroupier);
    }
  }

  hold():void{
    if(this.croupierPoints < 17){
      this.sendCroupier();
      this.croupierPoints = this.gameService.calculatePoints(this.childCroupier.getCroupierCards(),true);
    }
    this.playerPoints = this.gameService.calculatePoints(this.childPlayer.getPlayerCards(),true);
    this.croupierPoints = this.gameService.calculatePoints(this.childCroupier.getCroupierCards(),true);
    let result = this.gameService.verifyWinner(this.playerPoints,this.croupierPoints);
    setTimeout((e: any) => {
      if(result){
        Swal.fire(
          'Your are amazing, a real champ 🤴',
          'nice game',
          'success'
        )
      }
      else if(typeof result == null){
        Swal.fire(
          'try again',
          'you and courprie are even',
          'warning'
        )
      } else {
        Swal.fire(
          'try a little harder next time',
          'You lost the game',
          'error'
        )
      }
      }, 1000);
      
  }

  shuffleArray(array:card[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  reset():void{
    this.childCroupier.reset();
    this.childPlayer.reset();
    this.loadDeck();
    this.playerPoints = 0;
    this.croupierPoints = 0; 
  }
  
}
