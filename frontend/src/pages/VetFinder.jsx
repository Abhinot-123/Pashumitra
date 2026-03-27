import { useState } from 'react'
import styles from './VetFinder.module.css'

const vetDatabase = [
  { id: 1,  name: 'Dr. Rajesh Kumar',    district: 'Bhubaneswar', state: 'Odisha',      phone: '9876543210', speciality: 'Cattle & Buffalo',  available: true,  distance: '2.3 km' },
  { id: 2,  name: 'Dr. Priya Nayak',     district: 'Bhubaneswar', state: 'Odisha',      phone: '9876543211', speciality: 'Poultry & Goat',    available: true,  distance: '4.1 km' },
  { id: 3,  name: 'Dr. Suresh Das',      district: 'Cuttack',     state: 'Odisha',      phone: '9876543212', speciality: 'All Animals',       available: false, distance: '8.5 km' },
  { id: 4,  name: 'Dr. Anita Mohanty',   district: 'Cuttack',     state: 'Odisha',      phone: '9876543213', speciality: 'Cattle & Sheep',    available: true,  distance: '6.2 km' },
  { id: 5,  name: 'Dr. Bikash Panda',    district: 'Puri',        state: 'Odisha',      phone: '9876543214', speciality: 'Buffalo & Pig',     available: true,  distance: '12.0 km' },
  { id: 6,  name: 'Dr. Sanjay Mishra',   district: 'Sambalpur',   state: 'Odisha',      phone: '9876543215', speciality: 'All Animals',       available: false, distance: '15.3 km' },
  { id: 7,  name: 'Dr. Meena Sharma',    district: 'Patna',       state: 'Bihar',       phone: '9876543216', speciality: 'Cattle & Goat',     available: true,  distance: '3.8 km' },
  { id: 8,  name: 'Dr. Arjun Singh',     district: 'Ranchi',      state: 'Jharkhand',   phone: '9876543217', speciality: 'Poultry & Pig',     available: true,  distance: '5.5 km' },
  { id: 9,  name: 'Dr. Kavita Rao',      district: 'Berhampur',   state: 'Odisha',      phone: '9876543218', speciality: 'All Animals',       available: true,  distance: '1.9 km' },
  { id: 10, name: 'Dr. Ramesh Jena',     district: 'Rourkela',    state: 'Odisha',      phone: '9876543219', speciality: 'Cattle & Buffalo',  available: false, distance: '9.7 km' },
  { id: 11, name: 'Dr. Sunita Patel',    district: 'Jaipur',      state: 'Rajasthan',   phone: '9876543220', speciality: 'Cattle & Camel',    available: true,  distance: '3.2 km' },
  { id: 12, name: 'Dr. Vikram Verma',    district: 'Lucknow',     state: 'Uttar Pradesh', phone: '9876543221', speciality: 'All Animals',    available: true,  distance: '7.1 km' },
  { id: 13, name: 'Dr. Pooja Gupta',     district: 'Lucknow',     state: 'Uttar Pradesh', phone: '9876543222', speciality: 'Poultry & Goat', available: false, distance: '9.3 km' },
  { id: 14, name: 'Dr. Amit Tiwari',     district: 'Varanasi',    state: 'Uttar Pradesh', phone: '9876543223', speciality: 'Cattle & Sheep', available: true,  distance: '4.6 km' },
  { id: 15, name: 'Dr. Rekha Iyer',      district: 'Chennai',     state: 'Tamil Nadu',  phone: '9876543224', speciality: 'All Animals',       available: true,  distance: '2.8 km' },
  { id: 16, name: 'Dr. Karthik Raja',    district: 'Chennai',     state: 'Tamil Nadu',  phone: '9876543225', speciality: 'Poultry & Pig',     available: false, distance: '5.4 km' },
  { id: 17, name: 'Dr. Lakshmi Devi',    district: 'Hyderabad',   state: 'Telangana',   phone: '9876543226', speciality: 'Cattle & Buffalo',  available: true,  distance: '6.7 km' },
  { id: 18, name: 'Dr. Ravi Shankar',    district: 'Hyderabad',   state: 'Telangana',   phone: '9876543227', speciality: 'All Animals',       available: true,  distance: '8.9 km' },
  { id: 19, name: 'Dr. Deepa Nair',      district: 'Kochi',       state: 'Kerala',      phone: '9876543228', speciality: 'Cattle & Goat',     available: true,  distance: '3.1 km' },
  { id: 20, name: 'Dr. Sunil Menon',     district: 'Kochi',       state: 'Kerala',      phone: '9876543229', speciality: 'Poultry & Pig',     available: false, distance: '11.2 km' },
  { id: 21, name: 'Dr. Arun Ghosh',      district: 'Kolkata',     state: 'West Bengal', phone: '9876543230', speciality: 'All Animals',       available: true,  distance: '4.5 km' },
  { id: 22, name: 'Dr. Mita Banerjee',   district: 'Kolkata',     state: 'West Bengal', phone: '9876543231', speciality: 'Cattle & Buffalo',  available: true,  distance: '6.3 km' },
  { id: 23, name: 'Dr. Harish Yadav',    district: 'Pune',        state: 'Maharashtra', phone: '9876543232', speciality: 'All Animals',       available: false, distance: '7.8 km' },
  { id: 24, name: 'Dr. Sneha Kulkarni',  district: 'Pune',        state: 'Maharashtra', phone: '9876543233', speciality: 'Cattle & Sheep',    available: true,  distance: '5.0 km' },
  { id: 25, name: 'Dr. Mahesh Reddy',    district: 'Vijayawada',  state: 'Andhra Pradesh', phone: '9876543234', speciality: 'Cattle & Goat', available: true, distance: '3.9 km' },
  { id: 26, name: 'Dr. Padma Reddy',     district: 'Vijayawada',  state: 'Andhra Pradesh', phone: '9876543235', speciality: 'Poultry & Pig', available: false, distance: '8.2 km' },
  { id: 27, name: 'Dr. Gurpreet Singh',  district: 'Amritsar',    state: 'Punjab',      phone: '9876543236', speciality: 'Cattle & Buffalo',  available: true,  distance: '2.6 km' },
  { id: 28, name: 'Dr. Manpreet Kaur',   district: 'Amritsar',    state: 'Punjab',      phone: '9876543237', speciality: 'All Animals',       available: true,  distance: '4.4 km' },
  { id: 29, name: 'Dr. Dinesh Joshi',    district: 'Ahmedabad',   state: 'Gujarat',     phone: '9876543238', speciality: 'Cattle & Camel',    available: false, distance: '10.1 km' },
  { id: 30, name: 'Dr. Hetal Shah',      district: 'Ahmedabad',   state: 'Gujarat',     phone: '9876543239', speciality: 'All Animals',       available: true,  distance: '6.8 km' },
]

