import { Retangulo } from './models/retangulo'
import { Linha } from './models/linha'
import { Ponto } from './ponto'
import { Triangulo } from './models/triangulo'

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

linhaButton.onclick = () => {
    disableButtons()

    canvasObject.onclick = (ev : MouseEvent) => {
        let linha = new Linha(new Ponto(ev.offsetX, ev.offsetY))

        canvasObject.onclick = (ev : MouseEvent) => {
            linha.destino(new Ponto(ev.offsetX, ev.offsetY));

            linha.draw(canvasContext)

            let row = tabela.insertRow(0)
            let cell = row.insertCell(0)
            cell.innerHTML = "Linha"

            canvasObject.onclick = undefined

            enableButtons()
        }
    }
}

trianButton.onclick = () => {
    disableButtons()

    canvasObject.onclick = (ev : MouseEvent) => {
        let triangulo = new Triangulo(new Ponto(ev.offsetX, ev.offsetY))
        
        canvasObject.onclick = (ev : MouseEvent) => {
            triangulo.marcaPonto2(new Ponto(ev.offsetX, ev.offsetY))

            canvasObject.onclick = (ev : MouseEvent) => {
                triangulo.marcaPonto3(new Ponto(ev.offsetX, ev.offsetY))

                triangulo.draw(canvasContext)

                let row = tabela.insertRow(0)
                let cell = row.insertCell(0)
                cell.innerHTML = "Triangulo"

                canvasObject.onclick = undefined

                enableButtons()
            }
        }
    }
}

retanButton.onclick = () => {
    disableButtons()

    canvasObject.onclick = (ev : MouseEvent) => {
        let retangulo = new Retangulo(new Ponto(ev.offsetX, ev.offsetY))

        canvasObject.onclick = (ev : MouseEvent) => {
            retangulo.marcaPonto2(new Ponto(ev.offsetX, ev.offsetY));

            retangulo.draw(canvasContext)

            let row = tabela.insertRow(0)
            let cell = row.insertCell(0)
            cell.innerHTML = "Retangulo"

            canvasObject.onclick = undefined

            enableButtons()
        }
    }
}
