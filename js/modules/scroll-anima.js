import debounce from './debounce.js';

export default class ScrollAnima {
  constructor(sections) {
    this.sections = document.querySelectorAll(sections);
    this.windowScroll = window.innerHeight * 0.6;

    this.checkDistance = debounce(this.checkDistance.bind(this), 50);
  }

  // Pega a distancia de cada item ao topo do site
  getDistance() {
    this.distance = [...this.sections].map((section) => {
      const offset = section.offsetTop;
      return {
        element: section,
        offset: Math.floor(offset - this.windowScroll),
      };
    });
  }

  // Verifica a distancia de cada objeto
  // em relação ao scroll do site
  checkDistance() {
    this.distance.forEach((section) => {
      if (window.pageYOffset > section.offset) {
        section.element.classList.add('ativo');
      } else if (section.element.classList.contains('ativo')) {
        section.element.classList.remove('ativo');
      }
    });
  }

  init() {
    if (this.sections.length) {
      this.getDistance();
      this.checkDistance();
      window.addEventListener('scroll', this.checkDistance);
    }
    return this;
  }

  // Remove o evento do scroll
  stop() {
    window.removeEventListener('scroll', this.checkDistance);
  }
}
