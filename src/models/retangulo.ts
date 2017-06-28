import { Ponto } from '../ponto'
import { Objeto } from '../objeto'
import { Linha } from './linha'
import { MatrizHomo } from '../utils/matrizHomo'

export class Retangulo extends Objeto {
    readonly name : string = "Retangulo"

    constructor(ponto : Ponto, path : Path2D = new Path2D()) {
        super()
        this.path = path;
        this.seqExec = [this.constroiCom2Ponto]
        this.linhas.push(new Linha(ponto, this.path))
    }

    get ready() {
        if (this.linhas.length == 4)
            return true;
        else return false;
    }

    public constroiCom2Ponto(ponto : Ponto) {
        this.marcaPonto2(new Ponto(this.linhas[0].origem.x, ponto.y))
        this.marcaPonto3(ponto)
        this.marcaPonto4(new Ponto(ponto.x, this.linhas[0].origem.y))
    }

    private marcaPonto2(ponto : Ponto) {
        this.linhas[0].destino(ponto);

        this.linhas.push(new Linha(ponto));
    }

    private marcaPonto3(ponto : Ponto) {
        this.linhas[1].destino(ponto);

        this.linhas.push(new Linha(ponto));
    }

    private marcaPonto4(ponto : Ponto) {
        this.linhas[2].destino(ponto);

        this.linhas.push(new Linha(ponto));
        this.linhas[3].destino(this.linhas[0].origem)
    }

    get matriz() : MatrizHomo {
        let matriz : MatrizHomo = new MatrizHomo(4)

        matriz.addPonto(this.linhas[0].origem)
        matriz.addPonto(this.linhas[1].origem)
        matriz.addPonto(this.linhas[2].origem)
        matriz.addPonto(this.linhas[3].origem)

        return matriz;
    }

    set matriz(matriz : MatrizHomo) {
        if (matriz.n == 4) {
            this.linhas = []

            this.linhas.push(new Linha(new Ponto(matriz.get(0, 0), matriz.get(1, 0))))

            this.marcaPonto2(new Ponto(matriz.get(0, 1), matriz.get(1, 1)))
            this.marcaPonto3(new Ponto(matriz.get(0, 2), matriz.get(1, 2)))
            this.marcaPonto4(new Ponto(matriz.get(0, 3), matriz.get(1, 3)))
        }
        else throw new Error("Matriz não disponivel")
    }
}
