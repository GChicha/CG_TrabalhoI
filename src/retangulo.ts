import { Matriz } from './matriz'
import { Ponto } from './ponto'
import { Objeto } from './objeto'

export class Retangulo implements Objeto {
    private matrizPontos : Matriz;
    private canvas : HTMLCanvasElement;
    private ponto1 : Ponto
    private ponto2 : Ponto

    constructor() {
        
    }

    get matriz() : Matriz {
        return this.matrizPontos;
    }
}
