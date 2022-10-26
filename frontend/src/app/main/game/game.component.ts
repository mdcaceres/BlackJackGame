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
import { DetailService } from 'src/app/services/detail.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit, OnDestroy, AfterViewInit {
  private id : number = 0; // asignar con el loby o por la ruta 
  private deck: card[] = [];
  private sub: Subscription = new Subscription();
  private cardPlayer: card = {} as card;
  private cardCroupier: card = {} as card;
  playerPoints: number = 0;
  croupierPoints: number = 0;
  private counter: number = 0;
  @ViewChild(PlayerComponent) childPlayer!: PlayerComponent;
  @ViewChild(CroupierComponent) childCroupier!: CroupierComponent;

 
  constructor(
    private gameService: GameService) {}

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
            card.path = 'src/assets/Cards' + card.suite + '-' + card.value + '.png';
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
      title: 'Comenzar un nuevo juego',
      text: "",
      icon: 'info',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Juguemos'
    }).then((result) => {
      if (result.isConfirmed) {
        this.firstHand();
      }
    }).then(()=>{this.updatePlayersPoints()})
  }

  checkPointsOverflow(){
    if(this.playerPoints > 21){
      setTimeout((e: any) => {this.resetWithMessage('Te pasaste de 21! Suerte la proxima',
      'La Casa Gana',
      'error' );}, 1500);
    }
    if(this.croupierPoints > 21){
      setTimeout((e: any) => {this.resetWithMessage('Ganaste! La casa se paso de 21 🤴',
      'Buen juego',
      'success');}, 1500);
      
    }
  }

  firstHand():void{
    this.sendPlayer();
    this.sendPlayer();
    this.sendCroupier();
  }



  send(): void {
    this.sendPlayer();
    this.updatePlayersPoints();
    if(this.playerPoints=21){
      this.hold();
    }
  }

  updatePlayersPoints():void{
    this.playerPoints = this.gameService.calculatePoints(this.childPlayer.getPlayerCards(),true);
    this.croupierPoints = this.gameService.calculatePoints(this.childCroupier.getCroupierCards(),true);
    //setTimeout((e: any) => {this.checkPointsOverflow()}, 1500);
  }

  sendPlayer(){
    this.counter++;
    let result = this.deck.pop();

    if(result){
      this.cardPlayer = result;
    }
    this.childPlayer.askForCard(this.id,this.cardPlayer);  
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
    while(this.croupierPoints < 17){
      this.sendCroupier();
      this.croupierPoints = this.gameService.calculatePoints(this.childCroupier.getCroupierCards(),true);
      if(this.croupierPoints>21){
        this.checkPointsOverflow();
        return;
      }
    }
    this.updatePlayersPoints();

    let win = this.gameService.verifyWinner(this.playerPoints,this.croupierPoints);
    
    setTimeout((e: any) => {
      if(win == true){
        Swal.fire(
          'Ganaste! 🤴',
          'Buen juego',
          'success'
        )
        this.reset();
      }
      else if( win === null){
        Swal.fire(
          'Intenta de nuevo',
          'Empataste con el croupier',
          'warning'
        )
        this.reset();
      }else{
        Swal.fire(
          'Perdiste',
          'La Casa Gana',
          'error'
        )
        this.reset();
      }
      }, 1700);
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
    //Swal.fire('Nuevo Juego ⚔️')
    this.playerPoints = 0;
    this.croupierPoints = 0;
    this.childCroupier.reset();
    this.childPlayer.reset();
    this.loadDeck();
    this.firstHand();
    this.updatePlayersPoints();
  }

  resetWithMessage(message:string, content:string, messagetype:string |any):void{
    Swal.fire(message,content,messagetype);
    this.playerPoints = 0;
    this.croupierPoints = 0;
    this.childCroupier.reset();
    this.childPlayer.reset();
    this.loadDeck();
    this.firstHand();
    this.updatePlayersPoints();
    this.reset();
  }
  
}
