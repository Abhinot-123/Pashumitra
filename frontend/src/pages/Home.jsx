import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Home.module.css'
import t from '../translations'

function Home() {
  const navigate = useNavigate()
  const lang = localStorage.getItem('appLanguage') || 'English'
  const tr = t[lang]
  const [showModal, setShowModal] = useState(false)

  const animals = [
    { id: 1, name: 'Cow',     emoji: '🐄', label: tr.cow,     desc: 'Dairy & Farm Cattle' },
    { id: 2, name: 'Goat',    emoji: '🐐', label: tr.goat,    desc: 'Livestock' },
    { id: 3, name: 'Buffalo', emoji: '🐃', label: tr.buffalo, desc: 'Draft Animal' },
    { id: 4, name: 'Poultry', emoji: '🐔', label: tr.poultry, desc: 'Hens & Birds' },
    { id: 5, name: 'Sheep',   emoji: '🐑', label: tr.sheep,   desc: 'Wool & Meat' },
    { id: 6, name: 'Pig',     emoji: '🐖', label: tr.pig,     desc: 'Livestock' },
  ]

  function handleSelect(animal) {
    localStorage.setItem('selectedAnimal', animal.name)
    navigate('/symptoms')
  }

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <h1 className={styles.heroTitle}>
            {tr.heroTitle}<br/>
            <span className={styles.heroHighlight}>{tr.heroHighlight}</span>
          </h1>
          <p className={styles.heroDesc}>{tr.heroDesc}</p>
          <button className={styles.heroBtn} onClick={() => setShowModal(true)}>
            {tr.checkAnimal}
          </button>
        </div>
        <div className={styles.heroRight}>
          <div className={styles.heroCard}>
            <div className={styles.heroCardTop}>
              <span className={styles.liveTag}>{tr.liveCases}</span>
            </div>
            <div className={styles.heroCardItem}>
              <span className={styles.dot} style={{background:'#cc0000'}} />
              <div><strong>Sambalpur, Odisha</strong><p>Anthrax — Critical</p></div>
            </div>
            <div className={styles.heroCardItem}>
              <span className={styles.dot} style={{background:'#b86e00'}} />
              <div><strong>Cuttack, Odisha</strong><p>Fever — Moderate</p></div>
            </div>
            <div className={styles.heroCardItem}>
              <span className={styles.dot} style={{background:'#0f6e56'}} />
              <div><strong>Berhampur, Odisha</strong><p>FMD — Mild</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.animalSection} id="animals">
        <h2 className={styles.sectionTitle}>{tr.whichAnimal}</h2>
        <div className={styles.grid}>
          {animals.map((animal) => (
            <div key={animal.id} className={styles.card} onClick={() => handleSelect(animal)}>
              <span className={styles.emoji}>{animal.emoji}</span>
              <span className={styles.animalName}>{animal.label}</span>
              <span className={styles.animalDesc}>{animal.desc}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.howSection}>
        <h2 className={styles.sectionTitle}>{tr.howItWorks}</h2>
        <div className={styles.stepsGrid}>
          <div className={styles.step}>
            <div className={styles.stepNum}>1</div>
            <h3>{tr.step1Title}</h3>
            <p>{tr.step1Desc}</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNum}>2</div>
            <h3>{tr.step2Title}</h3>
            <p>{tr.step2Desc}</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNum}>3</div>
            <h3>{tr.step3Title}</h3>
            <p>{tr.step3Desc}</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNum}>4</div>
            <h3>{tr.step4Title}</h3>
            <p>{tr.step4Desc}</p>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>{tr.footer}</p>
      </footer>

      {showModal && (
        <div className={styles.overlay} onClick={() => setShowModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>{tr.selectAnimal}</h3>
              <button className={styles.closeBtn} onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className={styles.modalGrid}>
              {animals.map((animal) => (
                <div key={animal.id} className={styles.modalCard} onClick={() => handleSelect(animal)}>
                  <span className={styles.modalEmoji}>{animal.emoji}</span>
                  <span className={styles.modalAnimalName}>{animal.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default Home