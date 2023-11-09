'use strict'

//VARIABLES
const respuesta = document.getElementById("respuesta");
const resultadoImagen = document.getElementById("resultadoImagen");
const resultadoDetalles = document.getElementById("resultadoDetalles");
const btnBuscar = document.getElementById("btnBuscar");

//EVENTOS 
//agregamos un evento de clic al botón con id "btnBuscar"
btnBuscar.addEventListener("click", mostrarDetalles);

//FUNCIONES
function mostrarDetalles() { //Funcion que actuara como un switch
    reset(); //Vacia primero el contenido
    let personaje = respuesta.value.toUpperCase(); //Obtenemos el valor y lo convertimos a mayusculas
    
    switch (personaje) { //En funcion de lo que escogamos, devolvera una funcion tomando de parametro
        case "BOJACK":
            mostrarInformacion("./img/bojack.jpg", " 155 cm", " $4000", " Pizza");
            break;
        case "DIANE":
            mostrarInformacion("./img/diane.jpg", " 160 cm", " $3800", " Sopa de Miso");
            break;
        case "TODD":
            mostrarInformacion("./img/toddjpg.jpg", " 185 cm", " $1600", " Tarta");
            break;
        case "MR PEANUTBUTTER":
            mostrarInformacion("./img/peanutbutter.jpg", " 130 cm", " $4300", " Crema de cacahuete");
            break;
        case "CAROLYN":
            mostrarInformacion("./img/carolyn.jpg", " 130 cm", "Salario mensual: $3500", " Carne fresca");
            break;
        case "HOLLYHOCK":
            mostrarInformacion("./img/hollyhock.jpg", " 130 cm", "Salario mensual: $3000", " Frutas");
            break;
        default:
            mostrarError("El personaje no se ha encontrado"); //Funcion que devuelve un mensaje de error en caso de no seleccionar uno de los personajes
    }
}

function reset() { //Vacia el contenido de resultadoImagen
    resultadoImagen.innerHTML = "";
    resultadoDetalles.textContent = "";
}

function mostrarInformacion(imagen, altura, salario, comida) { //Toma de parametro lo que se haya puesto en mostrarInformacion
    resultadoImagen.innerHTML = `<img src="${imagen}" alt="Personaje" style="width: 240px; height: 270px;"><br>`; 
    resultadoDetalles.textContent = `Altura: ${altura}\nSalario mensual: ${salario}\nComida favorita: ${comida}`;
}

function mostrarError(mensaje) {
    resultadoDetalles.textContent = mensaje;
}