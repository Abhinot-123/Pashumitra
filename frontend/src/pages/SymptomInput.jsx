import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './SymptomInput.module.css'
import { getDiagnosis } from '../api/api'

const languages = [
  { code: 'English',  label: 'English',  flag: '🇬🇧' },
  { code: 'Hindi',    label: 'हिंदी',     flag: '🇮🇳' },
  { code: 'Odia',     label: 'ଓଡ଼ିଆ',    flag: '🇮🇳' },
  { code: 'Telugu',   label: 'తెలుగు',   flag: '🇮🇳' },
  { code: 'Tamil',    label: 'தமிழ்',    flag: '🇮🇳' },
  { code: 'Bengali',  label: 'বাংলা',    flag: '🇮🇳' },
]

const translations = {
  English: {
    title: 'Describe Symptoms',
    farmerName: 'Farmer Name',
    phone: 'Phone Number',
    district: 'District',
    farmerPlaceholder: 'Enter farmer name',
    phonePlaceholder: 'Enter phone number',
    districtPlaceholder: 'Enter your district',
    selectLang: 'Select Language',
    symptoms: 'What symptoms do you see?',
    symptomsPlaceholder: 'Example: Not eating since 2 days, high fever, limping...',
    photo: 'Upload Photo (optional)',
    voice: '🎤 Voice Input',
    listening: '🔴 Listening...',
    submit: '🔍 Get AI Diagnosis',
    analysing: '🤖 Analysing...',
  },
  Hindi: {
    title: 'लक्षण बताएं',
    farmerName: 'किसान का नाम',
    phone: 'फोन नंबर',
    district: 'जिला',
    farmerPlaceholder: 'किसान का नाम दर्ज करें',
    phonePlaceholder: 'फोन नंबर दर्ज करें',
    districtPlaceholder: 'अपना जिला दर्ज करें',
    selectLang: 'भाषा चुनें',
    symptoms: 'आप क्या लक्षण देख रहे हैं?',
    symptomsPlaceholder: 'उदाहरण: 2 दिन से खाना नहीं खा रहा, तेज बुखार, लंगड़ा रहा है...',
    photo: 'फोटो अपलोड करें (वैकल्पिक)',
    voice: '🎤 आवाज से बोलें',
    listening: '🔴 सुन रहा है...',
    submit: '🔍 AI से जांच करें',
    analysing: '🤖 जांच हो रही है...',
  },
  Odia: {
    title: 'ଲକ୍ଷଣ ବର୍ଣ୍ଣନା କରନ୍ତୁ',
    farmerName: 'କୃଷକଙ୍କ ନାମ',
    phone: 'ଫୋନ ନମ୍ବର',
    district: 'ଜିଲ୍ଲା',
    farmerPlaceholder: 'କୃଷକଙ୍କ ନାମ ଲେଖନ୍ତୁ',
    phonePlaceholder: 'ଫୋନ ନମ୍ବର ଲେଖନ୍ତୁ',
    districtPlaceholder: 'ଆପଣଙ୍କ ଜିଲ୍ଲା ଲେଖନ୍ତୁ',
    selectLang: 'ଭାଷା ବାଛନ୍ତୁ',
    symptoms: 'ଆପଣ କ\'ଣ ଲକ୍ଷଣ ଦେଖୁଛନ୍ତି?',
    symptomsPlaceholder: 'ଉଦାହରଣ: ୨ ଦିନ ଧରି ଖାଉନି, ଜ୍ୱର, ଖୋଁଜ ମାରୁଛି...',
    photo: 'ଫଟୋ ଅପଲୋଡ କରନ୍ତୁ (ଐଚ୍ଛିକ)',
    voice: '🎤 ଆବାଜରେ କୁହନ୍ତୁ',
    listening: '🔴 ଶୁଣୁଛି...',
    submit: '🔍 AI ରୋଗ ନିର୍ଣ୍ଣୟ',
    analysing: '🤖 ବିଶ୍ଳେଷଣ ହେଉଛି...',
  },
  Telugu: {
    title: 'లక్షణాలు వివరించండి',
    farmerName: 'రైతు పేరు',
    phone: 'ఫోన్ నంబర్',
    district: 'జిల్లా',
    farmerPlaceholder: 'రైతు పేరు నమోదు చేయండి',
    phonePlaceholder: 'ఫోన్ నంబర్ నమోదు చేయండి',
    districtPlaceholder: 'మీ జిల్లా నమోదు చేయండి',
    selectLang: 'భాష ఎంచుకోండి',
    symptoms: 'మీరు ఏ లక్షణాలు చూస్తున్నారు?',
    symptomsPlaceholder: 'ఉదాహరణ: 2 రోజులుగా తినడం లేదు, అధిక జ్వరం...',
    photo: 'ఫోటో అప్‌లోడ్ చేయండి (ఐచ్ఛికం)',
    voice: '🎤 వాయిస్ ఇన్‌పుట్',
    listening: '🔴 వింటోంది...',
    submit: '🔍 AI నిర్ధారణ పొందండి',
    analysing: '🤖 విశ్లేషిస్తోంది...',
  },
  Tamil: {
    title: 'அறிகுறிகளை விவரிக்கவும்',
    farmerName: 'விவசாயி பெயர்',
    phone: 'தொலைபேசி எண்',
    district: 'மாவட்டம்',
    farmerPlaceholder: 'விவசாயி பெயரை உள்ளிடவும்',
    phonePlaceholder: 'தொலைபேசி எண்ணை உள்ளிடவும்',
    districtPlaceholder: 'உங்கள் மாவட்டத்தை உள்ளிடவும்',
    selectLang: 'மொழியை தேர்ந்தெடுக்கவும்',
    symptoms: 'என்ன அறிகுறிகளை பார்க்கிறீர்கள்?',
    symptomsPlaceholder: 'உதாரணம்: 2 நாட்களாக சாப்பிடவில்லை, காய்ச்சல்...',
    photo: 'புகைப்படம் பதிவேற்றவும் (விரும்பினால்)',
    voice: '🎤 குரல் உள்ளீடு',
    listening: '🔴 கேட்கிறது...',
    submit: '🔍 AI நோய் கண்டறிதல்',
    analysing: '🤖 பகுப்பாய்வு...',
  },
  Bengali: {
    title: 'উপসর্গ বর্ণনা করুন',
    farmerName: 'কৃষকের নাম',
    phone: 'ফোন নম্বর',
    district: 'জেলা',
    farmerPlaceholder: 'কৃষকের নাম লিখুন',
    phonePlaceholder: 'ফোন নম্বর লিখুন',
    districtPlaceholder: 'আপনার জেলা লিখুন',
    selectLang: 'ভাষা নির্বাচন করুন',
    symptoms: 'আপনি কী উপসর্গ দেখছেন?',
    symptomsPlaceholder: 'উদাহরণ: ২ দিন ধরে খাচ্ছে না, জ্বর, খুঁড়িয়ে হাঁটছে...',
    photo: 'ছবি আপলোড করুন (ঐচ্ছিক)',
    voice: '🎤 ভয়েস ইনপুট',
    listening: '🔴 শুনছে...',
    submit: '🔍 AI রোগ নির্ণয়',
    analysing: '🤖 বিশ্লেষণ হচ্ছে...',
  },
}

