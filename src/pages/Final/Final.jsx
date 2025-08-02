import SafeBox from '../../components/SafeBox/SafeBox';
import '../../styles/App.css';
import './Final.css';

const Final = () => {
  return (
    <div className="final-page-container fade-in">
      <h2 className="final-title">¡Felicidades! Has superado todos los niveles.</h2>
      <p className="final-subtitle">Tu recompensa final te espera. Pulsa la caja fuerte para abrirla.</p>
      <SafeBox />
    </div>
  );
};

export default Final;