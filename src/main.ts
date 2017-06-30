import { Retangulo } from './models/retangulo'
import { Linha } from './models/linha'
import { Ponto } from './ponto'
import { Triangulo } from './models/triangulo'
import { Circulo } from './models/circulo'
import { Objeto } from './objeto'
import { GerenciadorCanvas  } from './utils/gerenciadorContexto'

let canvasObject : HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas")

let canvasContext : CanvasRenderingContext2D = canvasObject.getContext('2d')

// Botões de objetos
let linhaButton : HTMLButtonElement = <HTMLButtonElement>document.getElementById("linha")
let retanButton : HTMLButtonElement = <HTMLButtonElement>document.getElementById("retan")
let circuButton : HTMLButtonElement = <HTMLButtonElement>document.getElementById("circu")
let trianButton : HTMLButtonElement = <HTMLButtonElement>document.getElementById("trian")

// Tabela de Objetos
let tabela : HTMLTableElement = <HTMLTableElement>document.getElementById('tabela_obj')

let gC = new  GerenciadorCanvas(canvasObject, tabela, {
    triangulo : trianButton,
    retanguulo : retanButton,
    linha : linhaButton,
    circulo : circuButton
})

trianButton.onclick = () => {
    canvasObject.onclick = (ev : MouseEvent) => {
        let obj = new Triangulo(new Ponto(GerenciadorCanvas.getMousePos(ev).x, GerenciadorCanvas.getMousePos(ev).y))
        gC.registraObjeto(obj)
    }
}

linhaButton.onclick = () => {
    canvasObject.onclick = (ev : MouseEvent) => {
        let obj = new Linha(new Ponto(GerenciadorCanvas.getMousePos(ev).x, GerenciadorCanvas.getMousePos(ev).y))
        gC.registraObjeto(obj)
    }
}

retanButton.onclick = () => {
    canvasObject.onclick = (ev : MouseEvent) => {
        let obj = new Retangulo(new Ponto(GerenciadorCanvas.getMousePos(ev).x, GerenciadorCanvas.getMousePos(ev).y))
        gC.registraObjeto(obj)
    }
}

circuButton.onclick = () => {
    canvasObject.onclick = (ev : MouseEvent) => {
        let obj = new Circulo(new Ponto(GerenciadorCanvas.getMousePos(ev).x, GerenciadorCanvas.getMousePos(ev).y))
        gC.registraObjeto(obj)
    }
}
