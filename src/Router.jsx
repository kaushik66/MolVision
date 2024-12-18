import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import EquationBalancer from './EqBalancer'; // Create these components
import TextSummarizer from './Summarizer';
import MoleculeVisualizer from './MolecularVis';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/eq-balancer" element={<EquationBalancer />} />
                <Route path="/text-summarizer" element={<TextSummarizer />} />
                <Route path="/molecular-visualizer" element={<MoleculeVisualizer />} />
            </Routes>
        </Router>
    );
};

export default App;
