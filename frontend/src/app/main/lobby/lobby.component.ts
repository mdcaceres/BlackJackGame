import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/interfaces/game';
import { AuthService } from 'src/app/services/auth.service';
import { GameService } from 'src/app/services/game.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit, OnDestroy {
  private sub: Subscription = new Subscription();

  games?: Game[];
  even = (game: Game) => game.result === "pending";
  id!: number;
  PendingGame?: boolean
  pendingId?: number
  constructor(private router: Router, private gameService:GameService,private authService:AuthService) { }

  ngOnInit(): void {
    this.id= parseInt(localStorage.getItem('id')!);
    this.loadGames();
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  logout(){
    this.authService.logout();
    this.router.navigateByUrl('auth')
  }
  
  NewGame(){
    if(this.PendingGame){    
       Swal.fire({
         title: "Partida pendiente",
         text: "Se dara perdida la partida en curso, desea continuar?",
         icon: 'warning',
         showCancelButton: true,
         confirmButtonText: "Confirmar",
         cancelButtonText: "Cancelar",
          })
          .then(resultado => { 
          if (resultado.value) {
                                            //Juego perdido id:
           this.gameService.updateGameResult(this.pendingId!,3).subscribe({
            next:(response)=>{
              console.log('Se carga estado perdido', response)
              this.router.navigateByUrl('main/game');
            },
            error:(err)=>{
              console.log('Error al borrar el juego', err)
            }})
        } 
        else {
        console.log("*NO se cambia estado");
      }
     });
    }
    else{
      this.router.navigateByUrl('main/game');
    }

  }
  ContinueGame(){
    this.router.navigateByUrl('main/game/' + this.pendingId );
  }
  loadGames(): void {
    this.sub.add(
      this.gameService.getGames().subscribe({
        next: (response) => {
          console.log(response)
          let id = this.id;
          this.games = response.data.filter((x:Game) => {
            return x.idPlayer === id;
          });
          console.log(this.games)
        },
        error: () => {
          alert('error al cargar el historial');
        },
        complete:()=>{
          this.PendingGame=this.games?.some(this.even);
          if(this.PendingGame){
            this.pendingId = (this.games?.find(game => game.result === 'pending'))?.gameID;
         }
        }
      })
    );
  }
}
