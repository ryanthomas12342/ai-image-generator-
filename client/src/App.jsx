import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Home, CreatePost } from "./pages";
import { logo } from "./assets";
import "./styles.css"; // Link the custom CSS file here

const App = () => {
  return (
    <BrowserRouter>
      <header className="header">
        <Link to="/">
          <img src={logo} alt="logo" className="logo" />
        </Link>

        <Link to="/create-post" className="create-button">
          Create
        </Link>
      </header>
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
