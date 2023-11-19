import Animation from '..'
import gsap from 'gsap'

export default class ImageAnimation extends Animation {
  constructor({ element }) {
    super({ element })
    this.element = element

    this.animationOptions = {
      delay: this.element.getAttribute('data-delay') || 0,
      stagger: this.element.getAttribute('data-stagger') || 0.2,
      ease: this.element.getAttribute('data-ease') || 'Power1.easeOut',
      duration: this.element.getAttribute('data-duration') || 1,
    }

    this.create()
    this.setProperties()
  }

  create() {
    this.text = this.element
  }

  setProperties() {
    gsap.set(this.text, {
      autoAlpha: 0,
    })
  }

  animateIn() {
    if (this.element.classList.contains('visible')) return

    this.tl = gsap.timeline({
      onComplete: () => {
        this.element.classList.add('visible')
      },
    })

    this.tl.fromTo(
      this.text,
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
        ease: this.animationOptions.ease,
        duration: this.animationOptions.duration,
        delay: this.animationOptions.delay,
      }
    )
  }

  animateOut() {}

  onResize() {}
}
