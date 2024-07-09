import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";

import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import AdminRoutes from "./protected_routes/AdminRoutes";
import Footer from "./components/Footer";
// Toast configuration
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import AdminDashboard from "./pages/admin/adminDashboard/AdminDashboard";
import About from "./pages/homepage/About";
import UserProfile from "./pages/userprofile/UserProfile";
import Payment from "./pages/payment/Payment";
import DoctorAppointment from "./pages/appointment/DoctorAppointment";
import Appointmentlist from "./pages/admin/appointmentlist/Appointmentlist";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path= "/Appointment" element={<DoctorAppointment/>}/>
          <Route path="/payment" element={<Payment/>}/>
          <Route path = "/Profile" element={<UserProfile/>}/>
          <Route path="/About" element={<About />} />
          <Route path="/Homepage" element={<Homepage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route element={<AdminRoutes />}>
            <Route path="/Admin/Dashboard" element={<AdminDashboard />} />
            <Route path = '/Appointmentlist' element={<Appointmentlist/>}/>
          </Route>
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
