import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/BaseUrl";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/auth/login", formData);
      const { token, user } = res.data;
      login(token, user);
      navigate("/");
    } catch (err) {
      const msg = err?.response?.data?.message || "Login failed. Try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[var(--color-bg-body)] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6 p-8 rounded-[var(--radius-lg)] bg-[var(--color-bg-surface)] shadow-[var(--shadow-card)] border border-[var(--color-border)]"
      >
        <h2 className="text-3xl font-extrabold text-center text-[var(--color-primary)] mb-2">Login</h2>

        {error && (
          <div className="text-[var(--color-error)] text-sm text-center bg-[var(--color-error)]/10 rounded py-2 px-3">
            {error}
          </div>
        )}

        <div className="relative">
          <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-primary)] text-lg" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full pl-10 pr-4 py-2 rounded-[var(--radius-base)] bg-[var(--color-bg-muted)] border border-[var(--color-border)] text-[var(--color-text-body)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition"
          />
        </div>

        <div className="relative">
          <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-primary)] text-lg" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full pl-10 pr-10 py-2 rounded-[var(--radius-base)] bg-[var(--color-bg-muted)] border border-[var(--color-border)] text-[var(--color-text-body)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-primary)] text-lg focus:outline-none"
            onClick={() => setShowPassword((prev) => !prev)}
            tabIndex={-1}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] rounded-[var(--radius-base)] font-semibold text-[var(--color-text-inverted)] transition disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm text-center text-[var(--color-text-muted)]">
          Don’t have an account?{" "}
          <a href="/register" className="text-[var(--color-primary)] hover:underline font-medium">
            Register
          </a>
        </p>
      </form>
    </div>
  );
}
