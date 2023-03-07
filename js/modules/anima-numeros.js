export default class AnimaNumeros {
  constructor(numeros, observerTarget, observerClass) {
    this.numeros = document.querySelectorAll(numeros);
    this.observerTarget = document.querySelector(observerTarget);
    this.observerClass = observerClass;
    this.handleMutantion = this.handleMutantion.bind(this);
  }

  // Recebe um elemento do DOM contendo número em seu texto
  // E incremendta do start de incremento em incremento até o total
  static incermentarNumero(numero) {
    const total = +numero.innerText;
    const incremento = Math.floor(total / 80);
    const max = 40;
    const min = 25;
    let start = 0;
    const timer = setInterval(() => {
      start += incremento;
      numero.innerText = start;
      if (start > total) {
        numero.innerText = total;
        clearInterval(timer);
      }
    }, Math.random() * (max - min + 1) + min);
  }

  // Ativa o incrementar número para cada item
  animaNumeros() {
    this.numeros.forEach((numero) => this.constructor.incermentarNumero(numero));
  }

  // Ocorre a cada mutação
  handleMutantion(mutation) {
    if (mutation[0].target.classList.contains(this.observerClass)) {
      this.observer.disconnect();
      this.animaNumeros();
    }
  }

  // Adiciona o MutationObserver para verificar
  // quando a classe é adicionada ao elemento
  addMutationObserver() {
    this.observer = new MutationObserver(this.handleMutantion);
    this.observer.observe(this.observerTarget, { attributes: true });
  }

  init() {
    if (this.numeros.length && this.observerTarget) {
      this.addMutationObserver();
    }
    return this;
  }
}
