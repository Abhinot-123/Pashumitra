import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import SymptomInput from './pages/SymptomInput'
import Result from './pages/Result'
import Map from './pages/Map'
import Dashboard from './pages/Dashboard'
import VetFinder from './pages/VetFinder'
import LanguageSelect from './pages/LanguageSelect'

function App() {
  const lang = localStorage.getItem('appLanguage')

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/language" element={<LanguageSelect />} />
        {!lang ? (
          <Route path="*" element={<Navigate to="/language" replace />} />
        ) : (
          <>
            <Route path="/" element={<><Navbar /><Home /></>} />
            <Route path="/symptoms" element={<><Navbar /><SymptomInput /></>} />
            <Route path="/result" element={<><Navbar /><Result /></>} />
            <Route path="/map" element={<><Navbar /><Map /></>} />
            <Route path="/dashboard" element={<><Navbar /><Dashboard /></>} />
            <Route path="/vets" element={<><Navbar /><VetFinder /></>} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  )
}
export default App