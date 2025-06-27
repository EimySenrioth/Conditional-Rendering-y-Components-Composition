// components/InputNumber.jsx
//value: El valor actual del input (controlado externamente por un useState del componente padre).
//onChange: Función que se ejecuta cuando el usuario cambia el valor (también definida en el componente padre).
//onSubmit: Función que se ejecuta cuando el usuario presiona Enter.
//disabled: Booleano que desactiva el input si es true.
//placeholder: Texto que aparece cuando el input está vacío.

const InputNumber = ({ value, onChange, onSubmit, disabled, placeholder }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {//detectar tecla Enter
      onSubmit();// si lo es se ejecuta la función onSubmit
    }
  };

  const handleChange = (e) => {//obtenevos el valor ingresado
    const inputValue = e.target.value;
    // Solo permitir números
    if (inputValue === '' || /^\d+$/.test(inputValue)) {
      onChange(inputValue);// para actualizar el estado en el componente padre
    }
  };

  return (
    <div className="input-container">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        disabled={disabled}
        placeholder={placeholder}
        className="number-input"
        maxLength="3"
        autoComplete="off"
      />
    </div>
  );
};//value={value}   El valor es controlado desde afuera.
//Máximo 3 caracteres
// Desactiva autocompletado del navegador
//onKeyPress={handleKeyPress}     Detecta si se presiona Enter.
export default InputNumber;