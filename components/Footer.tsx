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
          Daryaft (دریافت), an Urdu word meaning &quot;to explore&quot; and
          &quot;to discover,&quot; embodies the essence of this website. It is
          designed to guide users in exploring Mount Fuji, its trails, and the
          experiences surrounding it.
          <br />
          <i>
            This project was created as a submission for &quot;Google
            Photorealistic 3D Maps Challenge&quot;.
          </i>
        </p>
      </div>
      <div>
        <h3>Contact Me</h3>
        <ul>
          <li>
            <a href="tel:+917993095402">+91 7993095402</a>
          </li>
          <li>
            {' '}
            <a href="mailto:zu0827992@gmail.com">zu0827992@gmail.com</a>
          </li>
          <li>
            <a href="https://github.com/Zeeyeah">GitHub</a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/ziya-uddin-70622a24b/">
              LinkedIn
            </a>
          </li>
          <li>
            <a href="https://instagram.com/zeeyeahaha">Instagram</a>
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
