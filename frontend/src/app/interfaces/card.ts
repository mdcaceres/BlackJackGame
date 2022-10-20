export interface card{
    suite: string;
    value: string;
    position?:{x:number,y:number}; 
    image:HTMLImageElement;
    path: string;
}