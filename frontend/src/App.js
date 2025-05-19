import { useState, useEffect, useRef } from "react";
import "./App.css";
import { BsVolumeUpFill, BsVolumeMuteFill } from "react-icons/bs";
import { FaPlay, FaInfoCircle, FaQuestion, FaTrophy } from "react-icons/fa";
import { generateQuestion } from "./questionGenerator";

// Images
const BACKGROUND_IMG = "https://images.unsplash.com/photo-1514439827219-9137a0b99245";
const LOGO_IMG = "https://images.unsplash.com/photo-1588007374946-c79543903e8a";

// Using simple browser audio beeps since we don't have local audio files
const playSimpleBeep = (freq = 440, duration = 200, volume = 0.5, type = 'sine') => {
  if (typeof window === 'undefined' || !window.AudioContext) return;
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.type = type;
    oscillator.frequency.value = freq;
    gainNode.gain.value = volume;
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.start();
    
    setTimeout(() => {
      oscillator.stop();
      setTimeout(() => audioCtx.close(), 100);
    }, duration);
  } catch (e) {
    console.log("Audio playback failed:", e);
  }
};

// Simple audio functions
const playClickSound = () => playSimpleBeep(800, 100, 0.3, 'sine');
const playCorrectSound = () => {
  playSimpleBeep(880, 100, 0.3, 'sine');
  setTimeout(() => playSimpleBeep(1320, 200, 0.3, 'sine'), 100);
};
const playWrongSound = () => playSimpleBeep(220, 300, 0.3, 'square');
const playGameOverSound = () => {
  playSimpleBeep(440, 100, 0.3, 'sawtooth');
  setTimeout(() => playSimpleBeep(330, 100, 0.3, 'sawtooth'), 150);
  setTimeout(() => playSimpleBeep(220, 300, 0.3, 'sawtooth'), 300);
};

