import './style.scss'
import Page from './src/Page'
import Navigation from './src/navbar'
import Preloader from './src/preloader'

class App {
  constructor(options) {
    this.element = options.main

    this.createPreloader()
    this.createNavigation()

    this.createPage()
    this.addEventListeners()
  }

  createPreloader() {
    this.preloader = new Preloader({
      element: '.preloader_wrapper',
      elementMedia: '.preloader_media',
      elementVideo: '#preloader-video',
      heroVideo: '#hero_video',
      preloaderTitle: '.preloader_title',
      playButton: '.home_hero_video_play_button',
    })
  }

  createNavigation() {
    this.navigation = new Navigation({
      element: '.navbar',
    })
  }

  createPage() {
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
