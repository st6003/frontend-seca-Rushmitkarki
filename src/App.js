import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";

import Footer from "./components/Footer";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import AdminRoutes from "./protected_routes/AdminRoutes";
// Toast configuration
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import AdminDashboard from "./pages/admin/adminDashboard/AdminDashboard";
import Appointmentlist from "./pages/admin/appointmentlist/Appointmentlist";
import DoctorsList from "./pages/admin/doctorlists/DoctorsList";
import UsersList from "./pages/admin/usersList/UsersList";
import DoctorAppointment from "./pages/appointment/DoctorAppointment";
import Doctor from "./pages/doctor/Doctor";
import About from "./pages/homepage/About";
import Payment from "./pages/payment/Payment";
import UserProfile from "./pages/userprofile/UserProfile";
import Insurance from "./pages/admin/insurance/Insurance";

function App() {
  return (
    <Router>
      <div>
        <Navbar />

        <ToastContainer />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/doctor" element={<Doctor />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/Appointment" element={<DoctorAppointment />} />
          <Route path="/Profile" element={<UserProfile />} />
          <Route path="/About" element={<About />} />
          <Route path="/Homepage" element={<Homepage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route element={<AdminRoutes />}>
            <Route path="/Admin/Dashboard" element={<AdminDashboard />} />
            <Route path="/DoctorsList" element={<DoctorsList />} />
            <Route path="/UserList" element={<UsersList />} />
            <Route path="/Appointmentlist" element={<Appointmentlist />} />
            <Route path="/Insurancelist" element={<Insurance/>}/>
          </Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
