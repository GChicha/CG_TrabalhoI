import { MatrizHomo } from '../utils/matrizHomo'
import { Ponto } from '../ponto'

export class Circulo {
    private centro : Ponto;
    private path : Path2D;
    constructor(ponto : Ponto, path : Path2D) {
        if (path == undefined)
            this.path = new Path2D()
        else this.path = path;

        this.centro = ponto;    
    }

    marcaPonto2(ponto : Ponto){
        let raio = this.calcDistToCenter(ponto)
        
        this.path.arcTo
    }

    private calcDistToCenter(ponto : Ponto) : number{
        let distance : number = 0;

        distance = Math.abs(this.centro.x - ponto.x) + Math.abs(this.centro.y - ponto.y)

        return distance;
    }
}
