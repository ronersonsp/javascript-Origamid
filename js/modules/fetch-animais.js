import AnimaNumeros from './anima-numeros.js';

export default function fetchAnimais(url, target) {
  // Cria div contendo as informações de cada animal
  function createAnimal(animal) {
    const div = document.createElement('div');
    div.classList.add('numero-animal');
    div.innerHTML = `<h3>${animal.specie}</h3> <span data-numero="">${animal.total}</span>`;
    return div;
  }

  // Preenche cada animal no DOM
  const numerosGrid = document.querySelector(target);
  function preencherAnimais(animal) {
    const divAnimal = createAnimal(animal);
    numerosGrid.appendChild(divAnimal);
  }

  function animaAnimaisNumeros() {
    const animaNumeros = new AnimaNumeros('[data-numero]', '.numeros', 'ativo');
    animaNumeros.init();
  }

  // Puxa os dados dos animais através de um json
  // e cria cada animal utilizando o createAnimal()
  async function criarAnimais() {
    try {
      // Faz o Fetch, espera a resposta
      // e transforma a resposta em json
      const animaisResponse = await fetch(url);
      const animaisJSON = await animaisResponse.json();

      // Após ser transformado em json, preenche e anima os numeros
      animaisJSON.forEach((animal) => preencherAnimais(animal));
      animaAnimaisNumeros();
    } catch (error) {
      console.log(error);
    }
  }
  return criarAnimais('../animaisapi.json');
}
