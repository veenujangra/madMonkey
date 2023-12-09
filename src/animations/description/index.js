import Animation from '..'
import SplitType from 'split-type'
import gsap from 'gsap'
import { each } from 'lodash'
import CustomEase from 'gsap/CustomEase'

export default class Description extends Animation {
  constructor({ element }) {
    super({ element })
    this.element = element

    this.animationOptions = {
      delay: this.element.getAttribute('data-delay') || 0.0,
      stagger: this.element.getAttribute('data-stagger') || 0.5,
      ease: this.element.getAttribute('data-ease') || 'power1.inOut',
      duration: this.element.getAttribute('data-duration') || 1,
    }

    this.create()
    this.setProperties()
  }

  create() {
    this.text = new SplitType(this.element)

    this.text.lines.forEach((item) => {
      var parent = item.parentNode
      var wrapper = document.createElement('div')
      wrapper.classList.add('line_wrapper')
      parent.replaceChild(wrapper, item)
      wrapper.appendChild(item)
    })
  }

  setProperties() {
    // gsap.set(this.text.words, {
    //   // autoAlpha: 0,
    //   y: '100%',
    // })
    gsap.set(this.text.chars, {
      // autoAlpha: 0,
      y: '120%',
    })
  }

  animateIn() {
    if (this.element.classList.contains('visible')) return

    this.tl = gsap.timeline({
      onComplete: () => {
        this.element.classList.add('visible')
      },
      delay: this.animationOptions.delay,
    })

    gsap.registerPlugin(CustomEase)

    each(this.text.words, (word) => {
      this.tl.fromTo(
        word.parentNode.parentNode,
        {
          filter: 'blur(7px)',
        },
        {
          filter: 'blur(0px)',
          duration: 1.5,
          ease: 'power1.out',
        },
        '<0.04'
      )
      this.tl.fromTo(
        word.children,
        {
          y: '120%',
        },
        {
          y: 0,
          ease: CustomEase.create('custom', 'M0,0 C0.146,0.847 0.492,1 1,1 '),
          stagger: 0.02,
          duration: 1.2,
        },
        '<0.134'
      )
    })
    // this.tl
    //   .fromTo(
    //     this.text.chars,
    //     {
    //       // autoAlpha: 0,

    //       y: '100%',
    //     },
    //     {
    //       // autoAlpha: 1,

    //       y: 0,
    //       ease: this.animationOptions.ease,
    //       stagger: 0.03,
    //       duration: 1.2,
    //       delay: 0.5,
    //     }
    //   )
    //   .fromTo(
    //     this.text.words,
    //     {
    //       // autoAlpha: 0,
    //       filter: 'blur(6px)',
    //       y: '100%',
    //     },
    //     {
    //       // autoAlpha: 1,
    //       filter: 'blur(0px)',
    //       y: 0,
    //       ease: this.animationOptions.ease,
    //       stagger: 0.073,
    //       duration: 1.5,
    //       // duration: this.animationOptions.duration,
    //       // delay: this.animationOptions.delay,
    //     },
    //     '<0.4'
    //   )
  }

  animateOut() {}

  onResize() {
    this.create()
  }
}
