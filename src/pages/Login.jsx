import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

        const response = await api.post(
            "/auth/login",
            loginData
        );

        // Save JWT Token
        localStorage.setItem(
            "token",
            response.data.token
        );

        // Save Logged-in User Details
        localStorage.setItem(
            "userId",
            response.data.userId
        );

        localStorage.setItem(
            "userName",
            response.data.name
        );

        localStorage.setItem(
            "email",
            response.data.email
        );

        alert("Login Successful!");

        navigate("/dashboard");

    } catch (error) {

        console.log(error);

        alert("Invalid Email or Password");

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
            Welcome Back 👋
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="mb-5">

            <label className="block mb-2 font-semibold">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

          </div>

          <div className="mb-6">

            <label className="block mb-2 font-semibold">
              Password
            </label>

            <div className="flex">

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={loginData.password}
                onChange={handleChange}
                placeholder="Enter your password"
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <div className="text-center mt-6">

          <p className="text-gray-600">
            Don't have an account?
          </p>

          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register Here
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Login;