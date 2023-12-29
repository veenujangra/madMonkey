import gsap from 'gsap'
import { each, map } from 'lodash'

export default class FeaturedClients {
  constructor(options) {
    this.wrapper = options.element
    this.visibleList = this.wrapper.querySelector('[data-wrapper]')

    // this.create()
    //setInterval(this.imageLoop.bind(this), 500)
    // this.imageLoop()
  }

  create() {
    this.list = this.wrapper.querySelectorAll('[data-src] img')
    this.src = []
    this.src = map(this.list, (item) => {
      return { src: item.src, visible: false }
    })

    for (let i = 0; i < 6; i++) {
      this.visibleList.appendChild(this.list[i].parentNode)
      this.src[i].visible = true
    }

    this.targetList = this.wrapper.querySelectorAll('[data-wrapper] img')
  }

  imageLoop() {
    const randomTarget = Math.floor(1 + Math.random() * this.targetList.length) - 1
    const srcTarget = Math.floor(1 + Math.random() * this.src.length) - 1

    console.log('Target ' + randomTarget + '\n' + 'Src ' + srcTarget)

    this.tl = gsap.timeline()

    if (this.src[srcTarget].visible) {
      return
    }

    this.tl.to(this.targetList[randomTarget], {
      onStart: () => {
        this.src[randomTarget].visible = false
      },
      autoAlpha: 0,
      duration: 0.8,
      y: -10,
      delay: 5,
      ease: 'power4.in',
      onComplete: () => {
        this.targetList[randomTarget].src = this.src[srcTarget].src
        this.src[srcTarget].visible = true
      },
    })
    this.tl.set(this.targetList[randomTarget], {
      y: 10,
    })
    this.tl.to(this.targetList[randomTarget], {
      autoAlpha: 1,
      duration: 0.3,
      y: 0,
    })
  }
}
