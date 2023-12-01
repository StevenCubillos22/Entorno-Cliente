'use strict';

// VARIABLES
const obtenerTXT = document.getElementById("obtenerTXT");
const JSON_objeto = document.getElementById("JSON_objeto");
const JSON_array = document.getElementById("JSON_array");
const cargarAPI = document.getElementById("cargarAPI");

const TXT = "data/datos.txt";
const OBJETO = "data/empleado.json";
const ARRAY = "data/empleados.json";
const API = "https://picsum.photos/list";

const DIV_RESULTADO = document.getElementById("resultado");

// EVENTOS

obtenerTXT.addEventListener("click", () => consultar_texto(TXT));
JSON_objeto.addEventListener("click", () => consultarJSON(OBJETO, "objeto"));
JSON_array.addEventListener("click", () => consultarJSON(ARRAY, "array"));
cargarAPI.addEventListener("click", () => consultarJSON(API, "api"));

// FUNCIONES/FUNCIONES-CONSTANTES

const consultar_texto = (texto) => {
    fetch(texto)
    .then((respuesta) => {
       
        return respuesta.text();
    })
    .then(resultado => {
        DIV_RESULTADO.innerHTML = resultado;
       
    })
    .catch(error => {
        DIV_RESULTADO.innerHTML =`Error al obtener el texto`;
    });
}


const consultarJSON = (url) => {
    fetch(url)
        .then(resp => resp.json())
        .then(dato => {
            DIV_RESULTADO.innerHTML='';
            if(Array.isArray(dato)){ //se distingira el objeto y array
                mostrArray(dato);
            } else {
                mostrarObj(dato);
            }
        });

}


function mostrArray(dato){
    dato.forEach(objeto => {
        mostrarObj(objeto);
    });
}


function mostrarObj(dato){
    let mensaje;
    let elemento;
    const DIV_OBJETO=document.createElement('div');
    DIV_RESULTADO.appendChild(DIV_OBJETO);

    Object.entries(dato).forEach(([key, value])=>{
        
        if(key.trim() === 'author_url'){ // Si es 'author.url', establece el mensaje como 'Ver imagen'
            mensaje= 'Ver imagen';
            elemento = document.createElement('a');// Crea un elemento ancla (a) en el DOM y establece su href y target

            elemento.href = value;
            elemento.target = '_blank';
        } else {
            mensaje = key + ': ' + value;// Si la clave no es 'author.url', establece el mensaje como la clave y el valor
            elemento = document.createElement('p');
        }
        elemento.innerHTML = mensaje;
        DIV_OBJETO.appendChild(elemento); // Agrega el elemento al div creado anteriormente (DIV_OBJETO)

    });

}

