import { each } from 'lodash'
import Animation from '..'
import gsap from 'gsap'

export default class CardAnimation extends Animation {
  constructor({ element }) {
    super({ element })
    this.element = element

    this.create()
    this.setAnimation()
  }

  create() {
    this.elements = []
    each(this.element.childNodes, (element) => {
      this.elements.push(element)
    })
  }

  setAnimation() {
    gsap.set(this.elements[0], {
      rotateZ: '-15deg',
      x: '-15rem',
    })

    gsap.set(this.elements[1], {
      rotateZ: '0deg',
      y: '-15rem',
    })

    gsap.set(this.elements[2], {
      rotateZ: '15deg',
      x: '15rem',
    })
  }

  animateIn() {
    this.tl = gsap.timeline({ delay: 0.2 })
    this.tl
      .to(this.elements[0], {
        x: '-50rem',
        duration: 1,
        ease: 'Power1.easeInOut',
      })
      .to(
        this.elements[2],
        {
          x: '50rem',
          duration: 1,
          ease: 'Power1.easeInOut',
        },
        '-=1'
      )
  }

  animateOut() {
    this.tl = gsap.timeline({ duration: 0 })
    this.tl
      .to(this.elements[0], {
        rotateZ: '-15deg',
        x: '-15rem',
      })
      .to(
        this.elements[2],
        {
          rotateZ: '15deg',
          x: '15rem',
        },
        '-=1'
      )
  }

  onResize() {}
}
