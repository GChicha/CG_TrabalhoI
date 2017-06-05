import { Retangulo } from './models/retangulo'
import { Linha } from './models/linha'
import { Ponto } from './ponto'
import { Triangulo } from './models/triangulo'
import { Objeto } from './objeto'

let canvasObject : HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas")

let canvasContext : CanvasRenderingContext2D = canvasObject.getContext('2d')

// Botões de objetos
let linhaButton : HTMLButtonElement = <HTMLButtonElement>document.getElementById("linha")
let retanButton : HTMLButtonElement = <HTMLButtonElement>document.getElementById("retan")
let circuButton : HTMLButtonElement = <HTMLButtonElement>document.getElementById("circu")
let trianButton : HTMLButtonElement = <HTMLButtonElement>document.getElementById("trian")

let tabela : HTMLTableElement = <HTMLTableElement>document.getElementById('tabela_obj')

let disableButtons = () : void => {
    retanButton.disabled = true
    circuButton.disabled = true
    linhaButton.disabled = true
    trianButton.disabled = true
}

let enableButtons = () : void => {
    retanButton.disabled = false
    circuButton.disabled = false
    linhaButton.disabled = false
    trianButton.disabled = false
}

let objetoAtivo : Objeto;

let objectIter = (ev : MouseEvent) => {
    objetoAtivo.next(new Ponto(ev.offsetX, ev.offsetY))

    if (objetoAtivo.hasNext) { 
        canvasObject.onclick = objectIter;
        objetoAtivo.draw(canvasContext);
    }
    else {
        objetoAtivo.draw(canvasContext);

        enableButtons();

        let row = tabela.insertRow(0)
        let cell = row.insertCell(0)
        cell.innerHTML = objetoAtivo.name;
        let btnCell = row.insertCell(1)
        let btnMark : HTMLButtonElement = <HTMLButtonElement>document.createElement("button")
        btnMark.innerHTML = "Marcar"
        let x = objetoAtivo
        btnMark.onclick = () => {
            x.mark(canvasContext)
        }
        btnCell.appendChild(btnMark)

        canvasObject.onclick = undefined;
        objetoAtivo = undefined;
    }
}

retanButton.onclick = () => {
    disableButtons()

    canvasObject.onclick = (ev : MouseEvent) => {
        let retangulo = new Retangulo(new Ponto(ev.offsetX, ev.offsetY))

        objetoAtivo = <Objeto>retangulo;
        canvasObject.onclick = objectIter;
    }
}

trianButton.onclick = () => {
    disableButtons()

    canvasObject.onclick = (ev : MouseEvent) => {
        let triangulo = new Triangulo(new Ponto(ev.offsetX, ev.offsetY))

        objetoAtivo = <Objeto>triangulo;
        canvasObject.onclick = objectIter;
    }
}

linhaButton.onclick = () => {
    disableButtons()

    canvasObject.onclick = (ev : MouseEvent) => {
        let linha = new Linha(new Ponto(ev.offsetX, ev.offsetY))

        objetoAtivo = <Objeto>linha;
        canvasObject.onclick = objectIter;
    }
}
