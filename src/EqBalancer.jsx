import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Groq from 'groq-sdk';
import './App.css';
import MolecularVis from './MolecularVis';
import Summarizer from './Summarizer';
import HomePage from './HomePage';
import About from './About'
import Contact from './ContactPage'


// Set up Groq SDK with your API key
const groq = new Groq({
  apiKey: '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',
  dangerouslyAllowBrowser: true,
});

function EquationBalancer() {
  const [equation, setEquation] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use React Router's `useNavigate` for programmatic navigation

  const getBalancedEquation = async (inputEquation) => {
    try {
      setLoading(true);
      setError('');
      setResponse('');

      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: 'user',
            content: `Balance the following chemical equation: ${inputEquation}. Provide only the balanced equation as output.`,
          },
        ],
        model: 'llama3-8b-8192',
      });

      setResponse(chatCompletion.choices[0]?.message?.content || 'No response content');
    } catch (err) {
      setError('Failed to fetch balanced equation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (equation.trim() === '') {
      setError('Please enter a chemical equation.');
      return;
    }
    getBalancedEquation(equation);
  };

  return (
    <div className='page' >
      <div className='Navbar'><button className='title' onClick={() => navigate('/')} style={{backgroundColor: "black"}}>MolVision</button>           <div className="dropdown">
            <button className="dropdown-button">More Tools</button>
            <div className="dropdown-content">
              <button onClick={() => navigate('/molecular-visualizer')}>Molecule Visualizer</button>
              <button onClick={() => navigate('/text-summarizer')}>Text Summarizer</button>
            </div>
          </div></div>
      <div className="App">
        <header className="header">
          <h1>Chemical Equation Balancer</h1>
        </header>

        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            value={equation}
            onChange={(e) => setEquation(e.target.value)}
            placeholder="Enter a chemical equation (e.g., CH4 + O2 → CO2 + H2O)"
            className="input"
          />
          <button type="submit" className="button">Balance</button>
        </form>

        {loading && <p className="loading">Loading...</p>}
        {error && <p className="error">{error}</p>}
        {response && (
          <div className="result">
            <h2>Balanced Equation:</h2>
            <p>{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Home page (Chemical Equation Balancer) */}
        <Route path="/" element={<HomePage />} />

        {/* Molecular Visualizer page */}
        <Route path="/eq-balancer" element={<EquationBalancer />} />
        <Route path="/molecular-visualizer" element={<MolecularVis />} />
        <Route path="/text-summarizer" element={<Summarizer />} />
        <Route path="/about"  element = {<About />} />
        <Route path='/contact' element = {<Contact/>} />
      </Routes>
    </Router>
  );
}

export default App;












