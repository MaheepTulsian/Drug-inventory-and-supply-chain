import React from 'react'
import { LandingPage } from './pages'
import { Navbar, Footer } from './components'

const layout = () => {
  return (
    <div>
      <Navbar />
      <LandingPage />
      <Footer />
    </div>
  )
}

export default layout
