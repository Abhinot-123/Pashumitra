import { useNavigate, useLocation } from 'react-router-dom'
import styles from './Navbar.module.css'
import t from '../translations'

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const lang = localStorage.getItem('appLanguage') || 'English'
  const tr = t[lang]

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.inner}>
          <div className={styles.brand} onClick={() => navigate('/')}>
            <div className={styles.logoIcon}>🐄</div>
            <div className={styles.logoText}>
              <span className={styles.logoName}>PashuMitra</span>
              <span className={styles.logoTagline}>Animal Health Assistant</span>
            </div>
          </div>

          <div className={styles.links}>
            <button className={`${styles.link} ${location.pathname === '/' ? styles.active : ''}`} onClick={() => navigate('/')}>{tr.home}</button>
            <button className={`${styles.link} ${location.pathname === '/map' ? styles.active : ''}`} onClick={() => navigate('/map')}>{tr.outbreakMap}</button>
            <button className={`${styles.link} ${location.pathname === '/dashboard' ? styles.active : ''}`} onClick={() => navigate('/dashboard')}>{tr.dashboard}</button>
            <button className={`${styles.link} ${location.pathname === '/vets' ? styles.active : ''}`} onClick={() => navigate('/vets')}>{tr.findVets}</button>
          </div>

          <div className={styles.navRight}>
            <button className={styles.langBtn} onClick={() => { localStorage.removeItem('appLanguage'); window.location.href = '/' }}>
              🌐 {lang}
            </button>
            <button className={styles.navBtn} onClick={() => navigate('/symptoms')}>
              {tr.getDiagnosis}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE BOTTOM NAVBAR */}
      <div className={styles.mobileNav}>
        <button className={`${styles.mobileNavBtn} ${location.pathname === '/' ? styles.mobileNavActive : ''}`} onClick={() => navigate('/')}>
          <span>🏠</span>
          <span>{tr.home}</span>
        </button>
        <button className={`${styles.mobileNavBtn} ${location.pathname === '/symptoms' ? styles.mobileNavActive : ''}`} onClick={() => navigate('/symptoms')}>
          <span>🩺</span>
          <span>Diagnose</span>
        </button>
        <button className={`${styles.mobileNavBtn} ${location.pathname === '/map' ? styles.mobileNavActive : ''}`} onClick={() => navigate('/map')}>
          <span>🗺️</span>
          <span>Map</span>
        </button>
        <button className={`${styles.mobileNavBtn} ${location.pathname === '/dashboard' ? styles.mobileNavActive : ''}`} onClick={() => navigate('/dashboard')}>
          <span>📊</span>
          <span>Dashboard</span>
        </button>
        <button className={`${styles.mobileNavBtn} ${location.pathname === '/vets' ? styles.mobileNavActive : ''}`} onClick={() => navigate('/vets')}>
          <span>👨‍⚕️</span>
          <span>Vets</span>
        </button>
      </div>
    </>
  )
}
export default Navbar