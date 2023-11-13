import gsap from 'gsap'

export default class Navigation {
  constructor(options) {
    this.element = document.querySelector(options.element)
    this.menuWrapper = '.nav_menu_wrapper'
    this.menuButton = '.menu_button'

    this.create()
    this.addEventListeners()
  }

  create() {
    gsap.set(this.menuWrapper, {
      height: 0,
    })
  }

  addEventListeners() {
    this.element.addEventListener('click', this.onClick.bind(this))
  }

  onClick(event) {
    const target = event.target.closest(this.menuButton) || 0
    if (target) {
      this.menuToggle()
      document.documentElement.classList.toggle('nav_open')
    }
  }

  menuToggle() {
    this.tl = gsap.timeline()

    // Open
    if (!document.documentElement.classList.contains('nav_open')) {
      this.tl.fromTo(
        this.menuWrapper,
        {
          height: 0,
        },
        {
          height: '100vh',
          duration: 0.8,
          ease: 'Power2.easeOut',
        }
      )
    }
    // Close
    else {
      this.tl.to(this.menuWrapper, {
        height: 0,
        duration: 0.5,
        ease: 'Power2.easeIn',
      })
    }
  }
}
