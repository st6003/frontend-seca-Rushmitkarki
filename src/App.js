import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";

import Footer from "./components/Footer";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import AdminRoutes from "./protected_routes/AdminRoutes";
// Toast configuration
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import io from "socket.io-client";
import ChatBot from "./components/ChatBot";
import Navbar from "./components/Navbar";
import AdminDashboard from "./pages/admin/adminDashboard/AdminDashboard";
import Appointmentlist from "./pages/admin/appointmentlist/Appointmentlist";
import DoctorsList from "./pages/admin/doctorlists/DoctorsList";
import Insurance from "./pages/admin/insurance/Insurance";
import UsersList from "./pages/admin/usersList/UsersList";
import DoctorAppointment from "./pages/appointment/DoctorAppointment";
import Chat from "./pages/chat/Chat";
import Doctor from "./pages/doctor/Doctor";
import FavouriteDoctors from "./pages/Favourite/FavouriteDoctors";
import About from "./pages/homepage/About";
import Payment from "./pages/payment/Payment";
import PaymentSuccess from "./pages/payment/PaymentSuccess";
import ProfileList from "./pages/profilelist/ProfileList";
import UserAppointmentList from "./pages/UserAppointmentList/UserAppointmentList";
import UserProfile from "./pages/userprofile/UserProfile";

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  return (
    <Router>
      <div>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/doctors" element={<Doctor />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/Appointment" element={<DoctorAppointment />} />
          <Route path="/Profile" element={<UserProfile />} />
          <Route path="/Profilelist" element={<ProfileList />} />
          <Route
            path="/Your Appointment List"
            element={<UserAppointmentList />}
          />
          <Route path="/FavouriteList" element={<FavouriteDoctors />}></Route>
          <Route path="/About" element={<About />} />
          <Route path="/Homepage" element={<Homepage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/chatBot" element={<ChatBot />}></Route>
          <Route path="/payment/success" element={<PaymentSuccess />}></Route>

          <Route element={<AdminRoutes />}>
            <Route path="/Admin/Dashboard" element={<AdminDashboard />} />
            <Route path="/DoctorsList" element={<DoctorsList />} />
            <Route path="/UserList" element={<UsersList />} />
            <Route path="/Appointmentlist" element={<Appointmentlist />} />
            <Route path="/Insurancelist" element={<Insurance />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
