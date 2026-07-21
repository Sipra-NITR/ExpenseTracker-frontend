import { useState } from "react";
import api from "../services/api";

function ExpenseTable({ expenses, refreshExpenses,setEditingExpense }) {

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");

    const handleEdit = (expense) => {

    setEditingExpense(expense);

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

};

    const deleteExpense = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this expense?"
        );

        if (!confirmDelete) return;

        try {

            const token = localStorage.getItem("token");

            await api.delete(`/expense/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert("Expense deleted successfully!");

            refreshExpenses();

        } catch (error) {

            console.log(error);

            alert("Unable to delete expense");

        }
    };

    const filteredExpenses = expenses
        .filter((expense) =>
            expense.title.toLowerCase().includes(search.toLowerCase())
        )
        .filter((expense) =>
            category === "All" || expense.category === category
        );

    return (

        <div className="bg-white shadow-lg rounded-xl p-6 mt-8">

            <h2 className="text-2xl font-bold mb-5">
                Recent Expenses
            </h2>

            {/* Search and Filter */}

            <div className="flex flex-col md:flex-row gap-4 mb-6">

                <input
                    type="text"
                    placeholder="🔍 Search expenses..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border rounded-lg p-3 flex-1"
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border rounded-lg p-3"
                >
                    <option value="All">All Categories</option>
                    <option value="Food">Food</option>
                    <option value="Travel">Travel</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Bills">Bills</option>
                    <option value="Salary">Salary</option>
                </select>

            </div>

            <div className="overflow-x-auto">

                <table className="w-full border-collapse">

                    <thead>

                        <tr className="bg-gray-100 border-b">

                            <th className="p-3 text-left">Title</th>
                            <th className="p-3 text-left">Category</th>
                            <th className="p-3 text-left">Amount</th>
                            <th className="p-3 text-left">Date</th>
                            <th className="p-3 text-left">Type</th>
                            <th className="p-3 text-center">Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredExpenses.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="6"
                                    className="text-center p-6 text-gray-500"
                                >
                                    No expenses found.
                                </td>

                            </tr>

                        ) : (

                            filteredExpenses.map((expense) => (

                                <tr
                                    key={expense.id}
                                    className="border-b hover:bg-gray-50"
                                >

                                    <td className="p-3">{expense.title}</td>

                                    <td className="p-3">
                                        {expense.category}
                                    </td>

                                    <td className="p-3">
                                        ₹ {expense.amount}
                                    </td>

                                    <td className="p-3">
                                        {expense.date}
                                    </td>

                                    <td className="p-3">

                                        <span
                                            className={`px-3 py-1 rounded-full text-white text-sm ${
                                                expense.type === "INCOME"
                                                    ? "bg-green-500"
                                                    : "bg-red-500"
                                            }`}
                                        >
                                            {expense.type}
                                        </span>

                                    </td>

                                    <td className="p-3 text-center space-x-2">

                                        <button
                                            onClick={() => handleEdit(expense)}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() =>
                                                deleteExpense(expense.id)
                                            }
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );
}

export default ExpenseTable;