import { Linha } from './linha'
import { Objeto } from '../objeto'
import { Ponto } from '../ponto'
import { MatrizHomo } from '../utils/matrizHomo'

export class Triangulo extends Objeto{
    readonly name : string = "Triangulo"

    constructor(ponto : Ponto, path : Path2D = new Path2D()) {
        super()
        this.path = path;
        this.seqExec = [this.marcaPonto2, this.marcaPonto3]

        this.origem = ponto

        this.linhas.push(new Linha(ponto, this.path))
    }

    marcaPonto2(ponto : Ponto){
        this.linhas[0].destino(ponto)
        
        this.linhas.push(new Linha(ponto, this.path))
    }

    marcaPonto3(ponto : Ponto){
        this.linhas[1].destino(ponto)

        this.linhas.push(new Linha(ponto, this.path))
        this.linhas[2].destino(this.linhas[0].origem)
    }

    get ready() : boolean {
        if(this.linhas.length == 3)
            return true;
        else return false;
    }

    get matriz() : MatrizHomo {
        if (this.ready) {
            let matriz : MatrizHomo = new MatrizHomo(3)

            matriz.addPonto(this.linhas[0].origem)
            matriz.addPonto(this.linhas[1].origem)
            matriz.addPonto(this.linhas[2].origem)

            return matriz;
        }
        else throw new Error("Matriz não disponivel")
    }
    
    set matriz(matriz : MatrizHomo) {
        if (matriz.colLength == 3) {
            this.origem = new Ponto(matriz.get(0, 0), matriz.get(1, 0))

            this.linhas = []

            this.linhas.push(new Linha(new Ponto(matriz.get(0, 0), matriz.get(1, 0))))
            this.marcaPonto2(new Ponto(matriz.get(0, 1), matriz.get(1, 1)))
            this.marcaPonto3(new Ponto(matriz.get(0, 2), matriz.get(1, 2)))
        }
        else throw new Error("Matriz entregue é insuficiente")
    }
}
