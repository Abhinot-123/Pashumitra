import { useNavigate } from 'react-router-dom'
import styles from './LanguageSelect.module.css'

const languages = [
  { code: 'English', label: 'English',  native: 'English',    flag: '🇬🇧' },
  { code: 'Hindi',   label: 'Hindi',    native: 'हिंदी',      flag: '🇮🇳' },
  { code: 'Odia',    label: 'Odia',     native: 'ଓଡ଼ିଆ',     flag: '🇮🇳' },
  { code: 'Telugu',  label: 'Telugu',   native: 'తెలుగు',    flag: '🇮🇳' },
  { code: 'Tamil',   label: 'Tamil',    native: 'தமிழ்',     flag: '🇮🇳' },
  { code: 'Bengali', label: 'Bengali',  native: 'বাংলা',     flag: '🇮🇳' },
]

function LanguageSelect() {
  const navigate = useNavigate()

 function handleSelect(lang) {
  localStorage.setItem('appLanguage', lang.code)
  window.location.href = '/'
}

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>🐄</div>
          <h1 className={styles.logoName}>PashuMitra</h1>
        </div>

        <h2 className={styles.title}>Select Your Language</h2>
        <p className={styles.sub}>अपनी भाषा चुनें · ଆପଣଙ୍କ ଭାଷା ବାଛନ୍ତୁ · మీ భాష ఎంచుకోండి</p>

        <div className={styles.grid}>
          {languages.map((lang) => (
            <div key={lang.code} className={styles.card} onClick={() => handleSelect(lang)}>
              <span className={styles.flag}>{lang.flag}</span>
              <span className={styles.native}>{lang.native}</span>
              <span className={styles.english}>{lang.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default LanguageSelect
