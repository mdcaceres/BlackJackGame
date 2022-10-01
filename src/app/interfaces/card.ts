export interface card{
    suit: string;
    value: string;
    position?:{x:number,y:number}; 
    image:HTMLImageElement;
}