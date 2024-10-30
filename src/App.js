// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
import NavBar from "./shared/NavBar";
import Home from "./components/Home";
import About from "./components/About";
import Entertainment from "./components/Entertainment";
import General from "./components/General";
import Health from "./components/Health";
import Business from "./components/Business";
import News from "./shared/News";
import Register from "./shared/Register";
import SearchResults from "./shared/SearchResults";
import Footer from "./shared/Footer";
import Science from "./components/Science";
import Sports from "./components/Sports";
import Technology from "./components/Technology";
import Favorites from "./components/Favorites";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <NavBar />
          <div className="App-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<About />} />
              <Route path="/entertainment" element={<Entertainment />} />
              <Route path="/general" element={<General />} />
              <Route path="/health" element={<Health />} />
              <Route path="/business" element={<Business />} />
              <Route path="/science" element={<Science />} />
              <Route path="/sports" element={<Sports />} />
              <Route path="/technology" element={<Technology />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/news" element={<News />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
