'use strict';

// Bloque de carga del DOM
// Usamos el 'document.addEventListener("DOMContentLoaded")' para asegurarnos de que el script se 
//ejecute después de que el DOM haya sido cargado.

document.addEventListener("DOMContentLoaded", function() {


// VARIABLES
const respuesta = document.getElementById("respuesta");
const resultadoImagen = document.getElementById("resultadoImagen");
const resultadoDetalles = document.getElementById("resultadoDetalles");
const btnBuscar = document.getElementById("btnBuscar");

// 
//Array donde almacenamos los personajes
const personajes = [
    {
        nombre: "BOJACK",
        imagen: "./img/bojack.jpg",
        altura: " 155 cm",
        salario: " $4000",
        comida: " Pizza"
    },
    {
        nombre: "DIANE",
        imagen: "./img/diane.jpg",
        altura: " 160 cm",
        salario: " $3800",
        comida: " Sopa de Miso"
    },
    {
        nombre: "TODD",
        imagen: "./img/toddjpg.jpg",
        altura: " 185 cm",
        salario: " $1600",
        comida: " Tarta"
    },
    {
        nombre: "MR PEANUTBUTTER",
        imagen: "./img/peanutbutter.jpg",
        altura: " 130 cm",
        salario: " $4300",
        comida: " Crema de cacahuete"
    },
    {
        nombre: "CAROLYN",
        imagen: "./img/carolyn.jpg",
        altura: " 130 cm",
        salario: "Salario mensual: $3500",
        comida: " Carne fresca"
    },
    {
        nombre: "HOLLYHOCK",
        imagen: "./img/hollyhock.jpg",
        altura: " 130 cm",
        salario: "Salario mensual: $3000",
        comida: " Frutas"
    }
];

// EVENTOS
//agrega un evento de clic al botón con id "btnBuscar"
btnBuscar.addEventListener("click", mostrarDetalles);

// FUNCIONES
//Filtra la lista de personajes y muestra la información correspondiente si se encuentra el personaje.
//
function mostrarDetalles() {
    reset();
    let personaje = respuesta.value.toUpperCase(); //Obtenemos el valor y lo convertimos a mayusculas
    
    //Filtra los personajes por nombre y obtiene el primer elemento del resultado 
    const personajeEncontrado = personajes.filter(p => p.nombre === personaje)[0];

    
    if (personajeEncontrado) { //ahora nos metemos en una condicional que verifica si se encuentra el personaje según el nombre
        mostrarInformacion(personajeEncontrado.imagen, personajeEncontrado.altura, personajeEncontrado.salario, personajeEncontrado.comida); 
    } else {
        mostrarError("El personaje no se ha encontrado");
    }
}

function reset() { //Vacia el contenido de resultadoImagen y resultadoDetalles
    resultadoImagen.innerHTML = "";
    resultadoDetalles.textContent = "";
}

function mostrarInformacion(imagen, altura, salario, comida) { //Funcion que muestra el personaje tomando parámetros
    resultadoImagen.innerHTML = `<img src="${imagen}" alt="Personaje" style="width: 240px; height: 270px;"><br>`;
    resultadoDetalles.textContent = `Altura: ${altura}\nSalario mensual: ${salario}\nComida favorita: ${comida}`;
}

function mostrarError(mensaje) { //Nos muestra el error con un textContent
    resultadoDetalles.textContent = mensaje;
   }

});