import { MatrizHomo } from '../utils/matrizHomo'
import { Matriz} from '../utils/matriz'
import { Ponto } from '../ponto'
import { Objeto } from '../objeto'

export class Circulo extends Objeto{
    private ponto2 : Ponto;

    public readonly name : string = "Circulo";
    constructor(ponto : Ponto, path : Path2D = new Path2D()) {
        super()

        this.path = path

        this.seqExec = [this.marcaPonto2]
        this.origem = ponto;    
    }

    marcaPonto2(ponto : Ponto){
        this.ponto2 = ponto;
        let raio = this.calcDistToCenter()
        
        this.path.arc(this.origem.x, this.origem.y, raio, 0, Math.PI * 2);
    }

    get ready() : boolean {
        return (this.ponto2 !== undefined)    
    }

    draw(contexto : CanvasRenderingContext2D, strokeStyle : string = "black") {
        contexto.stroke(this.path, strokeStyle)
    }

    private calcDistToCenter() : number{
        let distance : number = 0;

        distance = Math.abs(this.origem.x - this.ponto2.x) + Math.abs(this.origem.y - this.ponto2.y)

        return distance;
    }

    get matriz() : MatrizHomo {
        let matriz = new MatrizHomo(2)        

        matriz.addPonto(this.origem)
        matriz.addPonto(this.ponto2)

        return matriz
    }

    set matriz(matriz : MatrizHomo) {
        let newMatriz = matriz

        this.path = new Path2D()
        
        this.origem = new Ponto(newMatriz.get(0, 0), newMatriz.get(1, 0))
        this.marcaPonto2(new Ponto(newMatriz.get(0, 1), newMatriz.get(1, 1)))
    }
}
