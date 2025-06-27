// components/RestartButton.jsx

const RestartButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="btn btn-success bounce"
    >
      Jugar de Nuevo
    </button>
  );
};

export default RestartButton;