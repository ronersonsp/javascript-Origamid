export default function initAnimaNumeros() {
  function animaNumeros() {
    const numeros = document.querySelectorAll('[data-numero]');

    numeros.forEach((numero) => {
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
    });
  }

  let observer;
  function handleMutantion(mutation) {
    if (mutation[0].target.classList.contains('ativo')) {
      observer.disconnect();
      animaNumeros();
    }
  }
  observer = new MutationObserver(handleMutantion);

  const observerTarget = document.querySelector('.numeros');
  observer.observe(observerTarget, { attributes: true });
}
