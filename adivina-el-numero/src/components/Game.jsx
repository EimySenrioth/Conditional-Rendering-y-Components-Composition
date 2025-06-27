// importo tres componentes hijos
// InputNumber: Componente para ingresar el número.
// Message: Componente para mostrar mensajes al usuario.
// RestartButton: Componente para reiniciar el juego.
import  { useState, useEffect } from 'react';
import InputNumber from './InputNumber';
import Message from './Message';
import RestartButton from './RestartButton';
// uso mis estafos para manejar el número secreto, la adivinanza del usuario, los intentos, el estado del juego, el mensaje y el historial de adivinanzas.
//secretNumber Número aleatorio secreto entre 1 y 100
//userGuess Adivinanza del usuario.
//attempts Número de intentos realizados por el usuario.
//gameStatus Estado del juego ('playing', 'won', 'lost').
//message Mensaje para mostrar al usuario.
//messageType Tipo de mensaje ('info', 'success', 'error', 'hint').
//guessHistory Historial de adivinanzas del usuario.
//maxAttempts Número máximo de intentos permitidos (7 en este caso xd).
const Game = () => {
  const [secretNumber, setSecretNumber] = useState(0);
  const [userGuess, setUserGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'won', 'lost'
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('info');
  const [guessHistory, setGuessHistory] = useState([]);
  const maxAttempts = 7;

  // Inicializar el juego
  //Genera un número secreto
  //Reinicia todos los estados del juego para comenzar una nueva partida
  const initializeGame = () => {
    const newSecretNumber = Math.floor(Math.random() * 100) + 1;
    setSecretNumber(newSecretNumber);
    setUserGuess('');
    setAttempts(0);
    setGameStatus('playing');
    setMessage('¡Adivina el número entre 1 y 100!');
    setMessageType('info');
    setGuessHistory([]);
  };

  // Inicializar el juego al cargar el componente, solo una vez cuando se carga la pagina
  useEffect(() => {
    initializeGame();
  }, []);

  // Manejar el envío de la adivinanza
  const handleSubmitGuess = () => {
    if (!userGuess || userGuess === '') {
      setMessage('Por favor, ingresa un número válido');
      setMessageType('error');
      return;
    }// Verifica si el input es un número válido

    const guess = parseInt(userGuess);// Convierte la adivinanza del usuario a un número entero
    //Si el número no está entre 1 y 100, también lanza error
    if (guess < 1 || guess > 100) {
      setMessage('El número debe estar entre 1 y 100');
      setMessageType('error');
      return;
    }
//Se calcula newAttempts mas 1 por cada vez que se intenta y se actualiza el historial
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    setGuessHistory([...guessHistory, guess]);
//se verifica si gano
//se acabaron los intentos
//se da una pista si no adivina
    if (guess === secretNumber) {
      setMessage(`¡Felicidades! Adivinaste el número ${secretNumber} en ${newAttempts} intento${newAttempts > 1 ? 's' : ''}!`);
      setMessageType('success');
      setGameStatus('won');
    } else if (newAttempts >= maxAttempts) {
      setMessage(`¡Se acabaron los intentos!  El número era ${secretNumber}`);
      setMessageType('error');
      setGameStatus('lost');
    } else {
      const remainingAttempts = maxAttempts - newAttempts;
      let hint = '';
      
      if (guess < secretNumber) {
        hint = `📈 Muy bajo! El número es mayor que ${guess}`;
      } else {
        hint = `📉 Muy alto! El número es menor que ${guess}`;
      }
      
      setMessage(`${hint} (Te quedan ${remainingAttempts} intento${remainingAttempts > 1 ? 's' : ''})`);
      setMessageType('hint');
    }

    setUserGuess('');
  };

  // Determinar la clase CSS para cada intento en el historial
  const getHistoryItemClass = (guess) => {//se recibe el numero
    // Compara la adivinanza con el número secreto y devuelve una clase CSS
    if (guess === secretNumber) return 'correct';
    if (guess < secretNumber) return 'low';
    return 'high';
  };
// Renderizar el componente del juego
//style={{ width: `${(attempts / maxAttempts) * 100}%` }} para ajustar dinámicamente el ancho de un elemento en función del progreso (como una barra de progreso
  return (
    <div className="game-container">
      <div className="game-card fade-in">
        <div className="game-header">
          <h1 className="game-title">Adivina el Número</h1>
          <p className="game-subtitle">Encuentra el número secreto entre 1 y 100</p>
        </div>

        <div className="attempts-section">
          <div className="attempts-info">
            <span className="attempts-text">
              Intentos: {attempts}/{maxAttempts}
            </span>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${(attempts / maxAttempts) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <Message message={message} type={messageType} />

        {gameStatus === 'playing' && (
          <div className="game-actions">
            <InputNumber
              value={userGuess}
              onChange={setUserGuess}
              onSubmit={handleSubmitGuess}
              disabled={false}
              placeholder="Ingresa tu número..."
            />
            <button
              onClick={handleSubmitGuess}
              className="btn btn-primary"
            >
              Adivinar
            </button>
          </div>
        )}

        {gameStatus !== 'playing' && (
          <div className="game-actions">
            <RestartButton onClick={initializeGame} />
          </div>
        )}

        {guessHistory.length > 0 && (
          <div className="history-section">
            <h3 className="history-title">Historial de intentos:</h3>
            <div className="history-list">
              {guessHistory.map((guess, index) => (
                <span
                  key={index}
                  className={`history-item ${getHistoryItemClass(guess)}`}
                >
                  {guess}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="game-footer">
          <div className="game-info">
            <span>Nivel: Principiante</span>
            <span>Rango: 1-100</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;