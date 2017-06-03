import { Objeto } from './objeto'
import { Ponto } from './ponto'
import { MatrizHomo } from './matrizHomo'

export class Linha implements Objeto {

    public origem: Ponto;
    public fim: Ponto;
    public readonly path : Path2D;

    constructor(origem : Ponto, path?: Path2D) {
        if (path == undefined)
            this.path = new Path2D();
        else this.path = path

        this.origem = origem;
        this.path.moveTo(this.origem.x, this.origem.y)
    }

    destino(ponto : Ponto) : void {
        this.fim = ponto;
        this.path.lineTo(this.fim.x, this.fim.y)
    }

    draw(context : CanvasRenderingContext2D) {
        context.stroke(this.path)
    }

    get ready(): boolean {
        if (this.fim != undefined)
            return true
        else return false
    }

    get matriz(): MatrizHomo {
        if (this.ready) {
            let matriz = new MatrizHomo(2)

            matriz.addPonto(this.origem)
            matriz.addPonto(this.fim)

            return matriz;
        }
        else throw new Error("Matriz não disponivel")
    }
}
