import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-calendar/dist/Calendar.css";

import Homepage from "./pages/homepage/Homepage";
import Handwerker from "./components/Handwerker";

import NotAuth from "./components/NotAuth";
import PrivateRoute from "./components/PrivateRoute";
import NavbarLogged from "./pages/navbarLogged/NavbarLogged";
import Bookings from "./pages/bookings/Bookings";
import Profile from "./pages/profile/Profile";
import ChatRoom from "./pages/chatRoom/ChatRoom";
import HomepageLogged from "./pages/HomepageLogged/HomepageLogged";
import SignIn from "./pages/signin/SignIn";
import Chat from "./pages/chat/Chat";
import FindHandyman from "./pages/findHandyman/FindHandyman";
import Navbar from "./pages/homepage/navbar/Navbar";
import ValueProposition from "./pages/homepage/valueProposition/ValueProposition";
import Footer from "./pages/homepage/footer/Footer";
import FindHandymanPostExample from "./pages/findHandyman/FindHandymanPostExample";
import ToggleKundeHandwerker from "./components/ToggleKundeHandwerker";
import KarteLogged from "./pages/karteLogged/KarteLogged";
import ProfileHandyman from "./pages/profileHandyman/ProfileHandyman";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route
        path="/profileHandyman/:userToChatWith"
        element={<ProfileHandyman />}
      />
      <Route
        path="/findHandyman"
        element={
          <>
            <Navbar />
            <ToggleKundeHandwerker />
            <FindHandyman />
            <FindHandymanPostExample />
            <ValueProposition />
            <Footer />
          </>
        }
      />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/notAuth" element={<NotAuth />} />

      {/* Protected Routes */}
      <Route
        path={"/homepageLogged"}
        element={
          <PrivateRoute>
            <HomepageLogged />
            <NavbarLogged />
          </PrivateRoute>
        }
      />
      <Route
        path={"/bookings"}
        element={
          <PrivateRoute>
            <Bookings />
            <NavbarLogged />
          </PrivateRoute>
        }
      />
      <Route
        path={"/karte"}
        element={
          <PrivateRoute>
            <KarteLogged />
            <NavbarLogged />
          </PrivateRoute>
        }
      />
      <Route
        path={"/karte/:lat/:lng"}
        element={
          <PrivateRoute>
            <KarteLogged />
            <NavbarLogged />
          </PrivateRoute>
        }
      />
      <Route
        path={"/chat"}
        element={
          <PrivateRoute>
            <Chat />
            <NavbarLogged />
          </PrivateRoute>
        }
      />
      <Route
        path={"/chat/:id"}
        element={
          <PrivateRoute>
            <ChatRoom />
            <NavbarLogged />
          </PrivateRoute>
        }
      />
      <Route
        path={"/profile"}
        element={
          <PrivateRoute>
            <Profile />
            <NavbarLogged />
          </PrivateRoute>
        }
      />
      <Route
        path={"/handwerker"}
        element={
          <PrivateRoute>
            <Handwerker />
            <NavbarLogged />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  );
}

export default App;
