import React from "react";
import "./About.css";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import MolecularVis from './MolecularVis';
import Summarizer from './Summarizer';
import HomePage from './HomePage';

const About = () => {
    const navigate = useNavigate();
    return (
        <div className="about">
            {/* Hero Section */}
            <div className='Navbar'><button className='title' onClick={() => navigate('/')} style={{ backgroundColor: "black" }} >MolVision</button>
            </div>

            {/* About Description Section */}
            <section className="about-description" style={{ marginTop: "100px" }}>
                <h2>What is MolVision?</h2>
                <p>
                    MolVision is a comprehensive platform designed to help students,
                    researchers, and professionals in the field of chemistry. Whether you
                    are looking to balance complex chemical equations, summarize dense
                    research papers, or explore 3D molecular structures, MolVision provides
                    you with easy-to-use tools to streamline your workflow.
                </p>

                <h3>Key Features:</h3>
                <ul>
                    <li>
                        <strong>Text Summarizer:</strong> Summarize chemical literature or
                        research papers in seconds to get the key insights.
                    </li>
                    <li>
                        <strong>Equation Balancer:</strong> Automatically balance chemical
                        equations quickly and accurately.
                    </li>
                    <li>
                        <strong>Molecule Visualizer:</strong> Explore 3D molecular structures
                        interactively for better understanding and visualization.
                    </li>
                </ul>

                <h3>Who is this for?</h3>
                <p>
                    Whether you’re a student learning chemistry, a researcher exploring
                    molecules, or a professional solving complex equations, MolVision offers
                    powerful tools to save you time and effort.
                </p>
            </section>

            {/* Footer */}
            <footer>
                <p>© 2024 MolVision | Your Chemistry Companion Tool</p>
            </footer>
        </div>
    );
};

export default About;

