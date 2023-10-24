import Animation from '..'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default class ColorTransition {
  constructor({ element }) {
    this.element = element
    this.color = this.determineColor()

    // this.prevColor = window.getComputedStyle(document.body, null).getPropertyValue('background-color') === 'rgb(0, 0, 0)' ? '#000' : '#000'
    this.create()
  }

  determineColor() {
    this.colorCode = this.element.getAttribute('data-color')

    if (this.colorCode === '#000') {
      return 'black'
    } else if (this.colorCode === '#C0FF4A') {
      return 'green'
    } else if (this.colorCode === '#FFFEF2') {
      return 'white'
    }
  }

  create() {
    gsap.registerPlugin(ScrollTrigger)

    ScrollTrigger.create({
      trigger: this.element,
      start: 'top center',
      end: 'bottom center',
      onToggle: () => {
        document.body.classList.toggle(this.color)
      },
    })
  }

  animateIn() {
    this.tl = gsap.timeline({})

    this.tl.to(document.body, {
      backgroundColor: this.color,
      // onComplete: () => {
      //   document.body.classList.add(this.color)
      //   document.body.classList.remove(this.prevColor)
      // },
    })
  }

  animateOut() {
    this.tl = gsap.timeline({})

    this.tl.to(document.body, {
      backgroundColor: this.prevColor,
      onComplete: () => {
        document.body.classList.remove(this.color)
        document.body.classList.add(this.prevColor)
      },
    })
  }

  onResize() {}
}
