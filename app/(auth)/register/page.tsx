"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  User, 
  Mail, 
  Calendar, 
  Phone, 
  Globe, 
  MapPin, 
  Users, 
  AtSign, 
  Map, 
  Lock, 
  KeyRound 
} from 'lucide-react';
import PositionSelectionStep from './_components/PositionSelectionStep';
import UploadImageStep from './_components/UploadImageStep';
import UploadFileStep from './_components/UploadFileStep';
import { useUser } from '@/lib/useUser';

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

// Reusable FormInput component
interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  icon?: React.ReactNode;
  min?: string;
  max?: string;
}
const FormInput: React.FC<FormInputProps> = ({ 
  label, 
  name, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  error,
  icon,
  min,
  max
}) => {
  return (
    <motion.div 
      className="relative mb-6" 
      variants={itemVariants}
    >
      {label && (
        <label className="block text-white text-sm font-medium mb-1">
          {label}
        </label>
      )}
      <div className="relative flex items-center rounded-lg overflow-hidden shadow-lg">
        {icon && (
          <div className="absolute left-3 text-blue-900/70">
            {icon}
          </div>
        )}
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full p-4 ${icon ? 'pl-10' : 'pl-4'} rounded-lg bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder:text-blue-900/60 text-blue-900 font-medium text-sm transition-all duration-300`}
          min={min}
          max={max}
        />
      </div>
      {error && (
        <p className="mt-1 text-red-400 text-xs font-medium absolute">
          {error}
        </p>
      )}
    </motion.div>
  );
};

// Position type for stepper
type Position = { code: string; name: string };

type FileStatus = 'idle' | 'uploading' | 'error' | 'success';
interface UploadingFile {
  name: string;
  size: number;
  progress: number;
  status: FileStatus;
  type: string;
  url?: string;
  public_id?: string;
}

const CreateProfilePage = () => {
  const router = useRouter();
  const { authenticated, loading } = useUser();
  const [loadingLocal, setLoadingLocal] = useState(false);
  const [step, setStep] = useState(0); // 0: form, 1: position, 2: upload image, 3: upload file
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    email: '',
    club: '',
    nickname: '',
    phoneNumber: '',
    country: '',
    stateRegion: '',
    foot: '',
    position: '',
    password: '',
    confirmPassword: ''
  });
  const [activeTab, setActiveTab] = useState('personal');
  const [selectedPositions, setSelectedPositions] = useState<Position[]>([]);
  const [uploadedImage, setUploadedImage] = useState<UploadingFile | null>(null);
  const [uploadedFile, setUploadedFile] = useState<UploadingFile | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [registrationId, setRegistrationId] = useState<string | null>(null);

  // Calculate max date for 15 years old
  const today = new Date();
  const minAgeDate = new Date(today.getFullYear() - 15, today.getMonth(), today.getDate());
  const maxDateString = minAgeDate.toISOString().split('T')[0];

  useEffect(() => {
    if (!loading && authenticated) {
      router.push('/dashboard');
    }
  }, [authenticated, loading, router]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
    else {
      const dob = new Date(formData.dateOfBirth);
      if (dob > minAgeDate) {
        newErrors.dateOfBirth = 'You must be at least 15 years old';
      }
    }
    if (!formData.nickname.trim()) newErrors.nickname = 'Nickname is required';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';
    if (!formData.stateRegion.trim()) newErrors.stateRegion = 'State/Region is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.club.trim()) newErrors.club = 'Club is required';
    if (!formData.foot.trim()) newErrors.foot = 'Foot is required';
    if (!formData.position.trim()) newErrors.position = 'Position is required';
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setApiError(null);
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoadingLocal(true);
    try {
      const res = await fetch('/api/registeration/step1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
        }),
      });
      const data = await res.json();
      if (res.status === 409) {
        setErrors({ email: 'An account with this email already exists.' });
        setApiError(null);
        setLoadingLocal(false);
        return;
      }
      if (!res.ok) throw new Error(data.error || 'Failed to register');
      setRegistrationId(data.id);
      setStep(1); // Proceed to position selection
    } catch (err: any) {
      setApiError(err.message);
    } finally {
      setLoadingLocal(false);
    }
  };

  // Step 3: Position Selection
  const handleStep3Continue = async () => {
    setApiError(null);
    setLoadingLocal(true);
    try {
      const res = await fetch('/api/registeration/step3', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: registrationId,
          selectedPositions: selectedPositions.map(p => p.code),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save step 3');
      setStep(2); // Go to image upload step
    } catch (err: any) {
      setApiError(err.message);
    } finally {
      setLoadingLocal(false);
    }
  };

  // Step 4: Upload Image
  const handleStep4Continue = () => {
    setStep(3); // Go to file upload step
  };

  // Step 5: Upload File and finish registration
  const handleStep5Continue = async () => {
    setApiError(null);
    setLoadingLocal(true);
    try {
      console.log('Sending step 4 data:', {
        id: registrationId,
        uploadedImageUrl: uploadedImage?.url,
        uploadedImagePublicId: uploadedImage?.public_id,
        uploadedFileName: uploadedFile?.name
      });

      const res = await fetch('/api/registeration/step4', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: registrationId,
          uploadedImageUrl: uploadedImage?.url || null,
          uploadedImagePublicId: uploadedImage?.public_id || null,
          uploadedFileName: uploadedFile?.name || null,
        }),
      });
      
      const data = await res.json();
      console.log('Step 4 response:', data);
      
      if (!res.ok) throw new Error(data.error || 'Failed to save step 4');
      
      router.push('/dashboard');
    } catch (err: any) {
      console.error('Step 4 error:', err);
      setApiError(err.message);
    } finally {
      setLoadingLocal(false);
    }
  };

  const handleBack = () => setStep((s) => s - 1);

  // Step rendering
  let content;
  if (step === 0) {
    content = (
      <form onSubmit={handleSubmit}>
        {apiError && <div className="text-red-500 text-sm mb-2">{apiError}</div>}
        <motion.div 
          className="space-y-1"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={activeTab}
        >
          {/* Personal Info Tab */}
          {activeTab === 'personal' && (
            <>
              <FormInput
                label="Full Name"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                error={errors.fullName}
                icon={<User size={18} />}
              />
              <FormInput
                label="Date of Birth"
                type="date"
                name="dateOfBirth"
                placeholder="Date of Birth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                error={errors.dateOfBirth}
                icon={<Calendar size={18} />}
                min="1900-01-01"
                max={maxDateString}
              />
              <FormInput
                label="Nickname"
                name="nickname"
                placeholder="Nickname"
                value={formData.nickname}
                onChange={handleChange}
                error={errors.nickname}
                icon={<AtSign size={18} />}
              />
              <FormInput
                label="Phone Number"
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                error={errors.phoneNumber}
                icon={<Phone size={18} />}
              />
              <FormInput
                label="Country"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                error={errors.country}
                icon={<Globe size={18} />}
              />
              <FormInput
                label="State / Region"
                name="stateRegion"
                placeholder="State / Region"
                value={formData.stateRegion}
                onChange={handleChange}
                error={errors.stateRegion}
                icon={<Map size={18} />}
              />
              <motion.div variants={itemVariants} className="flex justify-end mt-6">
                <motion.button
                  type="button"
                  onClick={() => setActiveTab('account')}
                  className="bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 flex items-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Next
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </motion.button>
              </motion.div>
            </>
          )}
          
          {/* Account Details Tab */}
          {activeTab === 'account' && (
            <>
              <FormInput
                label="Email"
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                icon={<Mail size={18} />}
              />
              <FormInput
                label="Club"
                name="club"
                placeholder="Club"
                value={formData.club}
                onChange={handleChange}
                error={errors.club}
                icon={<Users size={18} />}
              />
              <FormInput
                label="Foot"
                name="foot"
                placeholder="Left or Right"
                value={formData.foot}
                onChange={handleChange}
                error={errors.foot}
              />
              <FormInput
                label="Position"
                name="position"
                placeholder="e.g. Defense, Midfield, Forward"
                value={formData.position}
                onChange={handleChange}
                error={errors.position}
              />
              
              <FormInput
                label="Create Password"
                type="password"
                name="password"
                placeholder="Create Password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                icon={<Lock size={18} />}
              />
              <FormInput
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                icon={<KeyRound size={18} />}
              />
              <motion.div variants={itemVariants} className="flex justify-between mt-6">
                <motion.button
                  type="button"
                  onClick={() => setActiveTab('personal')}
                  className="bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 flex items-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                  </svg>
                  Back
                </motion.button>
                <motion.button
                  type="submit"
                  className="bg-orange-400 text-blue-950 font-bold py-3 px-6 rounded-lg hover:bg-orange-500 transition-colors duration-300 flex items-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loadingLocal}
                >
                  {loadingLocal ? 'Processing...' : 'Continue'}
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </motion.button>
              </motion.div>
            </>
          )}
        </motion.div>
      </form>
    );
  } else if (step === 1) {
    content = (
      <>
        {apiError && <div className="text-red-500 text-sm mb-2">{apiError}</div>}
        <PositionSelectionStep
          selectedPositions={selectedPositions}
          setSelectedPositions={setSelectedPositions}
          onContinue={handleStep3Continue}
          onBack={handleBack}
        />
      </>
    );
  } else if (step === 2) {
    content = (
      <>
        {apiError && <div className="text-red-500 text-sm mb-2">{apiError}</div>}
        <UploadImageStep
          uploadedImage={uploadedImage}
          setUploadedImage={setUploadedImage}
          onContinue={handleStep4Continue}
          onBack={handleBack}
        />
      </>
    );
  } else if (step === 3) {
    content = (
      <>
        {apiError && <div className="text-red-500 text-sm mb-2">{apiError}</div>}
        <UploadFileStep
          uploadedFile={uploadedFile}
          setUploadedFile={setUploadedFile}
          onContinue={handleStep5Continue}
          onBack={handleBack}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen w-full relative flex justify-center items-center px-4 py-10">
      {/* Background Image */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <img
          src="/images/landing-page/hero-bg.png"
          alt="hero background"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#03033E]/80 to-[#000066]/80" />
      </div>
      
      {step === 0 ? (
        <motion.div 
          className="w-full max-w-xl relative z-10 bg-blue-900/30 backdrop-blur-md p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 adumu">
              <span className="text-white">Create a </span>
              <span className="text-orange-400">profile</span>
            </h1>
            <p className="text-white/90 text-xs sm:text-sm md:text-base mx-auto max-w-xs sm:max-w-md font-medium">
              We believe that you deserve to be seen.
              Create a Spives account now!
            </p>
          </motion.div>
          {/* Tab Navigation */}
          <motion.div variants={itemVariants} className="flex mb-4 sm:mb-6 border-b border-white/20 text-xs sm:text-sm">
            <button
              onClick={() => setActiveTab('personal')}
              className={`flex-1 pb-2 text-sm font-medium ${
                activeTab === 'personal' 
                  ? 'text-orange-400 border-b-2 border-orange-400' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Personal Info
            </button>
            <button
              onClick={() => setActiveTab('account')}
              className={`flex-1 pb-2 text-sm font-medium ${
                activeTab === 'account' 
                  ? 'text-orange-400 border-b-2 border-orange-400' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Account Details
            </button>
          </motion.div>
          {content}
          <motion.div 
            variants={itemVariants}
            className="text-center mt-4 sm:mt-6 text-white flex justify-center items-center gap-2 text-xs sm:text-sm"
          >
            <span className='font-medium'>Already have an account?</span>
            <Link href="/login" className="text-orange-400 adumu hover:text-orange-300 transition-colors font-bold">
              Login
            </Link>
          </motion.div>
          {/* Progress indicator */}
          {activeTab === 'personal' && (
            <motion.div
              variants={itemVariants}
              className="flex justify-center mt-4 sm:mt-6 gap-2"
            >
              <div className="h-1 w-6 rounded-full bg-orange-400"></div>
              <div className="h-1 w-6 rounded-full bg-white/30"></div>
            </motion.div>
          )}
          {activeTab === 'account' && (
            <motion.div
              variants={itemVariants}
              className="flex justify-center mt-4 sm:mt-6 gap-2"
            >
              <div className="h-1 w-6 rounded-full bg-white/30"></div>
              <div className="h-1 w-6 rounded-full bg-orange-400"></div>
            </motion.div>
          )}
        </motion.div>
      ) : (
        content
      )}
    </div>
  );
};

export default CreateProfilePage;
