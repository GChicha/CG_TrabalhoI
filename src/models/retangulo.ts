import { Ponto } from './ponto'
import { Objeto } from './objeto'
import { Linha } from './linha'
import { MatrizHomo } from './matrizHomo'

export class Retangulo implements Objeto {
    public readonly path : Path2D
    private linhas : Array<Linha> = [];

    constructor(ponto : Ponto, path? : Path2D) {
        if (path == undefined)
            this.path = new Path2D();
        else this.path = path

        this.linhas.push(new Linha(ponto))
    }

    get ready() {
        if (this.linhas.length == 4)
            return true;
        else return false;
    }

    marcaPonto2(ponto : Ponto) {
        let pontoInter1 = new Ponto(this.linhas[0].origem.x, ponto.y)
        let pontoInter2 = new Ponto(ponto.y, this.linhas[0].origem.x)

        this.linhas[0].destino(new Ponto(this.linhas[0].origem.x, ponto.y))
        
        this.linhas.push(new Linha(this.linhas[0].fim))
        this.linhas[1].destino(ponto)

        this.linhas.push(new Linha(ponto))
        this.linhas[2].destino(new Ponto(this.linhas[1].fim.x, this.linhas[0].origem.y))

        this.linhas.push(new Linha(this.linhas[2].fim))
        this.linhas[3].destino(this.linhas[0].origem)
    }

    draw(context : CanvasRenderingContext2D) {
        this.linhas.forEach((linha : Linha) => {
            linha.draw(context)
        })
        this.path.closePath()
    }

    get matriz() : MatrizHomo {
        let matriz : MatrizHomo = new MatrizHomo(2)

        matriz.addPonto(this.linhas[0].origem)
        matriz.addPonto(this.linhas[1].fim)

        return matriz;
    }

    set matriz(matriz : MatrizHomo) {
        if (matriz.colLength == 2) {
            this.linhas = []

            this.linhas.push(new Linha(matriz.getPonto(0)))

            this.marcaPonto2(matriz.getPonto(1))
        }
        else throw new Error("Matriz não disponivel")
    }
}