function App() {
  // Game state
  const [gameActive, setGameActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [selectedAge, setSelectedAge] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [question, setQuestion] = useState(null);
  const [showRules, setShowRules] = useState(false);
  const [showHighScores, setShowHighScores] = useState(false);
  const [muted, setMuted] = useState(false);
  const [sessionScores, setSessionScores] = useState([]);
  const timerRef = useRef(null);

  // Sound effects are now handled by Web Audio API functions defined above

  // Load high score from session storage
  useEffect(() => {
    const savedHighScore = sessionStorage.getItem('grammarRushHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }

    const savedSessionScores = sessionStorage.getItem('grammarRushSessionScores');
    if (savedSessionScores) {
      setSessionScores(JSON.parse(savedSessionScores));
    }
  }, []);

  // Save high score to session storage when it changes
  useEffect(() => {
    if (highScore > 0) {
      sessionStorage.setItem('grammarRushHighScore', highScore.toString());
    }
  }, [highScore]);

  // Save session scores
  useEffect(() => {
    if (sessionScores.length > 0) {
      sessionStorage.setItem('grammarRushSessionScores', JSON.stringify(sessionScores));
    }
  }, [sessionScores]);

  // Handle background music - disabled since we're using Web Audio API for sound effects
  useEffect(() => {
    // Background music removed to simplify audio implementation
  }, [gameActive, muted]);

  // Set up or clear the timer
  useEffect(() => {
    if (gameActive) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [gameActive]);

  // Generate a new question when needed
  useEffect(() => {
    if (gameActive && selectedAge && difficulty) {
      setQuestion(generateQuestion(selectedAge, difficulty));
    }
  }, [gameActive, score, selectedAge, difficulty]);

  // Start a new game
  const startGame = () => {
    if (!muted) playClickSound();
    setGameActive(true);
    setTimeLeft(60);
    setScore(0);
    setQuestion(generateQuestion(selectedAge, difficulty));
  };

  // End the current game
  const endGame = () => {
    if (!muted) playGameOverSound();
    clearInterval(timerRef.current);
    setGameActive(false);
    
    // Update high score if needed
    if (score > highScore) {
      setHighScore(score);
    }
    
    // Add to session scores
    const newSessionScore = {
      score,
      age: selectedAge,
      difficulty,
      date: new Date().toISOString()
    };
    
    setSessionScores(prev => [...prev, newSessionScore].sort((a, b) => b.score - a.score));
  };

  // Handle answer submission
  const handleAnswer = (answer) => {
    if (!gameActive) return;

    if (question.checkAnswer(answer)) {
      if (!muted) playCorrectSound();
      setScore(prev => prev + (difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3));
    } else {
      if (!muted) playWrongSound();
    }
  };

  // Toggle mute state
  const toggleMute = () => {
    setMuted(prev => !prev);
  };

  // Translate age group to label
  const getAgeLabel = (age) => {
    switch(age) {
      case 'kids': return 'Kids (8-12)';
      case 'teens': return 'Teens (13-17)';
      case 'adults': return 'Adults (18+)';
      default: return '';
    }
  };

  // Translate difficulty to label
  const getDifficultyLabel = (diff) => {
    switch(diff) {
      case 'easy': return 'Easy';
      case 'medium': return 'Medium';
      case 'hard': return 'Hard';
      default: return '';
    }
  };

  return (
    <div className="App relative min-h-screen overflow-hidden font-cyber bg-cyber-black">
      {/* Background image with overlay */}
      <div className="fixed inset-0 z-0">
        <img 
          src={BACKGROUND_IMG} 
          alt="Cyberpunk City" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-cyber-black bg-opacity-70"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-start min-h-screen py-8 px-4">
        {/* Game Logo */}
        <div className="mb-8 transform hover:scale-105 transition-transform">
          <h1 className="flex flex-col items-center text-5xl md:text-6xl font-bold text-neon-blue 
                         tracking-wider mb-2 text-center shadow-neon-blue">
            <span>GRAMMAR</span>
            <span className="text-neon-pink">RUSH V2</span>
          </h1>
          <div className="w-48 h-12 mx-auto overflow-hidden rounded-lg">
            <img src={LOGO_IMG} alt="Grammar Rush Logo" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Main Menu (when game is not active) */}
        {!gameActive && !showRules && !showHighScores && (
          <div className="bg-cyber-dark bg-opacity-90 border border-neon-blue rounded-xl shadow-neon-blue p-6 max-w-md w-full">
            {/* Age Selection */}
            {!selectedAge && (
              <div className="mb-8">
                <h2 className="text-2xl text-neon-green mb-4 text-center">Select Age Group</h2>
                <div className="grid grid-cols-1 gap-4">
                  {['kids', 'teens', 'adults'].map(age => (
                    <button
                      key={age}
                      className={`py-3 px-6 rounded-md text-lg transition-all transform hover:scale-105
                                 border-2 border-neon-blue bg-cyber-gray text-white hover:bg-cyber-light
                                 hover:shadow-neon-blue`}
                      onClick={() => {
                        if (!muted) playClickSound();
                        setSelectedAge(age);
                      }}
                    >
                      {getAgeLabel(age)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Difficulty Selection */}
            {selectedAge && !difficulty && (
              <div className="mb-8">
                <h2 className="text-2xl text-neon-green mb-4 text-center">Select Difficulty</h2>
                <div className="grid grid-cols-1 gap-4">
                  {['easy', 'medium', 'hard'].map(diff => (
                    <button
                      key={diff}
                      className={`py-3 px-6 rounded-md text-lg transition-all transform hover:scale-105
                                 border-2 border-neon-blue bg-cyber-gray text-white hover:bg-cyber-light
                                 hover:shadow-neon-blue`}
                      onClick={() => {
                        if (!muted) playClickSound();
                        setDifficulty(diff);
                      }}
                    >
                      {getDifficultyLabel(diff)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Start Button */}
            {selectedAge && difficulty && (
              <div className="text-center mb-6">
                <div className="mb-6">
                  <p className="text-white mb-2">Age Group: <span className="text-neon-green">{getAgeLabel(selectedAge)}</span></p>
                  <p className="text-white mb-4">Difficulty: <span className="text-neon-green">{getDifficultyLabel(difficulty)}</span></p>
                </div>
                <button
                  className="py-4 px-8 rounded-md text-2xl transition-all transform hover:scale-110
                           border-2 border-neon-green bg-cyber-gray text-white hover:bg-cyber-light
                           hover:shadow-neon-green flex items-center justify-center gap-3 w-full mb-4"
                  onClick={startGame}
                >
                  <FaPlay className="text-neon-green" /> START GAME
                </button>
                <div className="flex justify-between">
                  <button
                    className="py-2 px-3 rounded-md transition-all transform hover:scale-105
                             border border-neon-blue bg-cyber-gray text-white text-sm
                             hover:shadow-neon-blue flex items-center justify-center gap-2"
                    onClick={() => {
                      if (!muted) playClickSound();
                      setSelectedAge(null);
                      setDifficulty(null);
                    }}
                  >
                    Change Settings
                  </button>
                  <button
                    className="py-2 px-3 rounded-md transition-all transform hover:scale-105
                             border border-neon-pink bg-cyber-gray text-white text-sm
                             hover:shadow-neon-pink flex items-center justify-center gap-2"
                    onClick={() => {
                      if (!muted) playClickSound();
                      setShowHighScores(true);
                    }}
                  >
                    <FaTrophy className="text-neon-pink" /> High Scores
                  </button>
                </div>
              </div>
            )}

            {/* Menu Buttons */}
            <div className="flex justify-center">
              <button
                className="py-2 px-4 rounded-md mr-4 transition-all transform hover:scale-105
                         border border-neon-purple bg-cyber-gray text-white
                         hover:shadow-neon-purple flex items-center justify-center gap-2"
                onClick={() => {
                  if (!muted) playClickSound();
                  setShowRules(true);
                }}
              >
                <FaInfoCircle className="text-neon-purple" /> Rules
              </button>
              <button
                className="py-2 px-4 rounded-md transition-all
                         border border-neon-blue bg-cyber-gray text-white
                         hover:shadow-neon-blue flex items-center justify-center"
                onClick={toggleMute}
              >
                {muted ? <BsVolumeMuteFill className="text-neon-blue text-xl" /> : <BsVolumeUpFill className="text-neon-blue text-xl" />}
              </button>
            </div>
          </div>
        )}

        {/* Rules Screen */}
        {showRules && (
          <div className="bg-cyber-dark bg-opacity-90 border border-neon-purple rounded-xl shadow-neon-purple p-6 max-w-md w-full">
            <h2 className="text-2xl text-neon-purple mb-4 text-center">How to Play</h2>
            <div className="text-white mb-6 space-y-3">
              <p>🎮 <span className="text-neon-green">Grammar Rush</span> tests your grammar skills in a fast-paced game.</p>
              <p>⏱️ You have <span className="text-neon-pink">60 seconds</span> to answer as many questions as possible.</p>
              <p>💯 Points per correct answer:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Easy: 1 point</li>
                <li>Medium: 2 points</li>
                <li>Hard: 3 points</li>
              </ul>
              <p>🧠 Questions adapt to your age group:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Kids: Basic grammar rules</li>
                <li>Teens: Modern language context</li>
                <li>Adults: Professional writing rules</li>
              </ul>
              <p>🏆 Your high scores are saved for this session!</p>
            </div>
            <button
              className="py-3 px-6 rounded-md text-lg w-full transition-all transform hover:scale-105
                       border-2 border-neon-blue bg-cyber-gray text-white hover:bg-cyber-light
                       hover:shadow-neon-blue"
              onClick={() => {
                if (!muted) playClickSound();
                setShowRules(false);
              }}
            >
              Back to Menu
            </button>
          </div>
        )}

        {/* High Scores Screen */}
        {showHighScores && (
          <div className="bg-cyber-dark bg-opacity-90 border border-neon-pink rounded-xl shadow-neon-pink p-6 max-w-md w-full">
            <h2 className="text-2xl text-neon-pink mb-4 text-center">High Scores</h2>
            {sessionScores.length > 0 ? (
              <div className="mb-6 max-h-64 overflow-y-auto">
                <table className="w-full text-white">
                  <thead className="border-b border-neon-blue">
                    <tr>
                      <th className="py-2 text-left text-neon-blue">Score</th>
                      <th className="py-2 text-left text-neon-blue">Age</th>
                      <th className="py-2 text-left text-neon-blue">Difficulty</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sessionScores.map((score, index) => (
                      <tr key={index} className="border-b border-cyber-gray">
                        <td className="py-2 text-neon-green">{score.score}</td>
                        <td className="py-2">{getAgeLabel(score.age)}</td>
                        <td className="py-2">{getDifficultyLabel(score.difficulty)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-white mb-6 text-center">No scores yet. Play a game first!</p>
            )}
            <button
              className="py-3 px-6 rounded-md text-lg w-full transition-all transform hover:scale-105
                       border-2 border-neon-blue bg-cyber-gray text-white hover:bg-cyber-light
                       hover:shadow-neon-blue"
              onClick={() => {
                if (!muted) playClickSound();
                setShowHighScores(false);
              }}
            >
              Back to Menu
            </button>
          </div>
        )}

        {/* Game Screen */}
        {gameActive && question && (
          <div className="bg-cyber-dark bg-opacity-90 border border-neon-green rounded-xl shadow-neon-green p-6 max-w-2xl w-full">
            {/* Timer and Score */}
            <div className="flex justify-between mb-6">
              <div className="text-white">
                <p className="text-sm">Score</p>
                <p className="text-3xl text-neon-green">{score}</p>
              </div>
              <div className={`text-white ${timeLeft <= 10 ? 'animate-pulse text-neon-pink' : ''}`}>
                <p className="text-sm">Time Left</p>
                <p className="text-3xl">{timeLeft}</p>
              </div>
            </div>

            {/* Question Display */}
            <div className="mb-6">
              <p className="text-neon-blue mb-2 text-sm">{question.type}</p>
              <div className="bg-cyber-light p-4 rounded-lg border border-neon-blue mb-4">
                <p className="text-white text-lg" dangerouslySetInnerHTML={{ __html: question.prompt }}></p>
              </div>
              
              {/* Question-specific UI based on type */}
              {question.type === 'multipleChoice' && (
                <div className="grid grid-cols-1 gap-3">
                  {question.options.map((option, index) => (
                    <button
                      key={index}
                      className="py-3 px-4 rounded-md text-left transition-all 
                               border border-neon-blue bg-cyber-gray text-white hover:bg-cyber-light
                               hover:shadow-neon-blue"
                      onClick={() => handleAnswer(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}

              {question.type === 'fillInBlank' && (
                <div className="flex flex-col items-center">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full mb-4">
                    {question.options.map((option, index) => (
                      <button
                        key={index}
                        className="py-3 px-4 rounded-md text-center transition-all 
                                 border border-neon-blue bg-cyber-gray text-white hover:bg-cyber-light
                                 hover:shadow-neon-blue"
                        onClick={() => handleAnswer(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {question.type === 'errorIdentification' && (
                <div className="flex flex-col items-center">
                  <p className="text-white mb-3">Select the part with the error:</p>
                  <div className="grid grid-cols-1 gap-3 w-full">
                    {question.options.map((option, index) => (
                      <button
                        key={index}
                        className="py-3 px-4 rounded-md text-left transition-all 
                                 border border-neon-blue bg-cyber-gray text-white hover:bg-cyber-light
                                 hover:shadow-neon-blue"
                        onClick={() => handleAnswer(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {question.type === 'sentenceRearrangement' && (
                <div className="flex flex-col items-center">
                  <p className="text-white mb-3">Arrange in the correct order:</p>
                  <div className="grid grid-cols-1 gap-3 w-full">
                    {question.options.map((option, index) => (
                      <button
                        key={index}
                        className="py-3 px-4 rounded-md text-left transition-all 
                                 border border-neon-blue bg-cyber-gray text-white hover:bg-cyber-light
                                 hover:shadow-neon-blue"
                        onClick={() => handleAnswer(index)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Control Buttons */}
            <div className="flex justify-between">
              <button
                className="py-2 px-4 rounded-md text-sm transition-all
                         border border-neon-pink bg-cyber-gray text-white
                         hover:shadow-neon-pink"
                onClick={endGame}
              >
                End Game
              </button>
              <button
                className="py-2 px-4 rounded-md text-sm transition-all
                         border border-neon-blue bg-cyber-gray text-white
                         hover:shadow-neon-blue flex items-center justify-center gap-2"
                onClick={toggleMute}
              >
                {muted ? <BsVolumeMuteFill className="text-neon-blue" /> : <BsVolumeUpFill className="text-neon-blue" />}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;