const FinalMessage = ({ onClose }) => {
  const location = "la parte de atrás de un coche color rojo jeje"; // Esta es la ubicación que quieres que aparezca
  
  return (
    <div className="modal-overlay fade-in">
      <div className="modal-content glow">
        <h3 className="modal-title">¡Misión Cumplida!</h3>
        <p className="modal-text">Tus regalos te esperan en...</p>
        <p className="modal-location">{location}</p>
        <button className="button modal-close-button" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default FinalMessage;