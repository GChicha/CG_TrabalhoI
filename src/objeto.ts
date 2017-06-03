import { Matriz } from './matriz'

export interface Objeto {
    matriz : Matriz;
    readonly path : Path2D;
    readonly ready : boolean;
}
