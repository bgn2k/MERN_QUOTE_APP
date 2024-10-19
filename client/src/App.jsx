import "./App.css";
import { Home } from "./Home";
import { Login } from "./Login";
import { Register } from "./Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { User } from "./User";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
