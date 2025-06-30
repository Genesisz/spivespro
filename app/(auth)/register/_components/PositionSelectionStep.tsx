import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Position {
  code: string;
  name: string;
}

interface PositionSelectionStepProps {
  selectedPositions: Position[];
  setSelectedPositions: (positions: Position[]) => void;
  onContinue: () => void;
  onBack: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 }
  }
};

const fadeVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5 }
  }
};

const positions: Position[] = [
  { code: 'GK', name: 'Goalkeeper' },
  { code: 'LB', name: 'Left Back' },
  { code: 'LCB', name: 'Left Center Back' },
  { code: 'CB', name: 'Center Back' },
  { code: 'RB', name: 'Right Back' },
  { code: 'RCB', name: 'Right Center Back' },
  { code: 'RWB', name: 'Right Wing Back' },
  { code: 'LM', name: 'Left Midfielder' },
  { code: 'LWB', name: 'Left Wing Back' },
  { code: 'CM', name: 'Center Midfielder' },
  { code: 'CDM', name: 'Center Defensive Mid' },
  { code: 'RM', name: 'Right Midfielder' },
  { code: 'CAM', name: 'Center Attacking Mid' },
  { code: 'RAM', name: 'Right Attacking Mid' },
  { code: 'LAM', name: 'Left Attacking Mid' },
  { code: 'LW', name: 'Left Winger' },
  { code: 'LWF', name: 'Left Wing Forward' },
  { code: 'RWF', name: 'Right Wing Forward' },
  { code: 'RW', name: 'Right Winger' },
  { code: 'CF', name: 'Center Forward' },
  { code: 'SS', name: 'Second Striker' },
];

const positionRows = [
  positions.slice(0, 7),
  positions.slice(7, 14),
  positions.slice(14, 21),
];

const PositionSelectionStep: React.FC<PositionSelectionStepProps> = ({ selectedPositions, setSelectedPositions, onContinue, onBack }) => {
  const [error, setError] = useState('');

  const handlePositionSelect = (position: Position) => {
    setError('');
    if (selectedPositions.some((p) => p.code === position.code)) {
      setSelectedPositions(selectedPositions.filter((p) => p.code !== position.code));
      return;
    }
    if (selectedPositions.length >= 4) {
      setError('You can only select 4 positions. Deselect one to continue.');
      return;
    }
    setSelectedPositions([...selectedPositions, position]);
  };

  const handleSubmit = () => {
    if (selectedPositions.length !== 4) {
      setError('Please select exactly 4 positions to continue');
      return;
    }
    onContinue();
  };

  const isSelected = (code: string) => selectedPositions.some((p) => p.code === code);
  const getPositionIndex = (code: string) => {
    const index = selectedPositions.findIndex((p) => p.code === code);
    return index !== -1 ? index + 1 : null;
  };

  return (
    <div className="w-full max-w-3xl relative z-10">
      <motion.div initial="hidden" animate="visible" variants={containerVariants}>
        <motion.div variants={fadeVariants} className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold mb-2 adumu">
            <span className="text-white">Select </span>
            <span className="text-orange-400">4 Positions</span>
          </h1>
          <p className="text-white/90 text-sm md:text-base mx-auto max-w-lg font-medium">
            Pick four different positions you feel very comfortable playing.
          </p>
        </motion.div>
        {error && (
          <motion.div className="bg-red-500/20 border border-red-500/40 text-white p-3 rounded-lg mb-6 text-center" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {error}
          </motion.div>
        )}
        <motion.div className="grid grid-cols-7 gap-3 md:gap-4 mb-8" variants={containerVariants}>
          {positionRows.map((row, rowIndex) => (
            <React.Fragment key={`row-${rowIndex}`}>
              {row.map((position) => (
                <motion.div key={position.code} variants={itemVariants} className="col-span-1">
                  <motion.button
                    type="button"
                    onClick={() => handlePositionSelect(position)}
                    className={`relative w-full aspect-square rounded-full flex items-center justify-center ${
                      isSelected(position.code)
                        ? 'bg-blue-700 border-2 border-orange-400 text-orange-400'
                        : 'bg-blue-900/80 text-yellow-400 hover:bg-blue-800 border-2 border-transparent'
                    } transition-all duration-300`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title={position.name}
                  >
                    <span className="font-bold text-sm md:text-lg">{position.code}</span>
                    {isSelected(position.code) && (
                      <motion.div className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3 bg-orange-400 rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-blue-900 text-xs font-bold" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                        {getPositionIndex(position.code)}
                      </motion.div>
                    )}
                  </motion.button>
                </motion.div>
              ))}
            </React.Fragment>
          ))}
        </motion.div>
        <div className="flex justify-between mt-6">
          <button type="button" onClick={onBack} className="bg-white/10 hover:bg-white/20 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300">Back</button>
          <button type="button" onClick={handleSubmit} className="bg-orange-400 text-blue-950 font-bold py-2 px-6 rounded-lg hover:bg-orange-500 transition-colors duration-300">Continue</button>
        </div>
      </motion.div>
    </div>
  );
};

export default PositionSelectionStep; 