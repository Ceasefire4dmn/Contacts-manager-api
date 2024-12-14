import React from "react";
// Import routers
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "../pages/AboutPage/about";
// Import pages
import ContactListPage from "../pages/ContactPage";


const App: React.FC = () => {
  return (
        <Router>
          <main>
            {/* App's Routes */}
            <Routes>
              <Route path="/" element={<ContactListPage />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
        </Router>
  );
};

export default App;