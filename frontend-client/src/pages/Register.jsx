import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import api from "../services/BaseUrl";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/auth/register", formData);
      navigate("/login");
    } catch (err) {
      const msg = err?.response?.data?.message || "Registration failed. Try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-bg-body text-text-heading px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 p-6 shadow-md bg-bg-surface rounded-lg shadow-card"
      >
        <h2 className="text-2xl font-bold text-center text-text-heading">
          Create Account
        </h2>

        {error && (
          <div className="text-sm text-error">
            {error}
          </div>
        )}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-border rounded-base bg-bg-muted text-text-body focus:outline-none focus:ring-2"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-border rounded-base bg-bg-muted text-text-body focus:outline-none focus:ring-2"
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-border rounded-base bg-bg-muted text-text-body focus:outline-none focus:ring-2 pr-10"
          />
          <button
            type="button"
            className="absolute top-1/2 right-3 -translate-y-1/2 text-primary"
            onClick={() => setShowPassword((prev) => !prev)}
            tabIndex={-1}
          >
            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 font-medium transition rounded-base text-text-inverted ${loading ? "bg-disabled cursor-not-allowed" : "bg-primary cursor-pointer"}`}
        >
          {loading ? "Creating..." : "Register"}
        </button>

        <p className="text-sm text-center text-text-muted">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-primary hover:underline"
          >
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
