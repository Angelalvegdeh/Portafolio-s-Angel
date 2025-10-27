//Si dentro de una funcion declaro una variable solo sera reconocida dentro de la funcion 
//fuera de la funcion sera totalmente ignorada

let expresion = '';
let resultadoMostrado = '';
const pantalla = document.getElementById('pantalla');

// Funcion para actualizar la pantalla
function actualizarPantalla(valor) {
    pantalla.textContent = valor || '0';

}

//Función para agregar nuúmeros
function agregaNumero(numero) {
    if (resultadoMostrado) {
        expresion = '';
        resultadoMostrado = false;
    }

// Evitar multiples ceros al inicio
// === ---> identica
// !== ---> diferente
    if (expresion === '0' && numero !== '0') return;

// Reemplaza el 0 inicial de la pantalla
// Identifica si la expresion es 0 y si numero no es 0 concatenar la expresion con el numero
    if (expresion === '0' && numero !== '0') {
    expresion = numero;
    } else {
    // suamar le valor de la variable al valor Ej. variable = variable + valor;
    expresion += numero;
}

actualizarPantalla(expresion)

}
//Función para limpiar
function limpiar() {
    expresion = '';
    resultadoMostrado = false;
    actualizarPantalla('0');
}
// Funcion para borrar 
// Slice: si tiene valor de -1 borra de 1 en 1 
function borrar() {
    if (!resultadoMostrado && expresion !== '') {
        expresion = expresion.slice(0,-1);
        actualizarPantalla(expresion || '0');
    }
}

function agregarOperador(operador) {
    if (expresion === '') return;

    // Si hay un resultado mostrado, usar ese resultado
    if (resultadoMostrado) {
        resultadoMostrado = false;
    }
    // Evitar operadores consecutivos Ej. +*
    const ultimoCaracter = expresion [expresion.length - 1];
    if (['+', '-', '*', '/', '%'].includes(ultimoCaracter)) {
        expresion = expresion.slice(0, -1);
    }
    expresion += operador;
    actualizarPantalla(expresion);
}

// Función para agregar decimales

function agregaDecimal() {
    if (resultadoMostrado) {
        expresion = '0';
        resultadoMostrado = false;
    }

    // Verificar si ya hay un decimal en el numero actual
    // Split sirve para dividir    // Arreglos
    const numeros = expresion.split(/[\+\-\*\/\%]/);
    const numeroActual = numeros[numeros.length - 1];

    // ! significa 'no'
    if (!numeroActual.includes('.')){
        if (numeroActual === '' || expresion === '') {
        // Cuando no hay enteros pone el 0.
        expresion += '0.';
        // En caso de que ya exista un entero pone el .
    } else {
        expresion += '.';
    }
    actualizarPantalla(expresion);
    }
}

function calcular() {
    if (expresion === '') return

    try {
        let expresionEval = expresion;
        if (expresionEval.includes('%')) {
            expresionEval = expresionEval.replace(/(\d+\.?\d*)%/g, '($1/100)')
        }

        const resultado = eval(expresionEval);

        // formatear resultado
        let resultadoFormateado;
        if(Number.isInteger(resultado)) {
           resultadoFormateado = resultado.toString();
        } else {
           resultadoFormateado = resultado.toFixed(8).replace(/\.?0+$/, ''); 
        }
        actualizarPantalla(resultadoFormateado)
        expresion = resultadoFormateado
        resultadoMostrado = true;
    } catch (error) {
        actualizarPantalla('Error')
        expresion = '';
        resultadoMostrado = true;
    }
}

function formatearExpresion(exp) {
    return exp.replace(/\*/g, '×')
}


