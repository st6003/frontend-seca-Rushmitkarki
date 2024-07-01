import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";

import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import AdminRoutes from "./protected_routes/AdminRoutes";
// Toast configuration
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import AdminDashboard from "./pages/admin/adminDashboard/AdminDashboard";
import About from "./pages/homepage/About";
import UserProfile from "./pages/userprofile/UserProfile";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path = "/Profile" element={<UserProfile/>}/>
          <Route path="/About" element={<About />} />
          <Route path="/Homepage" element={<Homepage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route element={<AdminRoutes />}>
            <Route path="/Admin/Dashboard" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
