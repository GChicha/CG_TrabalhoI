import { Matriz } from './matriz'
import { MatrizHomo } from './matrizHomo'
import { Objeto } from '../objeto'

let toRadians = (angle) : number => {
  return angle * (Math.PI / 180);
}

export abstract class Transformacao {
    public static translacao(dx : number, dy : number) : Matriz {
        let matrizTransf = new Matriz(3, 3)

        matrizTransf.set(0, 0, 1)
        matrizTransf.set(0, 1, 0)
        matrizTransf.set(0, 2, dx)
        matrizTransf.set(1, 0, 0)
        matrizTransf.set(1, 1, 1)
        matrizTransf.set(1, 2, dy)
        matrizTransf.set(2, 0, 0)
        matrizTransf.set(2, 1, 0)
        matrizTransf.set(2, 2, 1)

        return matrizTransf
    }

    public static rotacao(ang : number) : Matriz {
        let matrizTransf = new Matriz(3, 3)

        matrizTransf.set(0, 0, Math.cos(toRadians(ang)))
        matrizTransf.set(0, 1, -Math.sin(toRadians(ang)))
        matrizTransf.set(0, 2, 0)
        matrizTransf.set(1, 0, Math.sin(toRadians(ang)))
        matrizTransf.set(1, 1, Math.cos(toRadians(ang)))
        matrizTransf.set(1, 2, 0)
        matrizTransf.set(2, 0, 0)
        matrizTransf.set(2, 1, 0)
        matrizTransf.set(2, 2, 1)

        return matrizTransf;
    }

    public static escalaUniforme(escala : number) : Matriz {
        let matrizTransf = new Matriz(3, 3)

        matrizTransf.set(0, 0, escala)
        matrizTransf.set(0, 1, 0)
        matrizTransf.set(0, 2, 0)
        matrizTransf.set(1, 0, 0)
        matrizTransf.set(1, 1, escala)
        matrizTransf.set(1, 2, 0)
        matrizTransf.set(2, 0, 0)
        matrizTransf.set(2, 1, 0)
        matrizTransf.set(2, 2, 1)

        return matrizTransf;
    }

    static get olho() : Matriz {
        let matrizResultado = new Matriz(3, 3)

        matrizResultado.set(0, 0, 1)
        matrizResultado.set(0, 1, 0)
        matrizResultado.set(0, 2, 0)
        matrizResultado.set(1, 0, 0)
        matrizResultado.set(1, 1, 1)
        matrizResultado.set(1, 2, 0)
        matrizResultado.set(2, 0, 0)
        matrizResultado.set(2, 1, 0)
        matrizResultado.set(2, 2, 1)

        return matrizResultado
    }
}
