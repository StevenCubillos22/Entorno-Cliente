//DOM
let listaCursos = document.querySelector('#lista-cursos');

let carroArray = obtenerCarritoLS() || [];

localStorage.clear();//La unica forma de resetear todo de una es actualizar la pag, ya que con un botón no se pudo

//FUNCION MAIN---------------------

async function main() {
    const arrayCursos = await obtenerObjetosJSON();
    console.log(arrayCursos);
    const arrCursos2Dim = convertirArray2Dim(arrayCursos, 3);
    impObjetos(arrCursos2Dim);

    //EVENTOS
    listaCursos.addEventListener('click', e =>{
        const elemento = e.target;

        //Si se agrega al carrito
        if(elemento.classList.contains('agregar-carrito')){
            const id = elemento.getAttribute('data-id');
            addCarrito(arrayCursos, id);
            
        }
        console.log(carroArray);

        if (elemento.classList.contains('borrar-curso')) {
            const id = elemento.getAttribute('data-id');
            eliminarCurso(id);
        }

    });

    document.getElementById('vaciar-carrito').addEventListener('click', () => {
        vaciarCarrito();
    });
    
}

//FUNCIONES----------------------


function obtenerCarritoLS() {
    const carroJSON = localStorage.getItem('carroArray');
    return carroJSON ? JSON.parse(carroJSON) : null;
}


function guardarCarritoLS() {
    localStorage.setItem('carroArray', JSON.stringify(carroArray));
}


async function obtenerObjetosJSON(){ //Obtiene el objeto json y lo devuelve a array
    const RESPUESTA = await fetch('./data/cursos.json');
    const RESPUESTAJSON = await RESPUESTA.json();
    console.log(RESPUESTAJSON);
    let objetoArray = [];

    RESPUESTAJSON.forEach(objeto => {
        objetoArray.push(objeto);
    })
    return objetoArray;
}



function convertirArray2Dim(array, numColumns) { //Convierte en un array 2d tomando el array y el numero de columnas
    const resultadoArray = [];

    for (let i = 0; i<array.length; i += numColumns){

        const fila = array.slice(i, i + numColumns);
        resultadoArray.push(fila);
    }
    return resultadoArray;
}


function objetoDesdeJson(objeto) {
    //Separo los elementos del objeto en pares de clave-valor
    const elementos = Object.entries(objeto);
    //Construyo un nuevo objeto a partir de los pares de clave-valor obtenidos
    const objetoNuevo = Object.fromEntries(elementos);
    return objetoNuevo;
}


function impObjetos(array2D){
    array2D.forEach(fila => {
        const divRow = document.createElement('div');
        divRow.classList.add('row');
        fila.forEach((curso) => {
            const divCurso = document.createElement('div');
            divCurso.classList.add('four', 'columns');
            divCurso.innerHTML = `
              <div class="card">
                <img src="${curso.src}" class="imagen-curso u-full-width" />
                <div class="info-card">
                  <h4>${curso.titulo}</h4>
                  <p>${curso.autor}</p>
                  <img src="img/estrellas.png" />
                  <p class="precio">${curso.precioAlto} <span class="u-pull-right">${curso.precioBajo}</span></p>
                  <a href="#" class="u-full-width button-primary button input agregar-carrito" data-id="${curso.id}">Agregar Al Carrito</a>
                </div>
              </div>
            `;
            divRow.appendChild(divCurso);
          });

        listaCursos.appendChild(divRow);
    })
}


function addCarrito(arrayCursos, id) {
    const cursoSeleccionado = arrayCursos.find(curso => curso.id === id);
    const existe = carroArray.find(item => item.id === id);

    if (cursoSeleccionado){
        if (existe) {
            existe.cantidad++;
        } else {
            carroArray.push({ ...cursoSeleccionado, cantidad: 1});//Spread operator
        }//Se crea un objeto con un copia-pega de cursoSeleccionado, y se le agrega la cantidad como propiedad
    
        actualizarVisualizacionCarrito();
        guardarCarritoLS();
    }
}

function eliminarCurso(id) {
    const cursoSeleccionadoIndex = carroArray.findIndex(item => item.id === id);
    
    if (cursoSeleccionadoIndex !== -1){
        const cursoSeleccionado = carroArray[cursoSeleccionadoIndex];
    
        if (cursoSeleccionado.cantidad > 1) {
            // Si hay más de un curso del mismo tipo,  reducimos la cantidad
            cursoSeleccionado.cantidad--;
        } else {
            // Si hay solo uno, eliminamos el curso 
            carroArray.splice(cursoSeleccionadoIndex, 1);
        }
        actualizarVisualizacionCarrito();
        guardarCarritoLS();
    }
}


function vaciarCarrito() {
    carroArray = [];
    actualizarVisualizacionCarrito();
    guardarCarritoLS();
}



function actualizarVisualizacionCarrito() {
    const listaCarrito = document.getElementById('lista-carrito').getElementsByTagName('tbody')[0];
    listaCarrito.innerHTML = '';
  

    carroArray.forEach(objeto => {
      const tr = document.createElement('tr');
      const tdImg = document.createElement('td');
      const imgCursoCarro = document.createElement('img');
      imgCursoCarro.src = objeto.src;
      tdImg.appendChild(imgCursoCarro);
  
      
      const tdNombre = document.createElement('td');
      tdNombre.textContent = objeto.titulo;
      
      const tdPrecio = document.createElement('td');
      tdPrecio.textContent = objeto.precioBajo;

      const tdCantidad = document.createElement('td');
      tdCantidad.textContent = objeto.cantidad;
      console.log(objeto);

      const tdEliminar = document.createElement('td');
      const btnEliminar = document.createElement('button');

      btnEliminar.textContent = 'Eliminar';
      btnEliminar.classList.add('borrar-curso');
      btnEliminar.setAttribute('data-id', objeto.id);
      tdEliminar.appendChild(btnEliminar);

      tr.appendChild(tdImg);
      tr.appendChild(tdNombre);
      tr.appendChild(tdPrecio);
      tr.appendChild(tdCantidad);
      tr.appendChild(tdEliminar);
  
      listaCarrito.appendChild(tr);
    });
  }


function impObjetosCarro(carroArray){
    const listaCarrito = document.getElementById('lista-carrito').getElementsByTagName('tbody')[0];
    listaCarrito.innerHTML = '';

    carroArray.forEach(objeto => {
        const tr = document.createElement('tr');

        // Celda para la imagen del curso
        const tdImg = document.createElement('td');
        const imgCursoCarro = document.createElement('img');
        imgCursoCarro.src = objeto.src;
        tdImg.appendChild(imgCursoCarro);

        // Celda para el nombre del curso
        const tdNombre = document.createElement('td');
        tdNombre.textContent = objeto.titulo;

        // Celda para el precio del curso
        const tdPrecio = document.createElement('td');
        tdPrecio.textContent = objeto.precioBajo;

        // Celda para la cantidad del curso
        const tdCantidad = document.createElement('td');
        tdCantidad.textContent = objeto.cantidad;

        // Celda con botón para eliminar el curso
        const tdEliminar = document.createElement('td');
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.classList.add('borrar-curso');
        btnEliminar.setAttribute('data-id', objeto.id);
        tdEliminar.appendChild(btnEliminar);

        // Esto agrega las celdas a la fila
        tr.appendChild(tdImg);
        tr.appendChild(tdNombre);
        tr.appendChild(tdPrecio);
        tr.appendChild(tdCantidad);
        tr.appendChild(tdEliminar);

        // Agrega la fila a la lista del carrito
        listaCarrito.appendChild(tr);
    });

}

main();
