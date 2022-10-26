export interface card{
    id:number;
    suite: string;
    value: string;
    position?:{x:number,y:number}; 
    image:HTMLImageElement;
    path: string;
}