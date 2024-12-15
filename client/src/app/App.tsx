import React from "react";
import "../App.css";
// Import routers
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// Import pages
import ContactListPage from "../pages/ContactPage";
import About from "../pages/AboutPage/index";
import CreateContactPage from "../pages/CreateContactPage";
import DeleteContactPage from "../pages/DeleteContactPage";
// Components
import NavMenu from "../widgets/NavMenu";
import Footer from "../widgets/Footer";

const App: React.FC = () => {
  return (
    <div className="d-flex flex-column min-vh-100 myContainer">
      <NavMenu />
        <Router>
          <main>
            {/* App's Routes */}
            <Routes>
              <Route path="/contacts" element={<ContactListPage />} />
              <Route path="/contacts/createContact" element={<CreateContactPage />} />
              <Route path="/contacts/deleteContact" element={<DeleteContactPage />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
        </Router>
        <Footer />
      </div>
  );
};

export default App;