// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
  // Obtener referencias a elementos del DOM
  const numerosInput = document.getElementById("numeros");
  const resultadoOutput = document.getElementById("resultado");

  // Obtener referencias a botones de operación
  const sumarBtn = document.getElementById("sumar");
  const restarBtn = document.getElementById("restar");
  const multiplicarBtn = document.getElementById("multiplicar");
  const divisionBtn = document.getElementById("division");
  const buscarBtn = document.getElementById("buscar");
  const filtrarBtn = document.getElementById("filtrar");

  // Obtener referencias a botones de almacenamiento
  const guardarBtn = document.getElementById("guardar");
  const cargarBtn = document.getElementById("cargar");

  // Asignar eventos a los botones
  sumarBtn.addEventListener("click", () => calcular("suma"));
  restarBtn.addEventListener("click", () => calcular("resta"));
  multiplicarBtn.addEventListener("click", () => calcular("multiplicacion"));
  divisionBtn.addEventListener("click", () => calcular("division"));
  buscarBtn.addEventListener("click", () => buscarNumero(numerosInput.value));
  filtrarBtn.addEventListener("click", () =>
    filtrarNumeros(numerosInput.value)
  );
  guardarBtn.addEventListener("click", () => guardarLista(numerosInput.value));
  cargarBtn.addEventListener("click", () => cargarLista());

  // Funciones de cálculo
  function sumar(a, b) {
    return a + b;
  }

  function restar(a, b) {
    return a - b;
  }

  function multiplicar(a, b) {
    return a * b;
  }

  function dividir(a, b) {
    return b !== 0 ? a / b : "Error: División por cero";
  }

  // Función para buscar un número en la lista
  function buscarNumero(numeros) {
    // Convertir la lista de números a un array
    const numerosArray = numeros.split(",").map(Number);

    const numeroBuscar = parseFloat(numerosInput.value);
    const resultado = numerosArray.includes(numeroBuscar)
      ? `El número ${numeroBuscar} está presente en la lista.`
      : `El número ${numeroBuscar} no está presente en la lista.`;
    mostrarResultado(resultado);
  }

  // Función para filtrar números en la lista según una condición
  function filtrarNumeros(numeros) {
    // Convertir la lista de números a un array
    const numerosArray = numeros.split(",").map(Number);

    const condicionFiltrar = parseFloat(numerosInput.value);
    const resultado = numerosArray.filter((num) => num > condicionFiltrar);
    mostrarResultado("Resultado filtrado: " + resultado.join(", "));
  }

  // Función principal para realizar operaciones y mostrar resultados
  function calcular(operacion) {
    // Obtener la lista de números desde el input y convertirla a un array de números
    const numeros = numerosInput.value.split(",").map(Number);
    let resultado;

    // Realizar la operación seleccionada
    switch (operacion) {
      case "suma":
        resultado = numeros.reduce((acc, num) => acc + num, 0);
        break;
      case "resta":
        resultado = numeros.reduce((acc, num) => acc - num);
        break;
      case "multiplicacion":
        resultado = numeros.reduce((acc, num) => acc * num, 1);
        break;
      case "division":
        resultado = numeros.reduce(
          (acc, num) => (num !== 0 ? acc / num : "Error: División por cero"),
          numeros[0]
        );
        break;
      default:
        resultado = "Operación no válida";
    }

    // Mostrar el resultado en el elemento con el ID "resultado"
    mostrarResultado("Resultado: " + resultado);
  }

  // Función para mostrar el resultado en el elemento correspondiente
  function mostrarResultado(texto) {
    resultadoOutput.textContent = texto;
  }

  // Función para guardar la lista de números en el almacenamiento local
  function guardarLista(numeros) {
    // Convertir la lista de números a un array
    const numerosArray = numeros.split(",").map(Number);
    localStorage.setItem("listaNumeros", JSON.stringify(numerosArray));
    mostrarResultado("Lista de números guardada en localStorage.");
  }

  // Función para cargar la lista de números desde el almacenamiento local
  function cargarLista() {
    const storedNumbers = localStorage.getItem("listaNumeros");
    if (storedNumbers) {
      const numeros = JSON.parse(storedNumbers);
      numerosInput.value = numeros.join(", ");
      mostrarResultado("Lista de números cargada desde localStorage.");
    } else {
      mostrarResultado("No hay lista de números guardada en localStorage.");
    }
  }
});
