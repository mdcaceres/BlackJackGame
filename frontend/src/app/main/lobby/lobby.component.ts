import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/interfaces/game';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit, OnDestroy {
  private sub: Subscription = new Subscription();

  games?: Game[];
   even = (game: Game) => game.idResultType == 1;

  PendingGame?: boolean
  pendingId?: number
  constructor(private router: Router, private gameService:GameService) { }

  ngOnInit(): void {
    this.loadGames();
    console.log(this.games);
    this.PendingGame=this.games?.some(this.even);
    if(this.PendingGame){
       this.pendingId = (this.games?.find(game => game.idResultType == 1))?.id;
    }
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  
  NewGame(){
    this.router.navigateByUrl('main/game');
  }
  ContinueGame(){
    this.router.navigateByUrl('main/game/' + this.pendingId );
  }
  loadGames(): void {
    this.sub.add(
      this.gameService.getGames().subscribe({
        next: (games: Game[]) => {
          this.games=games;
        },
        error: () => {
          alert('error al cargar el historial');
        }
      })
    );
  }
}
