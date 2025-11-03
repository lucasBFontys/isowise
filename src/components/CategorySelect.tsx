'use client';
// FIX: verwijder ongebruikte imports (useRef, useCallback)
// FIX: verwijder ongebruikte setCategories; gebruik alleen [categories]
// FIX: verwijder allCategories uit useEffect deps (const verandert niet)

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';

// Define data structures
interface Category {
  id: string;
  name: string;
  color: string; // Tailwind class or hex color
  initialPosition?: { x: number; y: number }; // Relative to cloud or container
}

interface CategorySelectProps {
  onCategorySelect: (categoryId: string) => void;
}

// Sample Category Data
const allCategories: Category[] = [
  { id: 'werkn-afstand', name: 'Werken op afstand', color: 'bg-pink-500', initialPosition: { x: -200, y: -60 } },
  { id: 'toegangsbeheer', name: 'Toegangsbeheer', color: 'bg-purple-500', initialPosition: { x: -240, y: 60 } },
  { id: 'risicobeheer', name: 'Risicobeheer', color: 'bg-teal-300', initialPosition: { x: -120, y: 200 } },
  { id: 'infobeleid', name: 'Informatiebeveiligingsbeleid', color: 'bg-yellow-400', initialPosition: { x: 120, y: -140 } },
  { id: 'fysiek', name: 'Fysieke beveiliging', color: 'bg-indigo-500', initialPosition: { x: 240, y: 60 } },
  { id: 'incident', name: 'Incidentmanagement', color: 'bg-blue-500', initialPosition: { x: 200, y: 200 } },
];

// Animation Variants
const pillVariants = {
  initial: ({ initialPosition, i }: { initialPosition: { x: number; y: number }, i: number }) => ({
    x: initialPosition.x || 0,
    y: initialPosition.y || 0,
    opacity: 1,
    scale: 1,
    // Subtle floating animation
    transition: {
      y: {
        repeat: Infinity,
        duration: 2,
        ease: 'easeInOut',
        delay: i * 0.1,
        repeatType: 'reverse',
      },
    },
  }),
  gather: {
    x: 0,
    y: 0,
    opacity: 0,
    scale: 0.5,
    transition: { duration: 0.8, ease: 'easeIn' },
  },
  selected: {
    x: 0,
    y: 200, // Position below the cloud
    opacity: 1,
    scale: 1.2,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

const cloudVariants = {
  initial: {},
  shaking: {
    x: [0, -5, 5, -5, 5, 0], // Shake animation
    transition: {
      duration: 0.6,
      repeat: 0, // Only shake once
      ease: 'easeInOut',
    },
  },
};

const CategorySelect = ({ onCategorySelect }: CategorySelectProps) => {
  const [animationPhase, setAnimationPhase] = useState('initial'); // initial, gathering, selecting, selected
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [categories] = useState<Category[]>(allCategories); // Use allCategories initially
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });

  // Get window dimensions for confetti
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize(); // Set initial size
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Start the animation sequence on component mount
  useEffect(() => {
    const initialAnimationDelay = 1000; // Add a short delay before starting the animation (ms)

    const startAnimation = setTimeout(() => {
      setAnimationPhase('gathering');

      // Select a random category after a delay
      const selectionDelay = 1500; // ms
      const timeoutId = setTimeout(() => {
        setAnimationPhase('selecting');
        const randomIndex = Math.floor(Math.random() * allCategories.length);
        setSelectedCategory(allCategories[randomIndex]);

        // Show selected pill and confetti after another delay
        const revealDelay = 800; // ms
        const revealTimeoutId = setTimeout(() => {
          setAnimationPhase('selected');
          setShowConfetti(true);

          // Turn off confetti after a few seconds
          const confettiTimeoutId = setTimeout(() => {
            setShowConfetti(false);
          }, 5000); // Confetti duration
          return () => clearTimeout(confettiTimeoutId);
        }, revealDelay);
        return () => clearTimeout(revealTimeoutId);
      }, selectionDelay);

      // Cleanup timeout on component unmount
      return () => clearTimeout(timeoutId);
    }, initialAnimationDelay); // Apply initial delay here

    // Cleanup the initial animation delay timeout
    return () => clearTimeout(startAnimation);

  }, []);

  return (
    <div className="min-h-screen bg-[#220028] flex flex-col items-center justify-center relative overflow-hidden p-4">
      {/* Pink curvy lines background */}
      {/* Using a div with background color for now, replace with Image if needed */}
      <div className="absolute inset-0 z-0" style={{ backgroundColor: '#220028' }}>
        {/* Placeholder for pink curvy lines */}
        {/* <Image src="/images/pink-lines.png" alt="background lines" fill className="object-cover opacity-50" /> */}
      </div>

      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={false}
          numberOfPieces={500}
        />
      )}

      {/* Cloud in center */}
      <motion.div
        className="relative z-10 mt-20"
        variants={cloudVariants}
        animate={animationPhase === 'selecting' ? 'shaking' : 'initial'}
      >
         {/* Using a div with background color for now, replace with Image if needed */}
         {/* <div className="w-96 h-60 bg-gray-300 rounded-full flex items-center justify-center"> */}
             <Image src="/images/wolk.png" alt="cloud" width={800} height={500} className="object-contain" />
             {/* <span className="text-gray-800 font-bold">Cloud Placeholder</span> */}
         {/* </div> */}
      </motion.div>

      {/* Category Pills */}
      <AnimatePresence>
        {animationPhase === 'initial' && categories.map((category, i) => (
          <motion.div
            key={category.id}
            className={`absolute z-20 px-6 py-3 rounded-full text-white font-bold text-center shadow-lg cursor-pointer ${category.color}`}
            variants={pillVariants}
            initial="initial"
            animate="initial"
            exit="gather"
            custom={{ initialPosition: category.initialPosition, i }}
            // onClick={() => handleCategoryClick(category)} // Implement category selection logic later
          >
            {category.name}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Selected Category Pill */}
      <AnimatePresence>
        {animationPhase === 'selected' && selectedCategory && (
           <motion.div
            key={selectedCategory.id}
            className={`absolute z-20 px-8 py-4 rounded-full text-white text-xl font-bold text-center shadow-lg ${selectedCategory.color}`}
            variants={pillVariants}
            initial="gather"
            animate="selected"
            exit={{ opacity: 0, scale: 0.5 }}
          >
            {selectedCategory.name}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Play Button for Selected Category */}
       <AnimatePresence>
        {animationPhase === 'selected' && selectedCategory && (
           <motion.button
            className="mt-80 px-8 py-4 bg-white rounded-full font-['Press_Start_2P'] text-black text-xl shadow-lg z-20 hover:scale-105 transition-transform"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            onClick={() => onCategorySelect(selectedCategory.id)} // Call the prop function
          >
            play
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
};

export default CategorySelect; 