import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/register.scss";

const API_URL = import.meta.env.VITE_API_URL;

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/auth/register`, form);
      toast.success("Registered successfully");
      setTimeout(() => {
        window.location.href = "/chat";
      }, 1500);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1 className="logo">TXTPreron</h1>
        <form onSubmit={handleSubmit} className="register-form">
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
          />
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          <button type="submit">Sign Up</button>
          <div className="divider">or</div>
          <button type="button" className="login-redirect" onClick={() => (window.location.href = "/login")}>
            Log In Instead
          </button>
        </form>
      </div>
    </div>
  );
}
