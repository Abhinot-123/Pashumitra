import { useState, useEffect } from 'react'
import styles from './Map.module.css'
import { getAllCases } from '../api/api'

function Map() {
  const [cases, setCases] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCases() {
      try {
        const data = await getAllCases()
        if (data.success) setCases(data.data)
      } catch (err) {
        console.error('error')
      }
      setLoading(false)
    }
    fetchCases()
  }, [])

  const districtMap = {}
  cases.forEach(c => {
    if (!districtMap[c.district]) {
      districtMap[c.district] = { district: c.district, cases: 0, diseases: [], severity: 'LOW' }
    }
    districtMap[c.district].cases += 1
    if (!districtMap[c.district].diseases.includes(c.diagnosis)) {
      districtMap[c.district].diseases.push(c.diagnosis)
    }
    if (c.severity === 'CRITICAL') districtMap[c.district].severity = 'HIGH'
    else if (c.severity === 'MODERATE' && districtMap[c.district].severity !== 'HIGH') districtMap[c.district].severity = 'MEDIUM'
  })

  const outbreakData = Object.values(districtMap)
  const total = cases.length
  const high = outbreakData.filter(d => d.severity === 'HIGH').length
  const districts = outbreakData.length

  function getSeverityColor(severity) {
    if (severity === 'HIGH')   return styles.high
    if (severity === 'MEDIUM') return styles.medium
    return styles.low
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Disease Outbreak Map</h2>
          <p className={styles.sub}>Real cases reported by farmers across districts</p>
        </div>

        <div className={styles.statsRow}>
          <div className={styles.statCard}>
            <span className={styles.statNum}>{total}</span>
            <span className={styles.statLabel}>Total Cases</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNum}>{districts}</span>
            <span className={styles.statLabel}>Districts Affected</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNum} style={{color:'#cc0000'}}>{high}</span>
            <span className={styles.statLabel}>High Alert Zones</span>
          </div>
        </div>

        {loading ? (
          <div className={styles.empty}>Loading outbreak data...</div>
        ) : outbreakData.length === 0 ? (
          <div className={styles.empty}>No outbreak data yet — cases will appear here as farmers submit diagnoses!</div>
        ) : (
          <div className={styles.list}>
            {outbreakData.map((item, i) => (
              <div key={i} className={styles.card}>
                <div className={styles.cardLeft}>
                  <h3 className={styles.district}>{item.district}</h3>
                  <p className={styles.disease}>{item.diseases.join(', ')}</p>
                </div>
                <div className={styles.cardRight}>
                  <span className={styles.cases}>{item.cases} cases</span>
                  <span className={`${styles.severity} ${getSeverityColor(item.severity)}`}>
                    {item.severity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {high > 0 && (
          <div className={styles.alertBox}>
            <p className={styles.alertText}>
              🚨 {high} district(s) on HIGH alert — Government veterinary teams notified!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
export default Map