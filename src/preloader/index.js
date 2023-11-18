import gsap from 'gsap'
import SplitType from 'split-type'

export default class Preloader {
  constructor(options) {
    if (window.location.pathname === '/') {
      this.element = document.querySelector(options.element)
      this.elementMedia = document.querySelector(options.elementMedia)
      this.video = document.querySelector(options.elementVideo)
      this.elementImage = this.elementMedia.querySelector('img')
      this.heroVideoElement = document.querySelector(options.heroVideo)
      this.preloaderTitle = document.querySelector(options.preloaderTitle)

      this.create()
    } else {
      this.loadWithoutPreloader()
    }
  }

  async loadWithoutPreloader() {
    await document.readyState
    await document.fonts.ready

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

    this.mediaPromises.push(
      new Promise((res, rej) => {
        this.video.load()

        this.video.addEventListener('canplaythrough', () => {
          res()
        })
        this.video.addEventListener('error', function () {
          rej(this.video)
        })
      }).then(() => {
        this.video.play()
      })
    )
    await document.readyState
    await document.fonts.ready

    return Promise.all(this.mediaPromises)
  }

  async create() {
    await this.loadMedia()
    this.animateIn()
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
    this.video.parentNode.remove()

    this.text = new SplitType(this.preloaderTitle)

    this.text.lines.forEach((item) => {
      var parent = item.parentNode
      var wrapper = document.createElement('div')
      wrapper.classList.add('line_wrapper')
      parent.replaceChild(wrapper, item)
      wrapper.appendChild(item)
    })

    this.tl = gsap.timeline({
      onComplete: () => {
        this.heroAnimation()
      },
    })

    this.tl.fromTo(
      this.text.chars.reverse(),
      {
        autoAlpha: 0,
        y: 10,
      },
      {
        autoAlpha: 1,
        y: 0,
        ease: 'power4.out',
        stagger: 0.05,
        duration: 0.4,
        delay: 0,
      }
    )
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
      .fromTo(
        this.text.chars,
        {
          autoAlpha: 1,
          y: 0,
        },
        {
          autoAlpha: 0,
          y: 10,
          ease: 'power4.out',
          stagger: 0.05,
          duration: 0.4,
          delay: 0,
        }
      )
  }
}
