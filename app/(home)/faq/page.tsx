import React from 'react'
import Hero from './_components/hero'
import Faq from './_components/faqs'
import Footer from '@/components/layout/footer'

const Page = () => {
  return (
    <div className='bg-[#191153] pt-20 min-h-screen'>
      <Hero />
      <Faq />
      <Footer />
    </div>
  )
}

export default Page
