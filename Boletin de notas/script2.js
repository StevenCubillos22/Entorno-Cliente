document.addEventListener("DOMContentLoaded", function () {
    const notasArray = [];

    const cargarNotasButton = document.getElementById("cargarNotas");
    const borrarNotasButton = document.getElementById("borrarNotas");
    const buttonPromedio = document.getElementById("buttonPromedio");
    const buttonNotaAlta = document.getElementById("buttonNotaAlta");
    const buttonAlgunSuspenso = document.getElementById("buttonAlgunSuspenso");
    const notasList = document.getElementById("notasList");
    const tituloH4 = document.getElementById("tituloH4");
    const resultadoElement = document.getElementById("resultado");

    function cargarNotas() {
        for (let i = 0; i < 9; i++) {
            notasArray.push(Math.floor(Math.random() * 11));
        }

        notasList.innerHTML = "";
        notasArray.forEach(nota => {
            const li = document.createElement("li");
            li.textContent = nota;
            notasList.appendChild(li);
        });
        
        

        cargarNotasButton.classList.add("disabled");
        borrarNotasButton.classList.remove("disabled");
        buttonPromedio.classList.remove("disabled");
        buttonNotaAlta.classList.remove("disabled");
        buttonAlgunSuspenso.classList.remove("disabled");
    }

    function borrarNotas() {
        notasArray.length = 0;
        notasList.innerHTML = "";
        resultadoElement.textContent = "Notas borradas.";

        cargarNotasButton.classList.remove("disabled");
        borrarNotasButton.classList.add("disabled");
        buttonPromedio.classList.add("disabled");
        buttonNotaAlta.classList.add("disabled");
        buttonAlgunSuspenso.classList.add("disabled");
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

    cargarNotasButton.addEventListener("click", cargarNotas);
    borrarNotasButton.addEventListener("click", borrarNotas);
    buttonPromedio.addEventListener("click", calcularPromedio);
    buttonNotaAlta.addEventListener("click", obtenerNotaAlta);
    buttonAlgunSuspenso.addEventListener("click", numeroSuspensos);
});
