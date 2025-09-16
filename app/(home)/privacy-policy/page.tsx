import React from 'react'
import Hero from './_components/hero'
import PrivacyPolicy from './_components/policies'
import Footer from '@/components/layout/footer'

const Page = () => {
  return (
    <div className='bg-[#191153] pt-20 min-h-screen'>
      <Hero />
      <PrivacyPolicy />
      <Footer />
    </div>
  )
}

export default Page
