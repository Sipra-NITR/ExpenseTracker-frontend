import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (registerData.password !== registerData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      await api.post("/auth/register", {
        name: registerData.name,
        email: registerData.email,
        password: registerData.password,
      });

      alert("Registration Successful!");

      navigate("/");
    } catch (error) {
      alert("Registration Failed!");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 flex justify-center items-center">

      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-10">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600">
            Expense Tracker
          </h1>

          <p className="text-gray-500 mt-2">
            Create Your Account 🚀
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="mb-4">
            <label className="block font-semibold mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={registerData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={registerData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2">
              Password
            </label>

            <div className="flex">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={registerData.password}
                onChange={handleChange}
                placeholder="Create password"
                required
                className="w-full border rounded-l-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="bg-gray-200 px-4 rounded-r-xl"
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          <div className="mb-6">
            <label className="block font-semibold mb-2">
              Confirm Password
            </label>

            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={registerData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              required
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?
          </p>

          <Link
            to="/"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login Here
          </Link>
        </div>

      </div>

    </div>
  );
}

export default Register;