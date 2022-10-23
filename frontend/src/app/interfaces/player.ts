import { card } from "./card";

export interface player {
    id:number,
    name: string,
    gameCards: card[],
    isCroupier: boolean,
    points: number
}

export interface playerLogin{
    email:string,
    password:string
}

export interface playerRegister{
    username:string,
    email:string,
    password:string
  
}
