import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { card } from '../interfaces/card';
import { DeckService } from '../services/deck.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @ViewChild("canvas",{static: true})
  private canvas: ElementRef<HTMLCanvasElement> | undefined; 
  private ctx: CanvasRenderingContext2D | null | undefined;
  private CANVAS_WIDTH: number; 
  private CANVAS_HEIGHT: number; 
  private img!:HTMLImageElement; 
  private img2!:HTMLImageElement;
  private deckOfCards:card[] = [];
  private cardsImages:HTMLImageElement[] = [];


  constructor(private deck : DeckService) {
    this.CANVAS_WIDTH = 500;
    this.CANVAS_HEIGHT = 1000;
    this.img = new Image();
    this.img.src = "./assets/perro.jpg"
    //this.img2 = this.getCard();
   }

  ngOnInit(): void {
    this.deck.getAces().subscribe({
      next:(cards:card[]) => {
        for(const card of cards){
          const n = new Image();
          n.src = "./assets/Cards/"+card.suite+"-"+card.value+".png";
          //this.cardsImages.push(n);
          card.image = n;
        }
        this.deckOfCards = cards;
      },
      error:() => {alert("error al cargar cartas")}
    })
    console.log("decks ->")
    console.log(this.deckOfCards)
    //let card = this.deck.getFirst();
    this.ctx = this.canvas!.nativeElement.getContext('2d');
    setTimeout((e: any) => {console.log(this.deckOfCards); console.log(this.deckOfCards[1]); this.animate()}, 1000);;
    //this.animate();
    //this.animate();
  }

  // card = {
  //   x: 10,
  //   y: 10, 
  //   width: 100, 
  //   height: 100
  // }

  animate(){  
    //setTimeout((e: any) => {
      for(let i = 0; i < 1; i++){
        this.ctx!.drawImage(this.deckOfCards[i].image,0,0);
      }
   // }, 1000);
  }

  // getCard(){
  //   const card = this.deck.getOne();
  //   const img = new Image();
  //   img.src = "./assets/Cards/"+card.suit+"-"+card.value+".png";
  //   //img.src="./assets/perro.jpg"
  //   //C:\Users\mdcac\Desktop\Angular(DABD)\BlackJackGame\src\app\table
  //   //C:\Users\mdcac\Desktop\Angular(DABD)\BlackJackGame\src\assets\H-A.png
  //   //console.log("./assets/Cards/"+card!.toString()+".png");
  //   return img;
  // }

  // getCardImg(card:card){
  //   //const card = this.deck.getOne();
  //   const img = new Image();
  //   img.src = "./assets/Cards/"+card.suit+"-"+card.value+".png";
  //   //img.src="./assets/perro.jpg"
  //   //C:\Users\mdcac\Desktop\Angular(DABD)\BlackJackGame\src\app\table
  //   //C:\Users\mdcac\Desktop\Angular(DABD)\BlackJackGame\src\assets\H-A.png
  //   //console.log("./assets/Cards/"+card!.toString()+".png");
  //   return img;
  // }

}
