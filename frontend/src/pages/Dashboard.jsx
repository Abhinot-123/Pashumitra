import { useState, useEffect } from 'react'
import styles from './Dashboard.module.css'
import { getAllCases } from '../api/api'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

function Dashboard() {
  const [cases, setCases] = useState([])
  const [filter, setFilter] = useState('ALL')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCases() {
      try {
        const data = await getAllCases()
        if (data.success) setCases(data.data)
      } catch (err) {
        console.error('Could not fetch cases')
      }
      setLoading(false)
    }
    fetchCases()
  }, [])

  const filtered = filter === 'ALL' ? cases : cases.filter(c => c.severity === filter)
  const critical = cases.filter(c => c.severity === 'CRITICAL').length
  const moderate = cases.filter(c => c.severity === 'MODERATE').length
  const mild = cases.filter(c => c.severity === 'MILD').length

  const pieData = [
    { name: 'Critical', value: critical, color: '#cc0000' },
    { name: 'Moderate', value: moderate, color: '#b86e00' },
    { name: 'Mild', value: mild, color: '#0f6e56' },
  ].filter(d => d.value > 0)

  const districtData = {}
  cases.forEach(c => {
    districtData[c.district] = (districtData[c.district] || 0) + 1
  })
  const barData = Object.entries(districtData).map(([district, count]) => ({ district, cases: count }))

  const animalData = {}
  cases.forEach(c => {
    animalData[c.animal] = (animalData[c.animal] || 0) + 1
  })
  const animalBarData = Object.entries(animalData).map(([animal, count]) => ({ animal, cases: count }))

  function getSeverityStyle(severity) {
    if (severity === 'MILD')     return styles.mild
    if (severity === 'MODERATE') return styles.moderate
    if (severity === 'CRITICAL') return styles.critical
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        <div className={styles.header}>
          <h2 className={styles.title}>Government Vet Dashboard</h2>
          <p className={styles.sub}>Real-time animal disease monitoring across districts</p>
        </div>

        <div className={styles.statsRow}>
          <div className={styles.statCard}>
            <span className={styles.statNum}>{cases.length}</span>
            <span className={styles.statLabel}>Total Cases</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNum} style={{color:'#cc0000'}}>{critical}</span>
            <span className={styles.statLabel}>Critical</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNum} style={{color:'#b86e00'}}>{moderate}</span>
            <span className={styles.statLabel}>Moderate</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNum} style={{color:'#0f6e56'}}>{mild}</span>
            <span className={styles.statLabel}>Mild</span>
          </div>
        </div>

        {cases.length > 0 && (
          <div className={styles.chartsRow}>
            <div className={styles.chartCard}>
              <h3 className={styles.chartTitle}>Cases by District</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="district" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="cases" fill="#0f6e56" radius={[6,6,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className={styles.chartCard}>
              <h3 className={styles.chartTitle}>Severity Distribution</h3>
              {pieData.length > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({name, value}) => `${name}: ${value}`}>
                      {pieData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className={styles.empty}>No data yet</div>
              )}
            </div>

            <div className={styles.chartCard}>
              <h3 className={styles.chartTitle}>Cases by Animal</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={animalBarData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="animal" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="cases" fill="#0a5240" radius={[6,6,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        <div className={styles.filters}>
          {['ALL', 'CRITICAL', 'MODERATE', 'MILD'].map((f) => (
            <button
              key={f}
              className={`${styles.filterBtn} ${filter === f ? styles.activeFilter : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {loading ? (
          <div className={styles.empty}>Loading cases...</div>
        ) : cases.length === 0 ? (
          <div className={styles.empty}>No cases yet — submit a diagnosis first!</div>
        ) : (
          <div className={styles.list}>
            {filtered.map((c) => (
              <div key={c.id} className={styles.card}>
                <div className={styles.cardTop}>
                  <div>
                    <h3 className={styles.farmer}>{c.farmer_name}</h3>
                    <p className={styles.meta}>{c.animal} · {c.diagnosis}</p>
                  </div>
                  <span className={`${styles.badge} ${getSeverityStyle(c.severity)}`}>
                    {c.severity}
                  </span>
                </div>
                <div className={styles.cardBottom}>
                  <span>📍 {c.district}</span>
                  <span>📞 {c.phone}</span>
                  <span>🕐 {c.created_at}</span>
                </div>
                {c.severity === 'CRITICAL' && (
                  <button className={styles.callBtn}>📞 Call Farmer Now</button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
export default Dashboard