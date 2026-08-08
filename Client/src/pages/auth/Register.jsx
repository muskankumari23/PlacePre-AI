import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { registerUser } from "../../services/authService";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // ─── Validation helpers ───
  const validateName = (name) => {
    if (!name.trim()) return "Name is required";
    if (name.trim().length < 2) return "Name must be at least 2 characters";
    return "";
  };

  const validateEmail = (email) => {
    if (!email.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  const validateConfirmPassword = (confirmPassword, password) => {
    if (!confirmPassword) return "Please confirm your password";
    if (confirmPassword !== password) return "Passwords do not match";
    return "";
  };

  // ─── Handle field change ───
  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
    if (apiError) setApiError("");
    if (successMessage) setSuccessMessage("");
  };

  // ─── Validate all fields ───
  const validateForm = () => {
    const newErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(
        formData.confirmPassword,
        formData.password
      ),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((err) => err !== "");
  };

  // ─── Submit handler ───
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setApiError("");

    try {
      await registerUser({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        role: formData.role,
      });

      // Show success message, then redirect to login
      setSuccessMessage("Registration successful! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setApiError(error.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // ─── Password strength indicator ───
  const getPasswordStrength = () => {
    const { password } = formData;
    if (!password) return { label: "", color: "", width: "0%" };

    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) return { label: "Weak", color: "bg-red-500", width: "20%" };
    if (score <= 2) return { label: "Fair", color: "bg-orange-500", width: "40%" };
    if (score <= 3) return { label: "Good", color: "bg-yellow-500", width: "60%" };
    if (score <= 4) return { label: "Strong", color: "bg-green-500", width: "80%" };
    return { label: "Very Strong", color: "bg-emerald-500", width: "100%" };
  };

  const strength = getPasswordStrength();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4 py-10">
      <div className="bg-white w-full max-w-[460px] rounded-xl shadow-lg p-8">

        {/* ── Header ── */}
        <h1 className="text-3xl font-bold text-center">
          Create Account 🚀
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Join PlacePrep AI and start your placement journey
        </p>

        {/* ── Success Message ── */}
        {successMessage && (
          <div className="mt-4 bg-green-50 border border-green-200 text-green-600 text-sm rounded-lg px-4 py-3 text-center">
            {successMessage}
          </div>
        )}

        {/* ── API Error ── */}
        {apiError && (
          <div className="mt-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 text-center">
            {apiError}
          </div>
        )}

        {/* ── Form ── */}
        <div className="mt-8 space-y-5">

          {/* Name */}
          <div>
            <Input
              type="text"
              placeholder="Enter Full Name"
              value={formData.name}
              onChange={handleChange("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1 ml-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <Input
              type="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <Input
              type="password"
              placeholder="Create Password"
              value={formData.password}
              onChange={handleChange("password")}
            />
            {/* Password strength bar */}
            {formData.password && (
              <div className="mt-2">
                <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${strength.color} rounded-full transition-all duration-500`}
                    style={{ width: strength.width }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1 ml-1">
                  Strength: <span className="font-medium">{strength.label}</span>
                </p>
              </div>
            )}
            {errors.password && (
              <p className="text-red-500 text-xs mt-1 ml-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <Input
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1 ml-1">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2 ml-1">
              I am a
            </label>
            <div className="flex gap-3">
              {["student", "company"].map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, role }))
                  }
                  className={`flex-1 py-2.5 rounded-lg border text-sm font-medium capitalize transition duration-300 cursor-pointer ${
                    formData.role === role
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-600 border-gray-300 hover:border-blue-400"
                  }`}
                >
                  {role === "student" ? "🎓 Student" : "🏢 Company"}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <Button
            text={isLoading ? "Creating Account..." : "Register"}
            variant="primary"
            onClick={handleSubmit}
            disabled={isLoading}
          />
        </div>

        {/* ── Footer link ── */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;