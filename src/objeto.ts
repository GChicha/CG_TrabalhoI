import { Matriz } from './utils/matriz'

export interface Objeto {
    matriz : Matriz;
    readonly path : Path2D;
    readonly ready : boolean;
}