function SymptomInput() {
  const navigate = useNavigate()
  const animal = localStorage.getItem('selectedAnimal')

  const [symptoms, setSymptoms] = useState('')
  const [language, setLanguage] = useState('English')
  const [photo, setPhoto] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [listening, setListening] = useState(false)
  const [farmerName, setFarmerName] = useState('')
  const [phone, setPhone] = useState('')
  const [district, setDistrict] = useState('')

  const t = translations[language]

  function handlePhoto(e) {
    const file = e.target.files[0]
    setPhoto(file)
    setPhotoPreview(URL.createObjectURL(file))
  }

  function handleVoice() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) return alert('Voice not supported!')
    const recognition = new SpeechRecognition()
    const langMap = {
      English: 'en-IN', Hindi: 'hi-IN', Odia: 'or-IN',
      Telugu: 'te-IN', Tamil: 'ta-IN', Bengali: 'bn-IN'
    }
    recognition.lang = langMap[language] || 'en-IN'
    recognition.start()
    setListening(true)
    recognition.onresult = (e) => {
      setSymptoms(e.results[0][0].transcript)
      setListening(false)
    }
    recognition.onerror = () => setListening(false)
  }

  async function handleSubmit() {
    if (!symptoms) return alert(t.symptomsPlaceholder)
    if (!farmerName) return alert(t.farmerPlaceholder)
    if (!district) return alert(t.districtPlaceholder)
    setLoading(true)
    localStorage.setItem('symptoms', symptoms)
    localStorage.setItem('language', language)
    try {
      const data = await getDiagnosis(animal, symptoms, language, farmerName, phone, district)
      if (data.success) {
        localStorage.setItem('result', JSON.stringify(data.data))
        localStorage.setItem('farmerName', farmerName)
        localStorage.setItem('district', district)
        navigate('/result')
      } else {
        alert('Error: ' + data.error)
      }
    } catch (err) {
      alert('Could not connect to backend!')
    }
    setLoading(false)
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{t.title}</h2>
          <span className={styles.animalBadge}>{animal}</span>
        </div>

        <div className={styles.section}>
          <label className={styles.label}>{t.selectLang}</label>
          <div className={styles.langGrid}>
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={`${styles.langBtn} ${language === lang.code ? styles.active : ''}`}
                onClick={() => setLanguage(lang.code)}
              >
                {lang.flag} {lang.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.formGrid}>
          <div className={styles.section}>
            <label className={styles.label}>{t.farmerName}</label>
            <input className={styles.input} placeholder={t.farmerPlaceholder} value={farmerName} onChange={(e) => setFarmerName(e.target.value)} />
          </div>
          <div className={styles.section}>
            <label className={styles.label}>{t.phone}</label>
            <input className={styles.input} placeholder={t.phonePlaceholder} value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
        </div>

        <div className={styles.section}>
          <label className={styles.label}>{t.district}</label>
          <input className={styles.input} placeholder={t.districtPlaceholder} value={district} onChange={(e) => setDistrict(e.target.value)} />
        </div>

        <div className={styles.section}>
          <label className={styles.label}>{t.symptoms}</label>
          <textarea
            className={styles.textarea}
            placeholder={t.symptomsPlaceholder}
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            rows={5}
          />
          <button className={`${styles.voiceBtn} ${listening ? styles.listening : ''}`} onClick={handleVoice}>
            {listening ? t.listening : t.voice}
          </button>
        </div>

        <div className={styles.section}>
          <label className={styles.label}>{t.photo}</label>
          <input type="file" accept="image/*" onChange={handlePhoto} className={styles.fileInput} />
          {photoPreview && <img src={photoPreview} alt="preview" className={styles.preview} />}
        </div>

        <button className={styles.submitBtn} onClick={handleSubmit} disabled={loading}>
          {loading ? t.analysing : t.submit}
        </button>
      </div>
    </div>
  )
}

export default SymptomInput