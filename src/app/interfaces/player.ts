import { card } from "./card";

export interface player {
    id:number,
    name: string,
    gameCards: card[],
    isCroupier: boolean,
    points: number
}