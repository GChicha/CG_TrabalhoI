import { Matriz } from './matriz'
import { Ponto } from '../ponto'
import { Linha } from '../models/linha'

export class MatrizHomo extends Matriz {
    private colAtaul : number = 0; 

    constructor(n : number) {
        super(3, n)

        for (let i :number = 0; i < n; i++)
            this.set(2, i, 1)
    }

    public addPonto(ponto : Ponto) {
        this.set(0, this.colAtaul, ponto.x)
        this.set(1, this.colAtaul, ponto.y)

        this.colAtaul++;
    }

    addLinha(linha : Linha) {
        this.addPonto(linha.origem)
        this.addPonto(linha.fim)
    }

    /* Retorna o ponto a partir da matriz
     *
     * Retorna o ponto n, indexido em 0, a partir da matriz
     *
     * Parameters
     * ----------
     * n : number
     *  Numero da coluna do ponto desejado, indexisado em 0
     *
     * Returns
     * -------
     * ponto : Ponto
     *  Ponto retornado a partir da matriz
     */    
    getPonto(n : number) : Ponto {
        return new Ponto(this.get(0, n), this.get(1, n))
    }
}

