document.addEventListener("DOMContentLoaded", function () {
  const notasArray = []; // Aquí deberías tener tus notas almacenadas

    const cargarNotasButton = document.getElementById("cargarNotas");
    const buttonPromedio = document.getElementById("buttonPromedio");
    const buttonNotaAlta = document.getElementById("buttonNotaAlta");
    const buttonAlgunSuspenso = document.getElementById("buttonAlgunSuspenso");
    const notasList = document.getElementById("notasList");
    const tituloH4 = document.getElementById("tituloH4");
    const resultadoElement = document.getElementById("resultado");

    function cargarNotas() {
        // Puedes cargar las notas desde algún lugar o generarlas aleatoriamente
        // Ejemplo de generación aleatoria de notas entre 0 y 10
        

        
        for (let i = 0; i < 9; i++) {
            notasArray.push(Math.floor(Math.random() * 11));
        }

        // Limpiar la lista y agregar las notas
        notasList.innerHTML = "";
        notasArray.forEach(nota => {
            const li = document.createElement("li");
            li.textContent = nota;
            notasList.appendChild(li);
        });

        // Configurar el texto del h4
        tituloH4.textContent = "Notas del Boletín";

        resultadoElement.textContent = "Notas cargadas.";
        
    }

    function calcularPromedio() {
        const promedio = notasArray.reduce((acc, nota) => acc + nota, 0) / notasArray.length;
        resultadoElement.textContent = `El promedio es: ${promedio.toFixed(2)}`;
    }

    function obtenerNotaAlta() {
        const notaAlta = Math.max(...notasArray);
        resultadoElement.textContent = `La nota más alta es: ${notaAlta}`;
    }

    function numeroSuspensos() {
        const suspensos = notasArray.filter(nota => nota < 5).length;
        resultadoElement.textContent = `Número de suspensos: ${suspensos}`;
    }

    function reset() { 
      
      resultadoElement.textContent = "";
  }

    cargarNotasButton.addEventListener("click", cargarNotas);
    buttonPromedio.addEventListener("click", calcularPromedio);
    buttonNotaAlta.addEventListener("click", obtenerNotaAlta);
    buttonAlgunSuspenso.addEventListener("click", numeroSuspensos);
});