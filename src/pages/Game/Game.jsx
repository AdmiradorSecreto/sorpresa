import { useState, useEffect } from 'react';
import levelsData from '../../data/levelsData';
import Question from '../../components/Question/Question';
import Level from '../../components/Level/Level'; // Importamos el nuevo componente Level
import { useNavigate } from 'react-router-dom';
import '../../styles/App.css';
import './Game.css';

const Game = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [isLevelIntro, setIsLevelIntro] = useState(true); // Nuevo estado para controlar la pantalla de intro
  const navigate = useNavigate();

  // Cargar progreso de localStorage al iniciar la aplicación
  useEffect(() => {
    const savedProgress = localStorage.getItem('escapeRoomProgress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setCurrentLevel(progress.level);
      setCurrentQuestionIndex(progress.currentQuestionIndex);
      setAnsweredQuestions(progress.answeredQuestions);
      // Asumimos que si hay progreso, ya no estamos en la intro del primer nivel
      // Sin embargo, queremos que se vea la intro de cada nuevo nivel
      setIsLevelIntro(progress.isLevelIntro !== undefined ? progress.isLevelIntro : true);
    }
  }, []);

  // Guardar progreso en localStorage cada vez que cambia el estado
  useEffect(() => {
    localStorage.setItem('escapeRoomProgress', JSON.stringify({
      level: currentLevel,
      currentQuestionIndex: currentQuestionIndex,
      answeredQuestions: answeredQuestions,
      isLevelIntro: isLevelIntro
    }));
  }, [currentLevel, currentQuestionIndex, answeredQuestions, isLevelIntro]);

  // Manejar la respuesta del usuario
  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      const nextQuestionIndex = currentQuestionIndex + 1;
      const currentLevelData = levelsData.find(level => level.id === currentLevel);
      
      if (nextQuestionIndex < currentLevelData.questions.length) {
        setCurrentQuestionIndex(nextQuestionIndex);
      } else {
        setTimeout(() => {
          nextLevel();
        }, 1500);
      }
    }
  };

  // Función para avanzar al siguiente nivel
  const nextLevel = () => {
    if (currentLevel < levelsData.length) {
      setCurrentLevel(currentLevel + 1);
      setCurrentQuestionIndex(0);
      setIsLevelIntro(true);
    } else {
      navigate('/final');
    }
  };

  const startLevel = () => {
    setIsLevelIntro(false);
  };

  // Obtener los datos del nivel y la pregunta actual
  const currentLevelData = levelsData.find(level => level.id === currentLevel);
  const currentQuestion = currentLevelData.questions[currentQuestionIndex];

  // Calcular el progreso total
  const totalQuestions = levelsData.reduce((acc, level) => acc + level.questions.length, 0);
  let totalAnswered = 0;
  for (let i = 0; i < currentLevel - 1; i++) {
    totalAnswered += levelsData[i].questions.length;
  }
  totalAnswered += currentQuestionIndex;
  
  const progressPercentage = Math.round((totalAnswered / totalQuestions) * 100);

  return (
    <div className="game-container fade-in" style={{ backgroundColor: currentLevelData.themeColor }}>
      {isLevelIntro ? (
        <Level
          title={currentLevelData.title}
          onStart={startLevel}
        />
      ) : (
        <>
          <div className="level-info">
            <h2>{currentLevelData.title}</h2>
          </div>
          {currentQuestion && (
            <Question
              key={currentQuestion.id}
              question={currentQuestion}
              onAnswer={handleAnswer}
            />
          )}
          {/* Barra de progreso */}
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
            <span className="progress-text">{progressPercentage}%</span>
          </div>
        </>
      )}
    </div>
  );
};

export default Game;