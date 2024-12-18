import React from "react";
import "./HomePage.css";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';


const HomePage = () => {
    const navigate = useNavigate();
    return (
        <div style={{backgroundColor: "white", width: "100vw"}}>
            {/* Header */}
            <header>
                <div class="Navbar">
                    <a href="#" style={{
                        fontFamily: "Times New Roman",
                        fontSize: "xx-large",
                        marginLeft: "10px"
                    }}>MolVision</a>
                    <nav>
                        <ul class="nav-links">
                            <li><a  style={{marginRight: "25px", fontFamily: "sans-serif", cursor: "pointer"}} onClick={() => navigate('/about')}>About</a></li>
                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" style={{marginRight: "25px",fontFamily: "sans-serif"}}>Features</a>
                                <ul class="dropdown-menu">
                                    <li><button className="dButton" onClick={() => navigate('/eq-balancer')} style={{fontFamily: "sans-serif"}}>Equation Balancer</button></li>
                                    <li><button className="dButton" onClick={() => navigate('/text-summarizer')} style={{fontFamily: "sans-serif"}}>Text Summarizer</button></li>
                                    <li><button className="dButton" onClick={() => navigate('/molecular-visualizer')} style={{fontFamily: "sans-serif"}}>Molecule Visualizer</button></li>
                                </ul>
                            </li>
                            <li><a href="#" style={{marginRight: "25px", fontFamily: "sans-serif"}} onClick={() => navigate('/contact')}>Contact</a></li>
                        </ul>
                    </nav>
                </div>
            </header>


            {/* Hero Section */}
            <section className="hero">
                <h1>Your Chemistry Companion Tool</h1>
                <p>
                    Simplify your work with powerful features for summarizing, balancing
                    equations, and visualizing molecules.
                </p>
                <button onClick={() => navigate('/about')}>Learn More</button>
            </section>

            {/* Features */}
            <section id="features" className="features">
                <h2>What You Can Do</h2>
                <div className="feature-cards">
                    <div className="card" onClick={() => navigate('/text-summarizer')} style={{cursor: "pointer"}}>
                        <h3>Text Summarizer</h3>
                        <p>Summarize chemical literature or research papers in seconds.</p>
                    </div>
                    <div className="card" onClick={() => navigate('/eq-balancer')} style={{cursor: "pointer"}}>
                        <h3>Equation Balancer</h3>
                        <p>Automatically balance chemical equations with ease.</p>
                    </div>
                    <div className="card" onClick={() => navigate('/molecular-visualizer')} style={{cursor: "pointer"}}>
                        <h3>Molecule Visualizer</h3>
                        <p>Explore 3D molecule structures interactively.</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer>
                <p>&copy; DTL Project made by Kaushik Das, Aaditya Khurana, Shreyash Parasar</p>
            </footer>
        </div>
    );
};

export default HomePage;
