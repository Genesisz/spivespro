// "use client";
// import React, { useState } from 'react'
// import { Instagram, Twitter, Facebook, Linkedin, Mail, ArrowRight, CheckCircle } from 'lucide-react'

// // Shared Logo component for consistency
// const Logo = () => (
//   <div className="flex items-center">
//     <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center mr-2">
//       <div className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center">
//         <span className="text-xs font-bold text-white">S</span>
//       </div>
//     </div>
//     <span className="text-blue-900 font-bold text-xl tracking-tight">spives</span>
//   </div>
// );

// // Enhanced Footer Component
// const Footer = () => {
//   return (
//     <footer className="bg-gradient-to-r from-gray-50 to-gray-100 pt-12 pb-6">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
//           <div className="md:col-span-1">
//             <Logo />
//             <p className="mt-4 text-gray-600 text-sm">
//               The ultimate football talent selection agency. Connecting players with opportunities worldwide.
//             </p>
//           </div>

//           <div>
//             <h3 className="font-semibold text-blue-900 mb-4">Services</h3>
//             <ul className="space-y-2 text-gray-600">
//               <li className="hover:text-orange-500 transition-colors cursor-pointer">Player Scouting</li>
//               <li className="hover:text-orange-500 transition-colors cursor-pointer">Club Partnerships</li>
//               <li className="hover:text-orange-500 transition-colors cursor-pointer">Talent Development</li>
//               <li className="hover:text-orange-500 transition-colors cursor-pointer">Career Management</li>
//             </ul>
//           </div>

//           <div>
//             <h3 className="font-semibold text-blue-900 mb-4">Information</h3>
//             <ul className="space-y-2 text-gray-600">
//               <li className="hover:text-orange-500 transition-colors cursor-pointer">About Us</li>
//               <li className="hover:text-orange-500 transition-colors cursor-pointer">Success Stories</li>
//               <li className="hover:text-orange-500 transition-colors cursor-pointer">Blog & News</li>
//               <li className="hover:text-orange-500 transition-colors cursor-pointer">Contact Us</li>
//             </ul>
//           </div>

//           <div>
//             <h3 className="font-semibold text-blue-900 mb-4">Connect</h3>
//             <div className="flex space-x-4 mb-4">
//               <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center text-white cursor-pointer hover:bg-orange-500 transition-colors">
//                 <Instagram size={16} />
//               </div>
//               <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center text-white cursor-pointer hover:bg-orange-500 transition-colors">
//                 <Twitter size={16} />
//               </div>
//               <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center text-white cursor-pointer hover:bg-orange-500 transition-colors">
//                 <Facebook size={16} />
//               </div>
//               <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center text-white cursor-pointer hover:bg-orange-500 transition-colors">
//                 <Linkedin size={16} />
//               </div>
//             </div>
//             <p className="text-gray-600 text-sm">
//               <Mail size={14} className="inline mr-1" /> hello@spives.com
//             </p>
//           </div>
//         </div>

//         <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center">
//           <p className="text-sm text-gray-500 mb-4 md:mb-0">
//             © 2025 Spives. All rights reserved.
//           </p>
//           <div className="flex space-x-4 text-sm text-gray-500">
//             <span className="hover:text-orange-500 cursor-pointer transition-colors">Privacy Policy</span>
//             <span className="hover:text-orange-500 cursor-pointer transition-colors">Terms of Service</span>
//             <span className="hover:text-orange-500 cursor-pointer transition-colors">Cookie Policy</span>
//           </div>
//         </div>
//       </div>
//     </footer>
//   )
// }

// export default Footer

import React from 'react'
import Image from 'next/image'
const Footer = () => {
  return (
    <div className='max-w-screen bg-blue-950 text-white px-4'>
      <div className='max-w-7xl w-full mx-auto flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/30 py-8'>
        <Image
        src="/logo/logo.svg"
        alt="Spives Logo"
        width={150}
        height={50}
        className="h-6 border w-auto"
      />

      <p className="text-sm text-gray-500 mb-4 md:mb-0">
        © 2025 Spives. All rights reserved.
      </p>
      </div>
    </div>
  )
}

export default Footer