const districts = [...new Set(vetDatabase.map(v => v.district))]

function VetFinder() {
  const [search, setSearch] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('ALL')
  const [onlyAvailable, setOnlyAvailable] = useState(false)
  const [selectedVet, setSelectedVet] = useState(null)
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const filtered = vetDatabase.filter(v => {
    const matchDistrict = selectedDistrict === 'ALL' || v.district === selectedDistrict
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.speciality.toLowerCase().includes(search.toLowerCase())
    const matchAvailable = onlyAvailable ? v.available : true
    return matchDistrict && matchSearch && matchAvailable
  })

  function handleSendMessage() {
    if (!message.trim()) return alert('Please type a message!')
    setSent(true)
    setTimeout(() => {
      setSent(false)
      setMessage('')
      setSelectedVet(null)
    }, 2000)
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        <div className={styles.header}>
          <h2 className={styles.title}>Find Nearest Vet</h2>
          <p className={styles.sub}>Government veterinary officers near you — available 24/7</p>
        </div>

        <div className={styles.filterBar}>
          <input
            className={styles.searchInput}
            placeholder="🔍 Search by name or speciality..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className={styles.select}
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
          >
            <option value="ALL">All Districts</option>
            {districts.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          <button
            className={`${styles.availableBtn} ${onlyAvailable ? styles.availableActive : ''}`}
            onClick={() => setOnlyAvailable(!onlyAvailable)}
          >
            {onlyAvailable ? '✅ Available Only' : 'Show Available Only'}
          </button>
        </div>

        <p className={styles.resultCount}>{filtered.length} vets found</p>

        <div className={styles.list}>
          {filtered.map((vet) => (
            <div key={vet.id} className={styles.card}>
              <div className={styles.cardTop}>
                <div className={styles.avatar}>
                  {vet.name.charAt(3)}
                </div>
                <div className={styles.info}>
                  <h3 className={styles.vetName}>{vet.name}</h3>
                  <p className={styles.speciality}>{vet.speciality}</p>
                  <p className={styles.location}>📍 {vet.district}, {vet.state}</p>
                </div>
                <div className={styles.right}>
                  <span className={`${styles.availBadge} ${vet.available ? styles.availYes : styles.availNo}`}>
                    {vet.available ? '🟢 Available' : '🔴 Busy'}
                  </span>
                  <span className={styles.distance}>{vet.distance}</span>
                </div>
              </div>
              <div className={styles.cardBottom}>
                <a href={`tel:${vet.phone}`} className={styles.callBtn}>
                  📞 Call {vet.phone}
                </a>
                <button className={styles.msgBtn} onClick={() => { setSelectedVet(vet); setSent(false); setMessage('') }}>
                  💬 Send Message
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MESSAGE MODAL */}
      {selectedVet && (
        <div className={styles.overlay} onClick={() => setSelectedVet(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            {sent ? (
              <div className={styles.sentBox}>
                <div className={styles.sentIcon}>✅</div>
                <h3>Message Sent!</h3>
                <p>Your message has been sent to {selectedVet.name}</p>
              </div>
            ) : (
              <>
                <div className={styles.modalHeader}>
                  <div>
                    <h3 className={styles.modalTitle}>Message {selectedVet.name}</h3>
                    <p className={styles.modalSub}>{selectedVet.speciality} · {selectedVet.district}</p>
                  </div>
                  <button className={styles.closeBtn} onClick={() => setSelectedVet(null)}>✕</button>
                </div>

                <div className={styles.modalBody}>
                  <label className={styles.modalLabel}>Your Message</label>
                  <textarea
                    className={styles.modalTextarea}
                    placeholder={`Hello Dr. ${selectedVet.name.split(' ')[1]}, my ${localStorage.getItem('selectedAnimal') || 'animal'} needs urgent attention...`}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                  />
                </div>

                <div className={styles.modalFooter}>
                  <button className={styles.cancelBtn} onClick={() => setSelectedVet(null)}>Cancel</button>
                  <button className={styles.sendBtn} onClick={handleSendMessage}>Send Message →</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
export default VetFinder