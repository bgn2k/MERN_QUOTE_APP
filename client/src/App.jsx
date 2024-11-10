import "./App.css";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import AboutMe from "./pages/AboutMe";
import { VerifyEmail } from "./pages/VerifyEmail.jsx";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about-me" element={<AboutMe />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/dashboard/about-me" element={<AboutMe />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
