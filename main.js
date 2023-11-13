import './style.scss'
import Page from './src/Page'
import Navigation from './src/navbar'

class App {
  constructor(options) {
    this.element = options.main

    this.createPreloader()
    this.createNavigation()

    this.createPage()
    this.addEventListeners()
  }

  createPreloader() {}

  createNavigation() {
    this.navigation = new Navigation({
      element: '.navbar',
    })
  }

  async createPage() {
    await document.readyState
    await document.fonts.ready

    document.documentElement.classList.add('loaded')

    this.page = new Page({
      element: this.element,
    })

    this.page.create()
    this.page.show()
  }

  addEventListeners() {
    window.addEventListener('resize', this.onResize.bind(this))
  }

  onResize() {
    if (this.page && this.page.onResize) {
      this.page.onResize()
    }
  }
}

new App({ main: '.main' })
