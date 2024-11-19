import React, { useEffect } from 'react'
import Styles from '@/app/styles/Overview.module.css'
import { animateCameraOnScroll } from './HelperFunctions'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMapContext } from './MapContext'

gsap.registerPlugin(ScrollTrigger)

const OverviewSection = () => {
  const { isSteady } = useMapContext()

  useEffect(() => {
    if (isSteady) {
      const gmpMap = document.querySelector('gmp-map-3d')

      if (!gmpMap) return
      const startHeading = Number(gmpMap.getAttribute('heading'))
      const scrollTrigger = ScrollTrigger.create({
        trigger: '#guide-section',
        start: 'top top',
        onEnter: () =>
          animateCameraOnScroll(
            [35.36601796700356, 138.7093136489788, 2724.821138908544],
            0,
            startHeading,
            10275.180125104962,
            '#guide-section',
            'out'
          ),
        onLeaveBack: () =>
          console.log('Target element left the top of the viewport'),
      })

      // Cleanup on component unmount
      return () => {
        scrollTrigger.kill()
      }
    }
  }, [isSteady])

  return (
    <section id="guide-section" className={Styles.guideSection}>
      <div className={Styles.guideContainer}>
        <div className={Styles.guideHeading}>
          <div className="gsap-text-container">
            <h2 id="guide-title">Pathways to the Peak</h2>
          </div>
          <h6>A guide to climbing Mt Fuji</h6>
          <div id="guide-text" className={Styles.guideText}>
            <p>
              Hiking Mount Fuji is a transformative journey, blending natural
              beauty, cultural reverence, and personal achievement. As Japan’s
              tallest peak and a UNESCO World Heritage site, Mount Fuji offers
              more than just scenic views; it’s a pilgrimage that allows hikers
              to connect deeply with Japanese culture and nature. Each trail –
              from the popular Yoshida to the less-trodden Gotemba – offers a
              unique experience, with varied landscapes, challenges, and
              viewpoints.
            </p>
            <p>
              Choosing the right trail is key. Beginners might favor the Yoshida
              Trail for its amenities and steady incline, while experienced
              hikers may enjoy the more challenging Subashiri or Gotemba routes.
              Consider your fitness level, time, and desired experience when
              selecting your path, ensuring a rewarding journey to the summit.
            </p>
          </div>
          <h3>When to Climb?</h3>
          <div id="guide-season" className={Styles.guideSeason}>
            <p>
              From July to mid-September, Japan experiences its summer season,
              marked by warm temperatures and high humidity. This period follows
              the end of the *tsuyu* rainy season in mid-July, bringing clear
              skies and lush landscapes. Summer is also the official climbing
              season for Mount Fuji, with milder temperatures and safer
              conditions for hikers. However, while it’s hot and humid at lower
              elevations, temperatures at the mountain’s summit can still be
              quite cool, so hikers should be prepared for rapid weather changes
              as they ascend.
            </p>
            <div>
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g transform="translate(-14)" fill="none" fillRule="evenodd">
                  <g fill="#FC6220" fillRule="nonzero">
                    <path d="M26.247 5.443a6.872 6.872 0 00-6.869 6.869 6.872 6.872 0 006.87 6.869c3.79-.033 6.868-3.11 6.868-6.869a6.872 6.872 0 00-6.869-6.869zm0 13.057a6.222 6.222 0 01-6.22-6.22 6.222 6.222 0 016.22-6.221c3.435 0 6.221 2.819 6.221 6.253s-2.786 6.188-6.22 6.188zM26.247 3.92c.195 0 .324-.13.324-.324V.583c0-.194-.13-.324-.324-.324s-.324.13-.324.324v3.013c0 .195.162.324.324.324zM30.394 5.022a.292.292 0 00.162.032.387.387 0 00.292-.162l1.49-2.624c.098-.162.033-.356-.13-.454-.161-.097-.356-.032-.453.13l-1.49 2.624c-.097.195-.033.39.13.454zM33.894 8.165l2.592-1.523c.162-.097.194-.292.13-.454-.098-.162-.292-.194-.454-.13L33.57 7.583c-.162.097-.195.291-.13.453a.34.34 0 00.292.162c.064 0 .097-.032.162-.032zM37.944 11.761l-3.014.065a.325.325 0 00-.324.324c0 .162.162.324.324.324l3.014-.065a.325.325 0 000-.648zM36.68 17.626L34.023 16.2c-.162-.097-.356-.032-.453.13-.098.162-.033.356.13.453l2.656 1.458c.065.033.097.033.162.033a.34.34 0 00.292-.162c.064-.195.032-.39-.13-.486zM31.075 19.537c-.097-.162-.292-.194-.454-.097-.162.097-.194.292-.097.454l1.588 2.56a.34.34 0 00.291.161c.065 0 .13 0 .162-.032.162-.097.195-.292.097-.454l-1.587-2.592zM26.539 20.639a.325.325 0 00-.324.324l.097 3.013c0 .162.162.324.324.324a.325.325 0 00.324-.324l-.097-3.013a.348.348 0 00-.324-.324zM22.36 19.7c-.163-.098-.357-.033-.454.129l-1.394 2.657c-.097.162-.032.356.13.453.032.033.097.033.162.033a.34.34 0 00.292-.162l1.393-2.657c.097-.195.032-.389-.13-.454zM18.763 16.686l-2.527 1.62c-.162.097-.195.292-.098.454.065.097.162.162.26.162.064 0 .13-.033.162-.065l2.527-1.62c.162-.097.194-.292.097-.454-.065-.13-.26-.194-.421-.097zM17.888 12.7c0-.194-.162-.323-.324-.29l-3.013.161c-.195 0-.324.162-.292.324 0 .162.162.324.324.324h.033l3.013-.162c.13 0 .291-.162.259-.356zM15.652 7.29l2.69 1.36c.032.033.097.033.162.033a.34.34 0 00.291-.162c.065-.162.033-.356-.13-.421l-2.721-1.36c-.162-.066-.356-.033-.421.129-.097.162-.033.356.13.421zM21.193 5.249c.065.097.162.13.259.13.065 0 .13-.033.194-.065.162-.098.195-.292.098-.454L20.09 2.333c-.097-.162-.291-.195-.453-.097-.162.097-.195.291-.098.453l1.653 2.56z"></path>
                  </g>
                </g>
              </svg>
              <h4>Summer</h4>
              <p>30–35°C </p>
            </div>
          </div>
        </div>
        <div id="guide-image" className={Styles.guideImage}>
          <img src="/images/climb-fuji.jpeg" alt="Height" />
        </div>
      </div>
    </section>
  )
}

export default OverviewSection
