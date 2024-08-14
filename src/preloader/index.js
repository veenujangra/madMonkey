import gsap from 'gsap'
import { each } from 'lodash'
import SplitType from 'split-type'
import CustomEase from 'gsap/CustomEase'

export default class Preloader {
  constructor(options) {
    if (window.location.pathname === '/') {
      window.scrollTo(0, 0)

      this.element = document.querySelector(options.element)
      this.elementMedia = document.querySelector(options.elementMedia)
      // this.video = document.querySelector(options.elementVideo)
      this.elementImage = this.elementMedia.querySelector('img')
      this.heroVideoElement = document.querySelector(options.heroVideo)
      this.preloaderTitle = document.querySelector(options.preloaderTitle)
      this.playButton = document.querySelector(options.playButton)

      this.initTitle()
      this.set()

      this.create()
    } else {
      this.loadWithoutPreloader()
    }
  }

  loadWithoutPreloader() {
    // await document.fonts.ready

    document.documentElement.classList.add('loaded')
  }

  async loadMedia() {
    this.mediaPromises = []
    this.mediaPromises.push(
      new Promise((resolve, rej) => {
        this.image = new Image()
        this.image.onload = () => {
          this.elementMedia.replaceChild(this.image, this.elementImage)
          resolve()
        }
        this.image.src = this.elementImage.src
      })
    )
    this.mediaPromises.push(
      new Promise((res, rej) => {
        this.heroVideoElement.load()

        this.heroVideoElement.addEventListener('canplaythrough', () => {
          res()
        })
        this.heroVideoElement.addEventListener('error', function () {
          rej(this.heroVideoElement)
        })
      })
    )

    // this.mediaPromises.push(
    //   new Promise((res, rej) => {
    //     this.video.load()

    //     this.video.addEventListener('canplaythrough', () => {
    //       res()
    //     })
    //     this.video.addEventListener('error', function () {
    //       rej(this.video)
    //     })
    //   }).then(() => {
    //     this.video.play()
    //   })
    // )
    // await document.fonts.ready

    return Promise.all(this.mediaPromises)
  }

  create() {
    // await this.loadMedia()

    // this.animateIn()
    this.animateOut()
  }

  set() {
    each(this.text.words, (word) => {
      this.tl.set(word.parentNode.parentNode, {
        filter: 'blur(7px)',
      })
      this.tl.set(word.children, {
        y: '120%',
      })
    })
  }

  initTitle() {
    this.tl = gsap.timeline()

    this.text = new SplitType(this.preloaderTitle)

    this.text.lines.forEach((item) => {
      var parent = item.parentNode
      var wrapper = document.createElement('div')
      wrapper.classList.add('line_wrapper')
      parent.replaceChild(wrapper, item)
      wrapper.appendChild(item)
    })

    // Adding more titles
    // for (let i = 0; i < 10; i++) {
    //   const clone = this.preloaderTitle.cloneNode(true)
    //   this.element.appendChild(clone)
    // }

    // this.preloaderTitles = [...document.querySelectorAll('.preloader_title')]

    // each(this.preloaderTitles, (title, index) => {
    //   const pos_y = Math.trunc(((Math.floor(this.preloaderTitles.length / 2) - index) * this.preloaderTitles.length) / 10)

    //   this.tl.set(title, {
    //     y: `${pos_y * 100}%`,
    //   })
    // })
  }

  animateIn() {
    this.tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          this.animateOut()
        }, 1000)
      },
    })

    this.tl.fromTo(
      this.elementMedia,
      {
        width: '100%',
        height: '100%',
        borderRadius: '0rem',
      },
      {
        width: '55rem',
        height: '65rem',
        borderRadius: '2rem',
        duration: 0.8,
        ease: 'power4.out',
        delay: 0.8,
      }
    )
  }

  animateOut() {
    this.elementMedia.remove()
    // this.video.parentNode.remove()

    this.tl = gsap.timeline({
      onComplete: () => {
        this.heroAnimation()
      },
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

    // this.tl.fromTo(
    //   this.text.chars.reverse(),
    //   {
    //     autoAlpha: 0,
    //     y: 10,
    //   },
    //   {
    //     autoAlpha: 1,
    //     y: 0,
    //     ease: 'power4.out',
    //     stagger: 0.05,
    //     duration: 0.4,
    //     delay: 1,
    //   }
    // )
  }

  heroAnimation() {
    this.element.style.backgroundColor = 'transparent'

    this.tl = gsap.timeline({
      onStart: () => {
        this.heroVideoElement.play()
      },
      onComplete: () => {
        this.element.remove()
        document.documentElement.classList.add('loaded')
      },
    })

    this.tl
      .fromTo(
        this.heroVideoElement.parentNode.parentNode,
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
        }
      )
      .fromTo(
        this.heroVideoElement.parentNode.parentNode,
        {
          width: '55rem',
          height: '65rem',
          borderRadius: '2rem',
        },
        {
          width: '172.8rem',
          height: '108rem',
          borderRadius: '0rem',
          duration: 0.6,
          ease: 'power4.out',
          delay: 0.5,
        }
      )
      // .to(
      //   this.preloaderTitles,
      //   {
      //     y: 0,
      //     duration: 1,
      //     ease: 'power4.in',
      //   },
      //   '<-1.5'
      // )
      // .to(this.preloaderTitles, {
      //   autoAlpha: 0,
      //   duration: 0.8,
      //   ease: 'power4.out',
      // })
      .fromTo(
        this.text.chars,
        {
          y: 0,
          autoAlpha: 1,
        },
        {
          autoAlpha: 0,
          y: 10,
          ease: 'power4.out',
          stagger: 0.05,
          duration: 0.8,
          delay: 0,
        }
      )
      .fromTo(
        this.playButton,
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          duration: 0.4,
          ease: 'power4.out',
        }
      )
  }
}
