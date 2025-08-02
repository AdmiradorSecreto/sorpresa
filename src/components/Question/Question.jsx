import { useState, useEffect } from 'react';
import './Question.css';

// Componente para mostrar una pregunta con opciones de respuesta
const Question = ({ question, onAnswer }) => {
  // Estado local para manejar el feedback visual
  const [feedback, setFeedback] = useState(''); // 'correct', 'incorrect', o vacío
  const [incorrectOption, setIncorrectOption] = useState(null);
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);

  // Función que se ejecuta al seleccionar una opción
  const handleOptionClick = (selectedOption) => {
    // Si la pregunta ya ha sido respondida correctamente, no hacemos nada
    if (answeredCorrectly) {
      return;
    }

    // Comprobamos si la opción seleccionada es la correcta
    if (selectedOption === question.answer) {
      setFeedback('correct');
      setAnsweredCorrectly(true);
      onAnswer(true); // Llama a la función del componente padre indicando que es correcto
    } else {
      setFeedback('incorrect');
      setIncorrectOption(selectedOption); // Guardamos la opción incorrecta para darle estilo
      onAnswer(false); // Llamamos a la función del padre indicando que es incorrecto (aunque el juego no avanza)
    }
  };

  // Reseteamos el estado local de la pregunta cada vez que cambia
  useEffect(() => {
    setFeedback('');
    setIncorrectOption(null);
    setAnsweredCorrectly(false);
  }, [question]);

  return (
    <div className="question-container fade-in">
      <p className="question-text">{question.text}</p>
      <div className="options-container">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={`option-button 
              ${answeredCorrectly && option === question.answer ? 'correct' : ''} 
              ${incorrectOption === option ? 'incorrect' : ''}
            `}
            onClick={() => handleOptionClick(option)}
            disabled={answeredCorrectly} // Solo se deshabilita si se ha acertado
          >
            {option}
          </button>
        ))}
      </div>

      {/* Mensajes de feedback */}
      {feedback === 'correct' && (
        <p className="feedback-correct">¡Respuesta correcta!</p>
      )}
      {feedback === 'incorrect' && (
        <p className="feedback-hint">
          Pista: {question.hint}
        </p>
      )}
    </div>
  );
};

export default Question;
