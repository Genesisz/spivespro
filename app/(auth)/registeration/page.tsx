"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100
    }
  }
};

const CreateProfilePage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    email: '',
    club: '',
    nickname: '',
    phoneNumber: '',
    country: '',
    stateRegion: '',
    position: '',
    password: '',
    confirmPassword: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is modified
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted:', formData);
      // Redirect to success page or dashboard
      router.push('/registration-success');
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ form: 'Failed to create profile. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>

      <div className="min-h-screen max-w-screen relative text-center overflow-x-hidden flex justify-center items-center">
    <div className="absolute top-0 left-0 w-screen h-[100%]">
      <img
        src="/images/landing-page/hero-bg.png"
        alt="hero background"
        className="w-full h-full"
      />
    </div>
    <div className="absolute top-0 left-0 w-screen h-[100%] bg-gradient-to-b from-[#03033E]/60 to-[#000066]/60" />

        <motion.div 
          className="max-w-md mx-auto pt-10 pb-16 relative z-10"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-6">
            <h1 className="text-5xl font-bold mb-2 adumu">
              <span className="text-white">Create a </span>
              <span className="text-orange-400">profile</span>
            </h1>
            <p className="text-white text-center mx-auto max-w-md font-[500]">
              We believe that you deserved to be seen
              create a spives account now
            </p>
          </motion.div>
          
          <motion.p 
            variants={itemVariants}
            className="text-white text-center mb-6 font-[500]"
          >
            Fill in the forms below as a Player
          </motion.p>
          
          <form onSubmit={handleSubmit}>
            <motion.div className="space-y-4" variants={containerVariants}>
              {/* Input fields */}
              <motion.div variants={itemVariants}>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  className="w-full p-4 rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm text-sm placeholder:text-blue-900 placeholder:text-sm text-sm text-blue-900 font-[600]"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                {errors.fullName && <p className="mt-1 text-red-400 text-sm">{errors.fullName}</p>}
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <input
                  type="date"
                  name="dateOfBirth"
                  placeholder="Date of Birth"
                  className="w-full p-4 rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm text-sm placeholder:text-blue-900 text-blue-900 font-[600]"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                />
                {errors.dateOfBirth && <p className="mt-1 text-red-400 text-sm">{errors.dateOfBirth}</p>}
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full p-4 rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm text-sm placeholder:text-blue-900 text-blue-900 font-[600]"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="mt-1 text-red-400 text-sm">{errors.email}</p>}
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <input
                  type="text"
                  name="club"
                  placeholder="Club"
                  className="w-full p-4 rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm text-sm placeholder:text-blue-900 text-blue-900 font-[600]"
                  value={formData.club}
                  onChange={handleChange}
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <input
                  type="text"
                  name="nickname"
                  placeholder="Nickname"
                  className="w-full p-4 rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm text-sm placeholder:text-blue-900 text-blue-900 font-[600]"
                  value={formData.nickname}
                  onChange={handleChange}
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  className="w-full p-4 rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm text-sm placeholder:text-blue-900 text-blue-900 font-[600]"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  className="w-full p-4 rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm text-sm placeholder:text-blue-900 text-blue-900 font-[600]"
                  value={formData.country}
                  onChange={handleChange}
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <input
                  type="text"
                  name="stateRegion"
                  placeholder="State / Region"
                  className="w-full p-4 rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm text-sm placeholder:text-blue-900 text-blue-900 font-[600]"
                  value={formData.stateRegion}
                  onChange={handleChange}
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <input
                  type="text"
                  name="position"
                  placeholder="Position"
                  className="w-full p-4 rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm text-sm placeholder:text-blue-900 text-blue-900 font-[600]"
                  value={formData.position}
                  onChange={handleChange}
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <input
                  type="password"
                  name="password"
                  placeholder="Create Password"
                  className="w-full p-4 rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm text-sm placeholder:text-blue-900 text-blue-900 font-[600]"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && <p className="mt-1 text-red-400 text-sm">{errors.password}</p>}
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="w-full p-4 rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm text-sm placeholder:text-blue-900 text-blue-900 font-[600]"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && <p className="mt-1 text-red-400 text-sm">{errors.confirmPassword}</p>}
              </motion.div>
              
              {/* Submit button */}
              <motion.div variants={itemVariants} className="pt-4">
                <motion.button
                  type="submit"
                  className="w-fit bg-orange-400 text-blue-950 font-bold p-3 px-16 rounded-xl hover:bg-orange-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex justify-center items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-blue-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    'Create Profile'
                  )}
                </motion.button>
                
                <motion.div 
                  variants={itemVariants}
                  className="text-center mt-4 text-white gap-2 flex justify-center items-center"
                >
                  <Link href="/login" className="text-orange-500 adumu hover:text-orange-200 transition-colors">
                    login 
                  </Link>
                  <span className='font-[600]'>
                  if you have an account
                  </span>
                </motion.div>
              </motion.div>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default CreateProfilePage;