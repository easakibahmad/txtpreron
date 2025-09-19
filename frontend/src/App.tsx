import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <Routes>
      <Route
        path="/"
        element={token ? <Navigate to="/chat" /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={<Login onLogin={() => setToken(localStorage.getItem("token"))} />}
      />
      <Route path="/register" element={<Register />} />
      <Route
        path="/chat"
        element={token ? <Chat /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}
