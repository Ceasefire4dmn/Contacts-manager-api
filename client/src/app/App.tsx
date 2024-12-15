import React from "react";
import "../App.css";
// Import routers
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// Import pages
import ContactListPage from "../pages/ContactPage";
import About from "../pages/AboutPage/index";
// Components
import NavMenu from "../widgets/NavMenu";
import Footer from "../widgets/Footer";

const App: React.FC = () => {
  return (
    <div>
      <NavMenu />
        <Router>
          <main>
            {/* App's Routes */}
            <Routes>
              <Route path="/" element={<ContactListPage />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
        </Router>
        <Footer />
      </div>
  );
};

export default App;