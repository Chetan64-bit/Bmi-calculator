import React, { useState } from 'react';
import './App.css';

function App() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const calculateBMI = () => {
    if (!height || !weight) {
      setResult({
        bmi: null,
        category: 'Please enter both height and weight.',
        color: '#dc3545'
      });
      return;
    }

    const heightInMeters = height / 100;
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);

    let category = '';
    let color = '';

    if (bmi < 18.5) {
      category = 'Underweight';
      color = '#ffc107';
    } else if (bmi >= 18.5 && bmi < 24.9) {
      category = 'Normal weight';
      color = '#28a745';
    } else if (bmi >= 25 && bmi < 29.9) {
      category = 'Overweight';
      color = '#fd7e14';
    } else {
      category = 'Obese';
      color = '#dc3545';
    }

    setResult({ bmi, category, color });
  };

  const resetInputs = () => {
    setHeight('');
    setWeight('');
    setResult(null);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`App ${darkMode ? 'dark' : ''}`}>
      <div className="container">
        <h1>BMI Calculator</h1>
        <p className="info">
          Body Mass Index (BMI) is a person's weight in kilograms divided by the square of their height in meters.
        </p>

        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="Height (cm)"
        />
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Weight (kg)"
        />

        <button onClick={calculateBMI}>Calculate BMI</button>
        <button onClick={toggleTheme}>Toggle Dark Mode</button>

        {/* RESULT */}
        {result && (
          <div id="result" className="show">
            {result.bmi ? (
              <>
                Your BMI is <strong>{result.bmi}</strong> and you are classified as{' '}
                <strong style={{ color: result.color }}>{result.category}</strong>.
              </>
            ) : (
              <span style={{ color: result.color }}>{result.category}</span>
            )}
          </div>
        )}

        {/* BMI Chart */}
        <div className="bmi-chart">
          <h3>BMI Categories:</h3>
          <ul>
            <li><span>Underweight</span>: less than 18.5</li>
            <li><span>Normal weight</span>: 18.5 – 24.9</li>
            <li><span>Overweight</span>: 25 – 29.9</li>
            <li><span>Obese</span>: 30 or more</li>
          </ul>
        </div>
      </div>

      <button className="fab" onClick={resetInputs}>🔄</button>
    </div>
  );
}

export default App;
