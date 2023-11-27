// Selecciona el elemento HTML con la clase "contenido" y lo guarda en la variable contenido
//VARIABLES
const contenido = document.querySelector(".contenido");
const agregarTweet = document.querySelector("#upload-tweet-button");
const borrarTweet = document.querySelector("#clear-tweets-button");
const texto = document.querySelector("#tweet-input");
const listaElementos = document.querySelector("#tweet-lista-elementos");
let listaTweets = JSON.parse(localStorage.getItem("listaTweets")) || [];
let idContador = 0;

localStorage.clear();//La unica forma de resetear todo de una es actualizar la pag, ya que con un botón no se pudo


// EVENTOS
agregarTweet.addEventListener("click", escribirTweet);


//FUNCIONES
// Función para escribir un tweet
function escribirTweet() {
    const valor = texto.value;

    if (valor) {
        const nuevoTweet = { //objeto con id y texto que cogera el valor como parametro
            id: generateId(),
            texto: valor
        };

        listaTweets.push(nuevoTweet);
        
        // Actualizar la lista en el HTML
        agregarTweetHTML(nuevoTweet);

        // Actualizar localStorage
        actualizarLocalStorage();
    } else {
        // Poner error y mostrar durante 10 segundos con un timer
        mostrarError("Aqui yo no veo un tweet.", "nope.gif");
    } 
}

// Función para generar un ID único
function generateId() {
    idContador++ ;
    return idContador.toString();
}


// Función que agrega un tweet al HTML
function agregarTweetHTML(tweet) {
    const li = document.createElement("li"); //creas el elemento de lista
    li.textContent = tweet.texto; //El elemento de lista tendrá como parametro()
    
    // Agregar botón de borrar
    const botonBorrar = document.createElement("img");
    botonBorrar.src ="basura.png";
    botonBorrar.alt = "";
    botonBorrar.classList.add("img-borrar");
    botonBorrar.addEventListener("click", () => borrarTweetIndividual(tweet.id));
    
    li.appendChild(botonBorrar);
    listaElementos.appendChild(li);

}


// Función para borrar un tweet individual
function borrarTweetIndividual(id) {
    // Filtrar la lista de tweets para excluir el tweet con el ID dado
    listaTweets = listaTweets.filter(tweet => tweet.id !== id);

    // Actualizar la lista en el HTML
    mostrarTweetsLocalStorage();

    // Actualizar localStorage
    actualizarLocalStorage();
}



// Función para actualizar el localStorage
function actualizarLocalStorage() {
    localStorage.setItem("listaTweets", JSON.stringify(listaTweets));
}

// Función para obtener datos del localStorage y mostrarlos en el HTML
function mostrarTweetsLocalStorage() {
    // Limpiar la lista en el HTML
    listaElementos.innerHTML = "";

    // Mostrar los tweets en el HTML
    listaTweets.forEach((tweet) => {
        agregarTweetHTML(tweet);
    });
}

// Función para mostrar un mensaje de error durante 10 segundos
function mostrarError(mensaje, rutaImagen) {
    const mensajeError = document.createElement("div");

    // Agrega el texto
    const textoError = document.createElement("p");
    textoError.textContent = mensaje;
    mensajeError.appendChild(textoError);

    // Agrega la imagen
    const imagenError = document.createElement("img");
    imagenError.src = rutaImagen;
    mensajeError.appendChild(imagenError);

    contenido.appendChild(mensajeError);

    setTimeout(() => {
        mensajeError.remove();
    }, 10000); // 10000 milisegundos = 10 segundos
}

// Llamar a la función al cargar la página
mostrarTweetsLocalStorage();
