import { useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import HomePage from "./pages/HomePage";
import CreateJobPage from "./pages/CreateJobPage";
import PrivateRoute from "./components/PrivateRoute";
import axios from "axios";
import EditJobPage from "./pages/EditJobPage";

// context for authentication state
export const AuthContext = createContext();

function App() {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    token: null,
  });

  const login = (token) => {
    setAuthState({ isAuthenticated: true, token: token });
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  const logout = () => {
    setAuthState({ isAuthenticated: false, token: null });
  };

  axios.defaults.baseURL = "https://backtechforing.vercel.app";

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-job"
            element={
              <PrivateRoute>
                <CreateJobPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-job/:id"
            element={
              <PrivateRoute>
                <EditJobPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
