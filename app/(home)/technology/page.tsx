import React from 'react'
import Hero from './_components/hero'
import HarshTruthSection from './_components/harsh-truth'
import Cards from './_components/cards'
import Footer from '@/components/layout/footer'

const Page = () => {
  return (
    <div>
      <Hero />
      <HarshTruthSection />
      <Cards />
      <Footer />
    </div>
  )
}

export default Page
