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
        this.seqExec = [this.destino]
        this.ori(origem)
    }

    ori(ponto : Ponto = this.origem) {
        this.path = new Path2D()
        this.origem = ponto
        this.path.moveTo(ponto.x, ponto.y)
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
        if (this.fim.length > 0)
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

    set matriz(matriz : MatrizHomo) {
        if (matriz.n != 2)
            throw new Error("Matriz invalida")
        // this.origem = matriz.getPonto(0)
        this.fim = []
        this.ori(new Ponto(matriz.get(0, 0), matriz.get(1, 0)))

        // this.destino(matriz.getPonto(1))
        this.destino(new Ponto(matriz.get(0, 1), matriz.get(1, 1)))
    }
}
