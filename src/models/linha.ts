import { Ponto } from '../ponto'
import { MatrizHomo } from '../utils/matrizHomo'
import { Objeto } from '../objeto'

export class Linha extends Objeto{

    public origem: Ponto;
    public fim: Array<Ponto> = [];
    readonly name : string = "Linha"

    constructor(origem : Ponto, path: Path2D = new Path2D()) {
        super()
        this.path = path;
        this.origem = origem;
        this.seqExec = [this.destino]
        this.path.moveTo(this.origem.x, this.origem.y)
    }

    destino(ponto : Ponto) : void {
        this.fim.push(ponto);
        this.path.lineTo(ponto.x, ponto.y)
    }

    draw(context : CanvasRenderingContext2D, strokeStyle : string = "black") {
        context.strokeStyle = strokeStyle;
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
            this.fim.forEach((ponto : Ponto) => {
                matriz.addPonto(ponto)
            })

            return matriz;
        }
        else throw new Error("Matriz não disponivel")
    }
}
