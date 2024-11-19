import React from 'react'
import Styles from '@/app/styles/Footer.module.css'
import Logo from './Logo'

const Footer = () => {
  return (
    <footer className={Styles.footer}>
      <Logo />
      <div>
        <h3>About</h3>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit
          explicabo eveniet ratione a maxime doloribus pariatur quisquam
          architecto numquam incidunt. Tempore et qui blanditiis recusandae!
        </p>
      </div>
      <div>
        <h3>Contact Me</h3>
        <ul>
          <li>
            {' '}
            <a href="tel:+917993095402">+91 7993095402</a>
          </li>
          <li>
            {' '}
            <a href="mailto:zu0827992@gmail.com">zu0827992@gmail.com</a>
          </li>
          <li>
            <a href="https://github.com/username">GitHub</a>
          </li>
          <li>
            <a href="https://github.com/username">LinkedIn</a>
          </li>
          <li>
            <a href="https://github.com/username">Instagram</a>
          </li>
        </ul>
      </div>
      <div>
        <h3>Links & Resources</h3>
        <ul>
          <li>
            <a href="https://www.fujisan-climb.jp/en/">
              Official Website for Mt Fuji
            </a>
          </li>
          <li>
            <a href="https://www.google.com/maps">Google Maps</a>
          </li>
          <li>
            <a href="https://www.japan-guide.com/e/e6901.html">Japan Guide</a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
