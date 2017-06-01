import { Objeto } from './objeto'
import { Ponto } from './ponto'
import { Matriz } from './matriz'

export class Linha implements Objeto {

    public origem : Ponto;
    public fim : Ponto;

    constructor(x : number, y : number) {
        this.origem = new Ponto(x, y)
    }

    destino(x : number, y : number) : void {
        this.fim = new Ponto(x, y);
    }

    get matriz() : Matriz {
        let matriz = new Matriz(3, 2);

        matriz.set(0, 0, this.origem.x)
        matriz.set(1, 0, this.origem.y)

        matriz.set(0, 1, this.fim.x)
        matriz.set(1, 1, this.fim.y)

        matriz.set(2, 0, 1)
        matriz.set(2, 1, 1)

        return matriz;
    }
}
