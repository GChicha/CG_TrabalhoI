import { MatrizHomo } from './utils/matrizHomo'
import { Ponto } from './ponto'
import { Linha } from './models/linha'

export abstract class Objeto {
    readonly name : string = "Objeto"

    protected linhas : Array<Linha> = [];
    
    matriz : MatrizHomo;

    protected path : Path2D;
    readonly ready : boolean;

    origem : Ponto;

    protected seqExec : Array<(ponto : Ponto) => void>;
    private indexConstr : number = 0;

    constructor() {
    }

    get next() : (ponto : Ponto) => void {
        return (this.hasNext) ? this.seqExec[this.indexConstr++] : undefined;
    }

    get hasNext() : boolean{
        return (this.seqExec[this.indexConstr] == undefined) ? false : true; 
    }
    
    draw(context : CanvasRenderingContext2D, strokeStyle : string = "black") {
        this.linhas.forEach((linha : Linha) => {
            linha.draw(context, strokeStyle)
        })
        this.path.closePath()
    }

    mark(context : CanvasRenderingContext2D) {
        this.draw(context, "blue")
    }

    unMark(context : CanvasRenderingContext2D) {
        this.draw(context, "black")
    }
}
