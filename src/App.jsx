import { useState } from "react";
import "./index.css";

function App() {
  const [inputNumber, setInputNumber] = useState("");
  const [numbersList, setNumbersList] = useState([]);
  const [missingNumbers, setMissingNumbers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [isRange0to99, setIsRange0to99] = useState(true);

  // Função para adicionar número à lista
  const addNumber = () => {
    const num = inputNumber.trim();
    const minRange = isRange0to99 ? 0 : 1;
    const maxRange = isRange0to99 ? 99 : 50;

    // Validar se é um número no intervalo selecionado
    if (num === "" || isNaN(num) || num < minRange || num > maxRange) {
      const rangeText = isRange0to99 ? "00 e 99" : "01 e 50";
      alert(`Por favor, digite um número válido entre ${rangeText}`);
      return;
    }

    // Converter para string com 2 dígitos (ex: 5 vira "05")
    const formattedNum = num.padStart(2, "0");

    // Adicionar à lista (permitindo repetidos)
    setNumbersList([...numbersList, formattedNum]);
    setInputNumber("");
  };

  // Função para remover número da lista
  const removeNumber = (indexToRemove) => {
    setNumbersList(numbersList.filter((_, index) => index !== indexToRemove));
  };

  // Função para verificar números faltantes
  const checkMissingNumbers = () => {
    // Gerar lista completa baseada no intervalo selecionado
    const allNumbers = [];
    const minRange = isRange0to99 ? 0 : 1;
    const maxRange = isRange0to99 ? 99 : 50;

    for (let i = minRange; i <= maxRange; i++) {
      allNumbers.push(i.toString().padStart(2, "0"));
    }

    // Obter números únicos da lista inserida
    const uniqueNumbers = [...new Set(numbersList)];

    // Encontrar números faltantes
    const missing = allNumbers.filter((num) => !uniqueNumbers.includes(num));
    setMissingNumbers(missing);
    setShowResult(true);
  };

  // Função para limpar tudo
  const clearAll = () => {
    setNumbersList([]);
    setMissingNumbers([]);
    setShowResult(false);
    setInputNumber("");
  };

  // Função para alternar intervalo e limpar dados
  const toggleRange = (is0to99) => {
    setIsRange0to99(is0to99);
    setNumbersList([]);
    setMissingNumbers([]);
    setShowResult(false);
    setInputNumber("");
  };

  // Função para lidar com Enter no input
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addNumber();
    }
  };

  return (
    <div className="app">
      <h1 className="title">🔢 Números Faltantes</h1>

      <div className="input-section">
        <div className="range-toggle">
          <button
            className={`range-button ${isRange0to99 ? "active" : ""}`}
            onClick={() => toggleRange(true)}
          >
            0-99
          </button>
          <button
            className={`range-button ${!isRange0to99 ? "active" : ""}`}
            onClick={() => toggleRange(false)}
          >
            1-50
          </button>
        </div>
        <div className="input-group">
          <input
            type="text"
            className="input"
            placeholder={`Digite um número (${
              isRange0to99 ? "00-99" : "01-50"
            })`}
            value={inputNumber}
            onChange={(e) => setInputNumber(e.target.value)}
            onKeyPress={handleKeyPress}
            maxLength="2"
          />
          <button className="add-button" onClick={addNumber}>
            Adicionar
          </button>
        </div>
      </div>

      <div className="numbers-list">
        {numbersList.length === 0 ? (
          <div className="empty-state">Nenhum número adicionado ainda</div>
        ) : (
          numbersList.map((num, index) => (
            <span
              key={index}
              className="number-item"
              onClick={() => removeNumber(index)}
              title="Clique para remover"
            >
              {num}
            </span>
          ))
        )}
      </div>

      <button
        className="check-button"
        onClick={checkMissingNumbers}
        disabled={numbersList.length === 0}
      >
        ✅ Verificar Números Faltantes
      </button>

      {showResult && (
        <div className="result-section">
          <h3 className="result-title">
            Números faltantes de {isRange0to99 ? "00 a 99" : "01 a 50"}:
          </h3>
          {missingNumbers.length === 0 ? (
            <div className="no-missing">
              🎉 Todos os números de {isRange0to99 ? "00 a 99" : "01 a 50"}{" "}
              foram inseridos!
            </div>
          ) : (
            <div className="missing-numbers">
              {missingNumbers.map((num, index) => (
                <span key={index} className="missing-number">
                  {num}
                </span>
              ))}
            </div>
          )}
          <div style={{ marginTop: "15px", textAlign: "center" }}>
            <button
              className="add-button"
              onClick={clearAll}
              style={{ background: "#6c757d" }}
            >
              🗑️ Limpar Tudo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
