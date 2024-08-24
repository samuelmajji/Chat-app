import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import ChatLayout from "./pages/home/Home";
import Login from "./pages/login/LogIn";
import Register from "./pages/signup/SignUp";
import { useAuthContext } from "./context/Authcontext";

function App() {
  const { authUser } = useAuthContext();
  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={!authUser ? <Navigate to="/login" /> : <ChatLayout />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={authUser ? <Navigate to="/" /> : <Register />}
        />
      </Routes>
    </>
  );
}

export default App;
