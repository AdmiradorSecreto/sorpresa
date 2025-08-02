import { useState } from 'react';
import './SafeBox.css';
import FinalMessage from './FinalMessage'; // Importamos el modal del mensaje final

const SafeBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Función para manejar el clic en la caja fuerte
  const handleSafeBoxClick = () => {
    setIsOpen(true);
    // Esperamos a que termine la animación de apertura antes de mostrar el modal
    setTimeout(() => {
      setShowModal(true);
    }, 1500); // Duración de la animación en CSS
  };

  return (
    <>
      <div className={`safe-box ${isOpen ? 'open' : ''}`} onClick={handleSafeBoxClick}>
        <div className="safe-box-door">
          {/* Aquí puedes añadir un icono o imagen de un cofre o caja fuerte */}
          <div className="safe-box-handle"></div>
          <div className="safe-box-logo">
            {/* Aquí puedes poner un logo o iniciales */}
          </div>
        </div>
      </div>
      {showModal && <FinalMessage onClose={() => setShowModal(false)} />}
    </>
  );
};

export default SafeBox;