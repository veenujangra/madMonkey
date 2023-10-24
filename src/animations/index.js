export default class Animation {
  constructor(options) {
    this.element = options.element

    this.createObserver()
    this.addEventListener()
  }

  createObserver() {
    this.observerOptions = {
      rootMargin: this.element.getAttribute('data-root-margin') || '0px 0px 0px 0px',
      threshold: this.element.getAttribute('data-threshold') || 0,
    }

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.animateIn()
        } else {
          this.animateOut()
        }
      })
    }, this.observerOptions)

    this.observer.observe(this.element)
  }

  animateIn() {}
  animateOut() {}

  addEventListener() {
    window.addEventListener('resize', this.onResize.bind(this))
  }
}
