import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName");

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        localStorage.removeItem("email");

        navigate("/");

    };

    return (

        <nav className="bg-white shadow-md">

            <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">

                <h1
                    className="text-2xl font-bold text-blue-600 cursor-pointer"
                    onClick={() => navigate("/dashboard")}
                >
                    Expense Tracker Pro
                </h1>

                {token ? (

                    <div className="flex items-center gap-6">

                        <span className="font-semibold text-gray-700">
                            Welcome, {userName}
                        </span>

                        <Link
                            to="/dashboard"
                            className="hover:text-blue-600"
                        >
                            Dashboard
                        </Link>

                        <Link
                            to="/expenses"
                            className="hover:text-blue-600"
                        >
                            Expenses
                        </Link>

                        <button
                            onClick={logout}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                        >
                            Logout
                        </button>

                    </div>

                ) : (

                    <div className="flex gap-6">

                        <Link
                            to="/"
                            className="text-blue-600 font-semibold"
                        >
                            Login
                        </Link>

                        <Link
                            to="/register"
                            className="text-blue-600 font-semibold"
                        >
                            Register
                        </Link>

                    </div>

                )}

            </div>

        </nav>

    );

}

export default Navbar;