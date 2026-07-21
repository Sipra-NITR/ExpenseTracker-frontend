import { useEffect, useState } from "react";
import api from "../services/api";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseTable from "../components/ExpenseTable";
import ExportPDF from "../components/ExportPDF";

function Expenses() {

    const [expenses, setExpenses] = useState([]);
    const [editingExpense, setEditingExpense] = useState(null);

    // Filters
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [type, setType] = useState("All");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    // Temporary user ID
    const userId = Number(localStorage.getItem("userId"));

    const fetchExpenses = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(
                `/expense/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setExpenses(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchExpenses();

    }, []);

    // Apply Filters
    const filteredExpenses = expenses.filter((expense) => {

        const matchesSearch =
            expense.title.toLowerCase().includes(search.toLowerCase());

        const matchesCategory =
            category === "All" ||
            expense.category === category;

        const matchesType =
            type === "All" ||
            expense.type === type;

        const matchesFrom =
            !fromDate ||
            expense.date >= fromDate;

        const matchesTo =
            !toDate ||
            expense.date <= toDate;

        return (
            matchesSearch &&
            matchesCategory &&
            matchesType &&
            matchesFrom &&
            matchesTo
        );

    });

    return (

        <div className="min-h-screen bg-gray-100 p-8">

            <h1 className="text-4xl font-bold mb-8">
                Expense Management
            </h1>

            {/* Expense Form */}

            <ExpenseForm
                userId={userId}
                refreshExpenses={fetchExpenses}
                editingExpense={editingExpense}
                setEditingExpense={setEditingExpense}
            />

            {/* Filters */}

            <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

                <h2 className="text-2xl font-bold mb-5">
                    🔍 Search & Filters
                </h2>

                <div className="grid md:grid-cols-3 gap-4">

                    <input
                        type="text"
                        placeholder="Search by title..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border rounded-lg p-3"
                    />

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="border rounded-lg p-3"
                    >
                        <option value="All">All Categories</option>
                        <option value="Food">Food</option>
                        <option value="Bills">Bills</option>
                        <option value="Travel">Travel</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Salary">Salary</option>
                        <option value="Entertainment">Entertainment</option>
                    </select>

                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="border rounded-lg p-3"
                    >
                        <option value="All">All Types</option>
                        <option value="EXPENSE">Expense</option>
                        <option value="INCOME">Income</option>
                    </select>

                    <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="border rounded-lg p-3"
                    />

                    <input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="border rounded-lg p-3"
                    />

                    <button
                        onClick={() => {
                            setSearch("");
                            setCategory("All");
                            setType("All");
                            setFromDate("");
                            setToDate("");
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white rounded-lg p-3"
                    >
                        Clear Filters
                    </button>

                </div>
               <div className="flex justify-between items-center mb-6">

             <h1 className="text-4xl font-bold">
                    Expense Management
                </h1>

            <ExportPDF expenses={expenses} />

            </div>
            </div>

            {/* Expense Table */}

            <div className="mt-10">

                <ExpenseTable
                    expenses={filteredExpenses}
                    refreshExpenses={fetchExpenses}
                    setEditingExpense={setEditingExpense}
                />

            </div>

        </div>

    );

}

export default Expenses;