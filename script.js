const contenedor = document.querySelector(".contenedor")
//Definicion de medidas
const altoTablero = 300
const anchoTablero = 570
const altoBloque= 20
const anchoBloque= 100
//Dfinicion posicion de usuario
const posicionInicialUsuario = [230, 10]
let posicionActualUsuario = posicionInicialUsuario
//Definir posicion de la bola
const posicionInicialBola = [270,40]
let posicionActualBola= posicionInicialBola
//botones
var playing = false;
var startButton;
//Difenicion direccion de la bola
let xDireccionBola = 2
let yDireccionBola = 2
let diametro= 20
//Definir Tiempo
let timerId
//Definicion de clase Bloque
class Bloque{
    constructor(ejeX, ejeY){
        this.bottonleft = [ejeX, ejeY ]
        this.bottonRigth = [ejeX + anchoBloque, ejeY ]
        this.topleft = [ejeX, ejeY + altoBloque]
        this.topRigth = [ejeX + anchoBloque, ejeY + altoBloque]
    }
}
const bloques = [
    new Bloque(10, 250),
    new Bloque(120, 250),
    new Bloque(230, 250),
    new Bloque(340, 250),
    new Bloque(450, 250),

    new Bloque(10, 220),
    new Bloque(120, 220),
    new Bloque(230, 220),
    new Bloque(340, 220),
    new Bloque(450, 220),

    new Bloque(10, 190),
    new Bloque(120, 190),
    new Bloque(230, 190),
    new Bloque(340, 190),
    new Bloque(450, 190)
]
function addBloque(){
    for(let i = 0; i< bloques.length; i++){
        const bloque = document.createElement('div')
        bloque.classList.add('bloque')
        bloque.style.left = bloques[i].bottonleft[0] + 'px'
        bloque.style.bottom = bloques[i].bottonleft[1] + 'px'
        contenedor.appendChild(bloque)
    }

}
addBloque()

function dibujarUsuario(){
    usuario.style.left = posicionActualUsuario[0] + 'px'
    usuario.style.bottom = posicionActualUsuario [1] + 'px'
}
const usuario = document.createElement('div')
usuario.classList.add('usuario')
contenedor.appendChild(usuario)
dibujarUsuario()
//Mover Usuario por el tablero
function moverUsuario(e){
    switch(e.key){
        case 'ArrowLeft':
            if(posicionActualUsuario [0] > 0){
                posicionActualUsuario [0] -= 10
                dibujarUsuario()
            }
            break
            case 'ArrowRight':
                if(posicionActualUsuario [0] < (anchoTablero - anchoBloque)){
                    posicionActualUsuario[0] += 10
                    dibujarUsuario()
            }
    }

}
//Añadir evento escuchador para el documento
document.addEventListener('keydown', moverUsuario)

//dibujar la bola
function dibujarBola(){
    bola.style.left = posicionActualBola [0] + 'px'
    bola.style.bottom = posicionActualBola [1] + 'px'
}
const bola = document.createElement('div')
bola.classList.add('bola')
contenedor.appendChild(bola)
dibujarBola()

function moverBola(){
    posicionActualBola[0] += xDireccionBola
    posicionActualBola[1] += yDireccionBola
    dibujarBola()
    revisarColisiones()
    gameOver()
    ganador()

    
}
timerId = setInterval(moverBola, 20)


function revisarColisiones(){
    //colisiones con Bloques
    for (let i = 0; i < bloques.length; i++){
        if( (posicionActualBola[0] > bloques[i].bottonleft[0] && posicionActualBola[0]< bloques[i].bottonRigth[0]) &&
        ((posicionActualBola[1] + diametro) > bloques[i].bottonleft[1] && posicionActualBola[1] < bloques[i].topleft[1])
    ){
        const todosLosBloques = Array.from(document.querySelectorAll('.bloque'))
        todosLosBloques[i].classList.remove('bloque')
        bloques.splice(i,1)
        cambiarDireccion()

    }
}
    //colisiones con las paredes
    if(
        posicionActualBola[0] >= (anchoTablero - diametro)||
        posicionActualBola[1] >= (altoTablero - diametro)||
        posicionActualBola[0] <= 0 ||
        posicionActualBola[1] <= 0

){
        cambiarDireccion()
    }
    if ((posicionActualBola[0]> posicionActualUsuario[0] && posicionActualBola[0] < posicionActualUsuario[0] + anchoBloque)&&
    (posicionActualBola[1] > posicionActualUsuario[1] && posicionActualBola [1]< posicionActualUsuario[1] + altoBloque)
    ){
        cambiarDireccion()
    }

}
function gameOver(){
    if(posicionActualBola[1] <= 0){
        clearInterval(timerId)
        alert('Game Over');

}
}
function ganador(){
    if(posicionActualUsuario[1]>=0){
    alert("Ganaste");

    }
}
function cambiarDireccion(){
    if(xDireccionBola === 2 && yDireccionBola === 2){
        yDireccionBola = -2
        return
    }
    if(xDireccionBola === 2 && yDireccionBola === -2){
        xDireccionBola = -2
        return
    }
    if(xDireccionBola === -2 && yDireccionBola === -2){
        yDireccionBola = 2
        return
    }
    if(xDireccionBola === -2 && yDireccionBola === 2){
        xDireccionBola = 2
        return
    }
}

