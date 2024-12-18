import React from "react";
import "./ContactPage.css";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';

const ContactPage = () => {
    const navigate = useNavigate();
    return (
        <div className="contact">
            <div className='Navbar'><button className='title' onClick={() => navigate('/')} style={{ backgroundColor: "black" }} >MolVision</button>
            </div>

            {/* Contact Details Section */}
            <section className="contact-details">
                <h2>Our Team</h2>

                <div className="team-member">
                    <h3>Kaushik Das</h3>
                    <p>
                        <strong>USN:</strong> 1RV23CD023 <br />
                        <strong>Email:</strong>{" "}
                        <a href="mailto:kaushikdas.cd23@rvce.edu.in">
                            kaushikdas.cd23@rvce.edu.in
                        </a>
                    </p>
                </div>

                <div className="team-member">
                    <h3>Shreyash Parasar</h3>
                    <p>
                        <strong>USN:</strong> 1RV23CD053 <br />
                        <strong>Email:</strong>{" "}
                        <a href="mailto:shreyashparasar.cd23@rvce.edu.in">
                            shreyashparasar.cd23@rvce.edu.in
                        </a>
                    </p>
                </div>

                <div className="team-member">
                    <h3>Aaditya Khurana</h3>
                    <p>
                        <strong>USN:</strong> 1RV23CD001 <br />
                        <strong>Email:</strong>{" "}
                        <a href="mailto:aadityakhurana.cd23@rvce.edu.in">
                            aadityakhurana.cd23@rvce.edu.in
                        </a>
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer>
                <p>© 2024 MolVision | Your Chemistry Companion Tool</p>
            </footer>
        </div>
    );
};

export default ContactPage;
