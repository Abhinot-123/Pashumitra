import axios from 'axios'

const BASE_URL = 'http://localhost:8000'

export async function getDiagnosis(animal, symptoms, language, farmerName, phone, district) {
  const response = await axios.post(`${BASE_URL}/diagnose`, {
    animal,
    symptoms,
    language,
    farmer_name: farmerName,
    phone,
    district
  })
  return response.data
}

export async function getAllCases() {
  const response = await axios.get(`${BASE_URL}/cases`)
  return response.data
}