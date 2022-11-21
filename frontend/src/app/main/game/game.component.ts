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
import { Game } from 'src/app/interfaces/game';
import { GameService } from 'src/app/services/game.service';
import { CroupierComponent } from '../croupier/croupier.component';
import { PlayerComponent } from '../player/player.component';
import Swal from 'sweetalert2';
import { DetailService } from 'src/app/services/detail.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit, OnDestroy, AfterViewInit {
  private id: number = 0; // asignar con el loby o por la ruta
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
    private gameService: GameService,
    private detailService: DetailService,
    private root: ActivatedRoute,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.root.params.subscribe({
      next: (params) => {
        let id = params['id'];
        if (id) {
          this.id = id;
        }
      }
    });
    this.loadDeck();   
  }
  ngAfterViewInit() {}

  loadDeck(): void {
    this.sub.add(
      this.gameService.getDeck().subscribe({
        next: (cards) => {
          for (const card of cards.data) {
            card.path =
              './assets/Cards/' + card.suite + '-' + card.value + '.png';
          }
          this.deck = this.shuffleArray(cards.data);
          this.start(this.id);          
        },
        error: () => {
          alert('error al cargar cartas');
        },
      })
    );
  }

  start(id?: number) {
    if (id !== 0) {
      //cargar partida en curso
      this.detailService.getGameDetail(this.id).subscribe({
        next: (resp) => {
          for (const detail of resp.data.gameDetails) {
            if (detail.isCroupier) {
              //cargar carta a croupier
              this.sendCroupierCardById(detail.idCard);
            } else {
              //cargar carta a jugador
              this.sendPlayerCardById(detail.idCard);
            }
          }
          this.updatePlayersPoints();
          if ((this.playerPoints >= 21)) {
            this.hold();
          }
        },
      });
    } else {
      //nueva partida
      let idPlayer = parseInt(localStorage.getItem('id')!);
      let game = {
        idResultType: 1,
        idPlayer: idPlayer,
      } as Game;
      this.gameService.createGame(game).subscribe({
        next: (resp) => {
          this.id = resp.data.idGame;
        },
      });
      Swal.fire({
        title: 'Empezar',
        text: '',
        icon: 'info',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Juguemos',
      })
        .then((result) => {
          if (result.isConfirmed) {
            this.firstHand();
          }
        })
        .then(() => {
          this.updatePlayersPoints();
        });
    }
  }

  checkPointsOverflow() {
    if (this.playerPoints > 21 && this.playerPoints > this.croupierPoints) {
      this.gameService.updateGameResult(this.id, 3, this.playerPoints,this.croupierPoints).subscribe({
        next: () =>{

        },
        complete: () =>{
          setTimeout((e: any) => {
            this.resetWithMessage(
              'Te pasaste de 21! Suerte la proxima',
              'La Casa Gana',
              'error'
            );
          }, 1500);
        }
      });
     
    }
    else{
      this.gameService.updateGameResult(this.id, 2, this.playerPoints,this.croupierPoints).subscribe({
        next: () => {

        },
        complete: () => {
          setTimeout((e: any) => {
            this.resetWithMessage(
              'Ganaste! La casa se paso de 21 🤴',
              'Buen juego',
              'success'
            );
          }, 1500);
        }
      });
      
    }
  }

  firstHand(): void {
    this.sendPlayer();
    this.sendPlayer();
    this.sendCroupier();
  }

  send(): void {
    this.updatePlayersPoints();
    if(this.playerPoints < 21){
      this.sendPlayer();
      this.updatePlayersPoints();
    }

    if ((this.playerPoints >= 21)) {
      this.hold();
    }
  }

  updatePlayersPoints(): void {
    this.playerPoints = this.gameService.calculatePoints(
      this.childPlayer.getPlayerCards()
    );
    this.croupierPoints = this.gameService.calculatePoints(
      this.childCroupier.getCroupierCards()
    );
  }

  sendPlayer() {
    this.counter++;
    let result = this.deck.pop();

    if (result) {
      this.cardPlayer = result;
    }
    this.childPlayer.askForCard(this.id, this.cardPlayer);
  }

  sendPlayerCardById(cardId: number) {
    this.counter++;
    let specificCard = this.deck.find((x) => x.id === cardId)!;
    this.childPlayer.saveCard(specificCard);
  }

  sendCroupierCardById(cardId: number) {
    let specificCard = this.deck.find((x) => x.id === cardId)!;
    this.childCroupier.saveCard(specificCard);
  }

  sendCroupier(): void {
    if (this.counter >= 2) {
      let result = this.deck.pop();

      if (result) {
        this.cardCroupier = result;
      }
      this.childCroupier.askForCard(this.id, this.cardCroupier);
    }
  }

  hold(): void {
    this.updatePlayersPoints();

    while (this.croupierPoints < 17) {
      this.sendCroupier();
      this.croupierPoints = this.gameService.calculatePoints(
        this.childCroupier.getCroupierCards()
      );
      if (this.croupierPoints > 21) {
        this.checkPointsOverflow();
        return;
      }
    }    

    let win = this.gameService.verifyWinner(
      this.playerPoints,
      this.croupierPoints
    );
    let result = win === null ? 4 : win ?  2: 3;

    this.gameService.updateGameResult(this.id,result, this.playerPoints,this.croupierPoints).subscribe({
      next: resp =>{
      },
      complete: () =>{
        setTimeout((e: any) => {
          if (win == true) {
            Swal.fire('Ganaste! 🤴', 'Buen juego', 'success').then(()=> {
              this.reset();
            });            
          } else if (win === null) {
            Swal.fire('Intenta de nuevo', 'Empataste con el croupier', 'warning').then(()=> {
              this.reset();
            });            
          } else {
            Swal.fire('Perdiste', 'La Casa Gana', 'error').then(()=> {
              this.reset();
            });            
          }
          
        }, 1500);
      }
    });

    
  }

  shuffleArray(array: card[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  reset(): void {
    this.router.navigateByUrl('/main');
    //Swal.fire('Nuevo Juego ⚔️')
    // this.playerPoints = 0;
    // this.croupierPoints = 0;
    
    // this.childCroupier.reset();
    // this.childPlayer.reset();

    // this.loadDeck();
    // this.firstHand();
    // this.updatePlayersPoints();
  }

  resetWithMessage(
    message: string,
    content: string,
    messagetype: string | any
  ): void {
    Swal.fire(message, content, messagetype).then(()=>{
      this.reset();
    });
    // this.playerPoints = 0;
    // this.croupierPoints = 0;
    // this.childCroupier.reset();
    // this.childPlayer.reset();
    // this.loadDeck();
    // this.firstHand();
    // this.updatePlayersPoints();
    
  }
}
