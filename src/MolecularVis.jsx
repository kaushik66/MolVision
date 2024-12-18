import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import './App.css';
import Summarizer from './Summarizer';
import HomePage from './HomePage';

function MolecularVis() {
  const [cid, setCid] = useState("");
  const [cname, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState(null);
  const navigate = useNavigate();

  const fetchCID = async () => {
    try {
      setLoading(true);
      setError("");

      // Fetch CID using the molecule name
      const response = await fetch(
        `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(cname)}/cids/JSON`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch CID. Please check the molecule name.");
      }

      const data = await response.json();
      const fetchedCid = data?.IdentifierList?.CID?.[0];

      if (!fetchedCid) {
        throw new Error("No CID found for the given molecule name.");
      }

      return fetchedCid;
    } catch (err) {
      setError(err.message || "Failed to fetch CID. Please try again.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchMoleculeData = async () => {
    if (!cname) {
      setError("Please enter a molecule name.");
      return;
    }

    const fetchedCid = await fetchCID();
    if (!fetchedCid) return;

    setCid(fetchedCid); // Update the state with the fetched CID

    try {
      setLoading(true);
      setError("");
      setProperties(null);

      // Fetch molecule 3D structure data (SDF format) from PubChem
      const sdfResponse = await fetch(
        `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/CID/${fetchedCid}/record/SDF/?record_type=3d`
      );

      if (!sdfResponse.ok) {
        throw new Error("Failed to fetch molecule structure. Please check the CID.");
      }

      const sdfData = await sdfResponse.text();

      // Fetch molecule properties from PubChem
      const propertyResponse = await fetch(
        `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/CID/${fetchedCid}/property/MolecularWeight,MolecularFormula,IUPACName/JSON`
      );

      if (!propertyResponse.ok) {
        throw new Error("Failed to fetch molecule properties.");
      }

      const propertyData = await propertyResponse.json();
      const moleculeProperties = propertyData?.PropertyTable?.Properties[0];
      console.log(moleculeProperties);

      setProperties(moleculeProperties);

      // Render the molecule using 3Dmol.js
      renderMolecule(sdfData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderMolecule = (sdfData) => {
    const viewer = window.$3Dmol.createViewer("molecule-viewer", {
      backgroundColor: "white",
    });

    viewer.addModel(sdfData, "sdf"); // Load the SDF data
    viewer.setStyle({}, { stick: {}, sphere: { scale: 0.3 } }); // Set molecule style
    viewer.zoomTo(); // Zoom to fit the molecule
    viewer.render(); // Render the molecule
  };

  return (
    <div
      className="page"
    >
        <div className='Navbar'><button className='title' onClick={() => navigate('/')} style={{backgroundColor: "black"}}>MolVision</button>           <div className="dropdown">
            <button className="dropdown-button">More Tools</button>
            <div className="dropdown-content">
              <button onClick={() => navigate('/eq-balancer')}>Equation Balancer</button>
              <button onClick={() => navigate('/text-summarizer')}>Text Summarizer</button>
            </div>
          </div></div>
      <h1>Molecule Visualizer</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={cname}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter molecule name"
          style={{
            padding: "10px",
            fontSize: "16px",
            width: "300px",
            marginRight: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            background: "white",
            color: "black"
          }}
        />
        <button
          onClick={fetchMoleculeData}
          style={{
            padding: "10px 15px",
            fontSize: "16px",
            backgroundColor: "white",
            color: "#007bff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {loading ? "Loading..." : "Visualize"}
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          width: "900px",
          padding: "20px",
          boxSizing: "border-box",
          gap: "20px",
        }}
      >
        <div
            className="viewer-container"
          id="molecule-viewer"
          style={{
            width: "600px",
            height: "400px",
            border: "1px solid black",
            borderRadius: "4px",
          }}
        ></div>

        {properties && (
          <div
            style={{
              width: "300px",
              color: "black",
            }}
          >
            <h2>Molecule Properties</h2>
            <p>
              <strong>Molecular Formula:</strong> {properties.MolecularFormula}
            </p>
            <p>
              <strong>Molecular Weight:</strong> {properties.MolecularWeight} g/mol
            </p>
            <p>
              <strong>IUPAC Name:</strong> {properties.IUPACName}
            </p>

          </div>
        )}
      </div>
    </div>
  );
}

export default MolecularVis;


