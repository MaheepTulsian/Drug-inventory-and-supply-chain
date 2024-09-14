import React from 'react'
import LandingPage from './pages/LandingPage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const layout = () => {
  return (
    <div>
      <Navbar />
      <LandingPage />
      <Footer />
    </div>
  )
}

export default layout;