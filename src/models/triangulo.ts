import { Linha } from './linha'
import { Objeto } from '../objeto'
import { Ponto } from '../ponto'
import { MatrizHomo } from '../utils/matrizHomo'

export class Triangulo implements Objeto{
    public path : Path2D;
    private linhas : Array<Linha> = [];

    constructor(ponto : Ponto, path? : Path2D) {
        if (path == undefined)
            this.path = new Path2D();
        else this.path = path
        
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

    draw(context : CanvasRenderingContext2D) {
        this.linhas.forEach((linha : Linha) => {
            linha.draw(context)
        })
        this.path.closePath()
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
            this.linhas = []

            this.linhas.push(new Linha(matriz.getPonto(0)))
            this.marcaPonto2(matriz.getPonto(1))
            this.marcaPonto3(matriz.getPonto(2))
        }
        else throw new Error("Matriz entregue é insuficiente")
    }
}
