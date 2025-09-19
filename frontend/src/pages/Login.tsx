import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/login.scss";

const API_URL = import.meta.env.VITE_API_URL;

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/auth/login`, form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("Logged in successfully");
      setTimeout(() => {
        window.location.href = "/chat";
      }, 1500);
    } catch (err: any){
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="logo">TXTPreron</h1>
        <form onSubmit={handleSubmit} className="login-form">
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
          <button type="submit">Log In</button>
          {/* <a href="#" className="forgot-password">
            Forgot password?
          </a> */}
          <div className="divider">or</div>
          <button type="button" className="create-account" onClick={() => (window.location.href = "/register")}>
            Create New Account
          </button>
        </form>
      </div>
    </div>
  );
}
