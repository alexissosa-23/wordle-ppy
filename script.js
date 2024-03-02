window.addEventListener('load', init);

let intentos = 6;
let palabra = obtenerPalabraAleatoria();
const BOTON = document.getElementById("guess-button");

document.getElementById("retry-button").addEventListener("click", function() {
    window.location.reload();
});

function init() {
    BOTON.addEventListener("click", intentar);
}

function intentar() {
    const INTENTO = leerIntento();
    if (INTENTO === palabra) {
        terminarJuego(true);
        return;
    }
    const GRID = document.getElementById("grid");
    const ROW = document.createElement('div');
    ROW.className = 'row';
    for (let i in palabra) {
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';
        if (INTENTO[i] === palabra[i]) { //VERDE
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = '#79b851';
        } else if (palabra.includes(INTENTO[i])) { //AMARILLO
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = '#f3c237';
        } else { //GRIS
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = '#a4aec4';
        }
        ROW.appendChild(SPAN);
    }
    GRID.appendChild(ROW);
    actualizarIntentos();
}

function leerIntento() {
    let intento = document.getElementById("guess-input").value.toUpperCase();
    if (intento.length !== 5) {
        alert("¡El intento debe tener exactamente 5 caracteres!");
        return null; // Retorna null para indicar que el intento no es válido
    }
    return intento;
}

function terminarJuego(ganador) {
    const INPUT = document.getElementById("guess-input");
    INPUT.disabled = true;
    BOTON.disabled = true;
    let mensaje = ganador ? "<h1>¡GANASTE!😀</h1>" : "<h1>¡PERDISTE!😖 La palabra correcta era: " + palabra + "</h1>";
    mostrarMensaje(mensaje);
    document.getElementById("retry-button").style.display = "block";
}

function mostrarMensaje(mensaje) {
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
}

function actualizarIntentos() {
    intentos--;
    const intentosRestantes = document.getElementById("guesses");
    intentosRestantes.textContent = "Intentos restantes: " + intentos;
    if (intentos === 0) {
        terminarJuego(false);
    }
}

function obtenerPalabraAleatoria() {
    let diccionario = ['APPLE', 'HURLS', 'WINGS', 'YOUTH', 'GAMES', 'STACK', 'BLAZE', 'DREAM', 'JUMBO', 'QUICK', 'VIXEN', 'ZEBRA'];
    return diccionario[Math.floor(Math.random() * diccionario.length)];
}
