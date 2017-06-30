import { Objeto } from '../objeto'
import { MatrizHomo } from '../utils/matrizHomo'
import { Ponto } from '../ponto'
import { Transformacao } from './transformacoes';

export class GerenciadorCanvas {
    private contexto : CanvasRenderingContext2D;
    private elemento : HTMLCanvasElement;

    private tabela : HTMLTableElement;

    private buttons : {
        retanguulo : HTMLButtonElement,
        triangulo : HTMLButtonElement,
        circulo : HTMLButtonElement,
        linha : HTMLButtonElement
    }

    private objetos : Array<{
        objeto : Objeto,
        estado : {
            ativo : boolean,
            matriz : MatrizHomo,
        },
        row: HTMLTableRowElement
    }> = [];

    constructor(elemento : HTMLCanvasElement, tabela : HTMLTableElement, buttons : {
        retanguulo : HTMLButtonElement,
        triangulo : HTMLButtonElement,
        circulo : HTMLButtonElement,
        linha : HTMLButtonElement
    }) {
        this.tabela = tabela;
        this.elemento = elemento;
        this.contexto = elemento.getContext('2d')
        this.buttons = buttons
    }

    private disableButtons = () : void => {
        this.buttons.triangulo.disabled = true
        this.buttons.retanguulo.disabled = true
        this.buttons.linha.disabled = true
        this.buttons.circulo.disabled = true
    }

    private enableButtons = () : void => {
        this.buttons.circulo.disabled = false
        this.buttons.triangulo.disabled = false
        this.buttons.retanguulo.disabled = false
        this.buttons.linha.disabled = false
    }

    public static getMousePos(evt : MouseEvent) {
        let canvas = evt.target as HTMLCanvasElement;
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    } 

    private cellInsert(row : HTMLTableRowElement, objeto : {
        objeto : Objeto,
        estado : {
            ativo : boolean,
            matriz : MatrizHomo,
        },
        row: HTMLTableRowElement
    }) {
        // Celula do nome
        let cellName = row.insertCell()
        cellName.innerHTML = objeto.objeto.name

        // Celula botão de destaque
        let cellButtonDestacar = row.insertCell()
        let buttonDestacar : HTMLButtonElement = document.createElement("button") as HTMLButtonElement;
        buttonDestacar.innerHTML = "Destacar"

        let destFun = () => {
            objeto.objeto.mark(this.contexto)
            buttonDestacar.innerHTML = "Tirar Destaque"
            buttonDestacar.onclick = () => {
                buttonDestacar.innerHTML = "Destacar"
                objeto.objeto.unMark(this.contexto)
                buttonDestacar.onclick = destFun
            }
        }
        buttonDestacar.onclick = destFun
        cellButtonDestacar.appendChild(buttonDestacar);

        // Celula botão de rotação
        let cellButtonRotate = row.insertCell();
        let buttonRotate : HTMLButtonElement = document.createElement("button")
        buttonRotate.innerHTML = "Rotacionar"

        let pontoGiro : Ponto
        let rotFunction = () => {
            let graus : number = +(prompt("Quantos graus deve rotacionar?"))

            this.elemento.onclick = (ev : MouseEvent) => {
                pontoGiro = new Ponto(GerenciadorCanvas.getMousePos(ev).x, GerenciadorCanvas.getMousePos(ev).y)

                let matrizAnt = objeto.estado.matriz;

                let nMatriz = Transformacao.translacao(pontoGiro.x, pontoGiro.y).multiplicacao(Transformacao.rotacao(graus).multiplicacao(Transformacao.translacao(-pontoGiro.x, -pontoGiro.y).multiplicacao(matrizAnt)))

                objeto.estado = {
                    ativo : true,
                    matriz : nMatriz
                }

                this.draw()

                this.elemento.onclick = undefined
            }
        }

        buttonRotate.onclick = rotFunction;
        cellButtonRotate.appendChild(buttonRotate)

        // Celula botão de translação
        let cellButtonTrans = row.insertCell();
        let buttonTrans : HTMLButtonElement = document.createElement("button")
        buttonTrans.innerHTML = "Transladar"

        let transFunction = () => {
            let x : number = +(prompt("Para onde deve mover - x?"))
            let y : number = +(prompt("Para onde deve mover - y?"))

            let matrizAnt = objeto.estado.matriz;

            objeto.estado = {
                ativo : true,
                matriz : Transformacao.translacao(x, y).multiplicacao(matrizAnt)
            }

            this.draw()
        }

        buttonTrans.onclick = transFunction;
        cellButtonTrans.appendChild(buttonTrans)

        // Celula botão de escala
        let cellButtonMEscala = row.insertCell();
        let buttonEscala : HTMLButtonElement = document.createElement("button")
        buttonEscala.innerHTML = "Mudar escala"

        let mudaEscala = () => {
            let multiplicador : number = +(prompt("Quanto será o multiplicador de escala?"))

            let matrizAnt = objeto.estado.matriz;

            let nMatriz = Transformacao.translacao(objeto.objeto.origem.x, objeto.objeto.origem.y).multiplicacao(Transformacao.escalaUniforme(multiplicador).multiplicacao(Transformacao.translacao(-objeto.objeto.origem.x, -objeto.objeto.origem.y).multiplicacao(matrizAnt)))

            objeto.estado = {
                ativo : true,
                matriz : nMatriz
            }

            this.draw()
        }

        buttonEscala.onclick = mudaEscala;
        cellButtonMEscala.appendChild(buttonEscala)
    }

    registraObjeto(objeto : Objeto) : void {
        this.disableButtons()
        if (objeto.ready) {
            let row = this.tabela.insertRow()

            let nObj = {
                objeto : objeto,
                estado : {
                    ativo : true,
                    matriz : objeto.matriz
                },
                row : row
            }

            this.objetos.push(nObj)

            this.cellInsert(row, nObj)

            this.draw();
            this.enableButtons()
        }
        else {
            let iterObjeto = (ev : MouseEvent) => {
                objeto.next(new Ponto(GerenciadorCanvas.getMousePos(ev).x, GerenciadorCanvas.getMousePos(ev).y))

                if (objeto.hasNext) {
                    this.elemento.onclick = iterObjeto;
                    objeto.draw(this.contexto);
                }
                else {
                    this.elemento.onclick = undefined
                    this.registraObjeto(objeto);
                }
            }
            this.elemento.onclick = iterObjeto;
        }
    }

    draw() : void {
        this.contexto.clearRect(0, 0, this.elemento.width, this.elemento.height);
        this.objetos.forEach((item) => {
            if (item.estado.ativo) {
                let matriz = item.estado.matriz
                item.objeto.matriz = matriz
                item.objeto.draw(this.contexto);
            }
        })
    }
}
