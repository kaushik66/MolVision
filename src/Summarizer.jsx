import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Groq from "groq-sdk";
import "./App.css";

const groq = new Groq({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

const Summarizer = () => {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const summarizeText = async () => {
    setLoading(true);
    setError(null);

    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `Summarize the following paragraph in 5 lines: ${text}`,
          },
        ],
        model: "llama3-8b-8192",
      });

      setSummary(chatCompletion.choices[0]?.message?.content || "No response content");
    } catch (err) {
      setError("Failed to fetch summary. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page" >
      <div className='Navbar'><button className='title' onClick={() => navigate('/')} style={{backgroundColor: "black"}}>MolVision</button>           <div className="dropdown">
        <button className="dropdown-button">More Tools</button>
        <div className="dropdown-content">
          <button onClick={() => navigate('/molecular-visualizer')}>Molecule Visualizer</button>
          <button onClick={() => navigate('/eq-balancer')}>Equation Balancer</button>
        </div>
      </div></div>
      <h2>Text Summarizer</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter the text to summarize..."
        rows={6}
        cols={50}
        style={{ width: "50%", padding: "10px", fontSize: "16px", backgroundColor: "white", color:"black"}}
      />
      <button
        onClick={summarizeText}
        disabled={loading || !text}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "white",
          color: "#007bff",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Summarizing..." : "Summarize"}
      </button>
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      {summary && (
        <div style={{ marginTop: "20px", color: "black" }}>
          <h3>Summary</h3>
          <p style={{ whiteSpace: "pre-wrap" }}>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default Summarizer;


