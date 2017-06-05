export class Matriz {
    private matrizIntena : Array<Array<number>>;
    public readonly m : number;
    public readonly n : number;

    constructor(m : number, n : number) {
        this.m = m;
        this.n = n;
        
        this.matrizIntena = new Array(m)

        for (let i = 0; i < this.matrizIntena.length; i ++)
            this.matrizIntena[i] = new Array(n)
    }

    set(x : number, y : number, vlr : number) : void {
        if (x > this.m || y > this.n || y < 0 || x < 0) {
            throw new Error("Out of Range")
        }
        else {
            this.matrizIntena[x][y] = vlr;
        }
    }

    get(x : number, y : number) : number {
        return this.matrizIntena[x][y];
    }

    get colLength() : number {
        return this.matrizIntena[0].length
    }

    multiplicacao(matriz : Matriz) : Matriz {
        if (this.n != matriz.m) throw new Error("multiplicacao impossivel")

        let matrizResutante = new Matriz(this.m, matriz.n)

        for (let i = 0; i < this.m; i++) {
            for (let j = 0; j < matriz.n; j++) {
                for (let k = 0; k < this.n; k++) {
                    matrizResutante.set(i, j,
                        matrizResutante.get(i, j) +
                        this.get(i, k) * matriz.get(k, j))
                }
            }
        }

        return matrizResutante
    }
}
