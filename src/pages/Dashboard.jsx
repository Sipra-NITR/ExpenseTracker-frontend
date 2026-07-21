import { useEffect, useState } from "react";
import api from "../services/api";
import ExpensePieChart from "../components/ExpensePieChart";
import MonthlyExpenseChart from "../components/MonthlyExpenseChart";
import RecentTransactions from "../components/RecentTransactions";

function Dashboard() {

    const [dashboard, setDashboard] = useState({
        income: 0,
        expense: 0,
        balance: 0
    });

    const [expenses, setExpenses] = useState([]);

    const userId = Number(localStorage.getItem("userId"));

    useEffect(() => {
        fetchDashboard();
        fetchExpenses();
    }, []);
    const fetchDashboard = async () => {

        try {

            const response = await api.get(`/dashboard/${userId}`);

            console.log("Dashboard Response:", response.data);

            setDashboard(response.data);
            console.log("Expenses loaded:", response.data);

        } catch (error) {

            console.log("========== DASHBOARD ERROR ==========");

            console.log(error);

            console.log("Message:", error.message);

            if (error.response) {
                console.log("Status:", error.response.status);
                console.log("Data:", error.response.data);
            }

            alert("Unable to load dashboard.");
        }
    };

    const fetchExpenses = async () => {

    try {

        const response = await api.get(`/expense/${userId}`);

        console.log("Expenses API Response:", response.data);

        setExpenses(response.data);

    } catch (error) {

        console.log("Expense Error:", error);

    }

};
console.log("Current expenses state:", expenses);
    return (

        <div className="min-h-screen bg-gray-100 p-8">

            <h1 className="text-4xl font-bold mb-8">
                Dashboard
            </h1>

            {/* Dashboard Cards */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Balance */}

                <div className="bg-gradient-to-r from-green-500 to-green-700 text-white rounded-2xl shadow-lg p-6">

                    <h2 className="text-xl font-semibold">
                        💰 Total Balance
                    </h2>

                    <p className="text-3xl font-bold mt-4">
                        ₹ {dashboard.balance}
                    </p>

                </div>

                {/* Income */}

                <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-2xl shadow-lg p-6">

                    <h2 className="text-xl font-semibold">
                        📈 Total Income
                    </h2>

                    <p className="text-3xl font-bold mt-4">
                        ₹ {dashboard.income}
                    </p>

                </div>

                {/* Expense */}

                <div className="bg-gradient-to-r from-red-500 to-red-700 text-white rounded-2xl shadow-lg p-6">

                    <h2 className="text-xl font-semibold">
                        📉 Total Expense
                    </h2>

                    <p className="text-3xl font-bold mt-4">
                        ₹ {dashboard.expense}
                    </p>

                </div>

            </div>

            {/* Pie Chart */}

            <div className="mt-10">
                <ExpensePieChart expenses={expenses} />
            </div>

            {/* Monthly Bar Chart */}

            <div className="mt-10">
                <MonthlyExpenseChart expenses={expenses} />
            </div>
            {/* Recent Transactions */}

<div className="mt-10">
    <RecentTransactions expenses={expenses} />
</div>

        </div>

    );

}

export default Dashboard;