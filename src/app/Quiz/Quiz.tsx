// FIX: wrap startQuestionTimer in useCallback en voeg toe aan deps
// FIX: gebruik expliciete types i.p.v. any (bijv. number | null, NodeJS.Timeout)
// FIX: voeg startQuestionTimer toe aan useEffect dependency array
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Poppins } from 'next/font/google';

// Define font
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
});

// Define data structures
interface Answer {
  text: string;
  isCorrect: boolean;
}

interface Question {
  id: string;
  questionText: string;
  imageSrc?: string;
  answers: Answer[];
  timeLimit: number; // seconds
  category: string;
}

// Sample Question Data (can be moved to a separate file later)
const allQuestions: Question[] = [
  {
    id: 'q1',
    questionText: 'Wat is het eerste stap in het risicobeheerproces volgens ISO 27001?',
    imageSrc: '/images/risk-management.png', // Placeholder image
    answers: [
      { text: 'Risicobehandeling', isCorrect: false },
      { text: 'Risico-identificatie', isCorrect: true },
      { text: 'Risico-evaluatie', isCorrect: false },
      { text: 'Risicocommunicatie', isCorrect: false },
    ],
    timeLimit: 15,
    category: 'ISO 27001',
  },
  // Add more questions here
];

// Helper function to shuffle array
const shuffleArray = (array: Question[]): Question[] => {
  let currentIndex = array.length;
  let randomIndex: number;
  
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    
    // Swap elements with proper typing
    const temp: Question = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }
  
  return array;
};

const Quiz = () => {
  const router = useRouter();

  // State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const feedbackTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleAnswer = useCallback((answerIndex: number | null) => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (selectedAnswerIndex !== null) return; // Prevent multiple clicks

    setSelectedAnswerIndex(answerIndex);

    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const correct = answerIndex !== null && currentQuestion.answers[answerIndex].isCorrect;

    setIsCorrect(correct);

    let earned = 0;
    if (correct) {
      let multiplier = 1.0;
      if (streak === 1) multiplier = 1.2;
      if (streak >= 2) multiplier = 1.5; // Max multiplier
      earned = Math.round(100 * multiplier);
      setScore(prevScore => prevScore + earned);
      setStreak(prevStreak => prevStreak + 1);
    } else {
      setStreak(0);
      earned = 0;
    }
    setPointsEarned(earned);

    setShowFeedback(true);

    // Automatically move to the next question after a delay
    feedbackTimeoutRef.current = setTimeout(() => {
      setShowFeedback(false);
      setSelectedAnswerIndex(null);
      if (currentQuestionIndex < shuffledQuestions.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      } else {
        // End of quiz
        console.log('Quiz finished! Final Score:', score);
        // TODO: Handle end of quiz (e.g., show final score screen or navigate)
      }
    }, 2000); // 2 second delay
  }, [currentQuestionIndex, shuffledQuestions, selectedAnswerIndex, streak, score]);

  const startQuestionTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    const timeLimit = shuffledQuestions[currentQuestionIndex]?.timeLimit || 10;
    setTimeLeft(timeLimit);

    timerRef.current = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          handleAnswer(null);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  }, [currentQuestionIndex, shuffledQuestions, handleAnswer]);

  // Effect to initialize questions
  useEffect(() => {
    const questionsForRound = allQuestions;
    setShuffledQuestions(shuffleArray([...questionsForRound]));

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      if (feedbackTimeoutRef.current) {
        clearTimeout(feedbackTimeoutRef.current);
        feedbackTimeoutRef.current = null;
      }
    };
  }, []);

  // Effect to start timer when question changes
  useEffect(() => {
    if (shuffledQuestions.length > 0 && !showFeedback) {
      startQuestionTimer();
    }
  }, [currentQuestionIndex, shuffledQuestions, startQuestionTimer, showFeedback]);

  const handleBackClick = () => {
    router.back();
  };

  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const totalQuestions = shuffledQuestions.length;
  const questionNumber = currentQuestionIndex + 1;
  const progressWidth = (timeLeft / (currentQuestion?.timeLimit || 10)) * 100; // Calculate progress percentage

  if (!currentQuestion) {
    return <div>Loading quiz...</div>; // Or a loading spinner
  }

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen bg-[#220028] text-white p-6 ${poppins.className} relative`}>
      {/* Back Arrow */}
      <button
        className="absolute top-6 left-6 text-white text-2xl z-20"
        onClick={handleBackClick}
        aria-label="Go back"
      >
        ← {/* Placeholder for back arrow icon */}
      </button>

      {/* Question Progress */}
      <div className="absolute top-6 right-6 text-white text-xl font-bold z-20">
        {questionNumber}/{totalQuestions}
      </div>

      {/* Question Content */}
      <div className="flex flex-col items-center justify-center w-full max-w-2xl text-center mb-8 z-10">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          {currentQuestion.questionText}
        </h1>
        {currentQuestion.imageSrc && (
          <div className="mb-6 rounded-lg overflow-hidden shadow-lg">
             <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 Aspect Ratio */ }}>
                <Image
                   src={currentQuestion.imageSrc}
                   alt="Question related image"
                   fill
                   className="object-cover"
                   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
             </div>
          </div>
        )}
      </div>

      {/* Time Progress Bar */}
      <div className="w-full max-w-2xl h-3 bg-gray-300 rounded-full overflow-hidden mb-8 z-10">
        <div
          className="h-full bg-pink-500 transition-all duration-1000 ease-linear"
          style={{ width: `${progressWidth}%` }}
        >
        </div>
      </div>

      {/* Answers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl z-10">
        {currentQuestion.answers.map((answer, index) => (
          <button
            key={index}
            className={`
              flex items-center p-6 rounded-xl shadow-lg text-left font-bold text-black
              ${selectedAnswerIndex !== null
                ? answer.isCorrect
                  ? 'bg-green-400' // Correct answer after selection
                  : selectedAnswerIndex === index
                    ? 'bg-red-400' // Incorrect selected answer
                    : 'bg-white opacity-70' // Unselected answers
                : 'bg-white hover:bg-gray-200' // Before selection
              }
            `}
            onClick={() => handleAnswer(index)}
            disabled={selectedAnswerIndex !== null}
            aria-label={`Answer: ${answer.text}`}
          >
            {/* Icon Placeholder */}
            <div className="mr-4 text-2xl">
              {index === 0 && '+'}
              {index === 1 && '□'}
              {index === 2 && '✕'}
              {index === 3 && '◆'}
            </div>
            <span>{answer.text}</span>
          </button>
        ))}
      </div>

      {/* Feedback Overlay */}
      {showFeedback && (
        <div className={`
          absolute inset-0 flex flex-col items-center justify-center z-50
          ${isCorrect ? 'bg-green-600 bg-opacity-75' : 'bg-red-600 bg-opacity-75'}
        `}>
          <div className={`text-white text-6xl md:text-8xl font-bold mb-4 ${isCorrect ? '' : ''}`}> {/* Add pixel font here later */}
            {isCorrect ? 'Goed' : 'Fout'}
          </div>
          <div className={`text-white text-4xl md:text-6xl ${isCorrect ? '' : ''}`}> {/* Add pixel font here later */}
             {isCorrect ? `+${pointsEarned}` : '0'}
             {isCorrect && (
                 <Image
                     src="/images/coin.png"
                     alt="Coin icon"
                     width={40}
                     height={40}
                     className="inline-block ml-2"
                     priority
                 />
             )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz; 