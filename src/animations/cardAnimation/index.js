import { each } from 'lodash'
import Animation from '..'
import gsap from 'gsap'
import CustomEase from 'gsap/CustomEase'

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
    this.tl = gsap.timeline({ delay: 0.3 })
    this.tl
      .to(this.elements[0], {
        x: '-50rem',
        duration: 1,
        ease: 'back.out(1.7)',
      })
      .to(
        this.elements[2],
        {
          x: '50rem',
          duration: 1,
          ease: 'back.out(1.7)',
        },
        '-=1'
      )
  }

  animateOut() {
    this.setAnimation()
    // this.tl = gsap.timeline({ duration: 0 })
    // this.tl
    //   .to(this.elements[0], {
    //     rotateZ: '-15deg',
    //     x: '-15rem',
    //   })
    //   .to(
    //     this.elements[2],
    //     {
    //       rotateZ: '15deg',
    //       x: '15rem',
    //     },
    //     '-=1'
    //   )
  }

  onResize() {}
}
