import { Ponto } from '../ponto'
import { Objeto } from '../objeto'
import { Linha } from './linha'
import { MatrizHomo } from '../utils/matrizHomo'

export class Retangulo extends Objeto {
    readonly name : string = "Retangulo"

    constructor(ponto : Ponto, path : Path2D = new Path2D()) {
        super()
        this.path = path;
        this.seqExec = [this.marcaPonto2]
        this.linhas.push(new Linha(ponto, this.path))
    }

    get ready() {
        if (this.linhas.length == 4)
            return true;
        else return false;
    }

    marcaPonto2(ponto : Ponto) {
        this.linhas[0].destino(new Ponto(this.linhas[0].origem.x, ponto.y))
        
        this.linhas.push(new Linha(this.linhas[0].fim[0]))
        this.linhas[1].destino(ponto)

        this.linhas.push(new Linha(ponto))
        this.linhas[2].destino(new Ponto(this.linhas[1].fim[0].x, this.linhas[0].origem.y))

        this.linhas.push(new Linha(this.linhas[2].fim[0]))
        this.linhas[3].destino(this.linhas[0].origem)
    }

    get matriz() : MatrizHomo {
        let matriz : MatrizHomo = new MatrizHomo(2)

        matriz.addPonto(this.linhas[0].origem)
        matriz.addPonto(this.linhas[1].fim[0])

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
