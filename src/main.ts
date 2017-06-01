import { Retangulo } from './retangulo'
import { Linha } from './linha'

let canvasObject : HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas")

let canvasContext : CanvasRenderingContext2D = canvasObject.getContext('2d')

let linhaButton : HTMLButtonElement = <HTMLButtonElement>document.getElementById("linha")
let retanButton : HTMLButtonElement = <HTMLButtonElement>document.getElementById("retan")
let circuButton : HTMLButtonElement = <HTMLButtonElement>document.getElementById("circu")

let disableButtons = () : void => {
    retanButton.disabled = true
    circuButton.disabled = true
    linhaButton.disabled = true
}

let enableButtons = () : void => {
    retanButton.disabled = false
    circuButton.disabled = false
    linhaButton.disabled = false
}

linhaButton.onclick = () => {
    disableButtons()

    canvasContext.beginPath()

    canvasObject.onclick = (ev : MouseEvent) => {
        let linha = new Linha(ev.offsetX, ev.offsetY)

        canvasContext.moveTo(linha.origem.x, linha.origem.y)

        canvasObject.onclick = (ev : MouseEvent) => {
            linha.destino(ev.offsetX, ev.offsetY);

            canvasContext.lineTo(linha.fim.x, linha.fim.y);
            canvasContext.stroke();

            canvasObject.onclick = undefined

            enableButtons()
        }
    }
}
