import { useState, useEffect } from "react";
import api from "../services/api";

function ExpenseForm({
    userId,
    refreshExpenses,
    editingExpense,
    setEditingExpense
}) {

    const [expense, setExpense] = useState({
        title: "",
        amount: "",
        category: "",
        date: "",
        type: "EXPENSE"
    });

    useEffect(() => {

        if (editingExpense) {

            setExpense({
                title: editingExpense.title,
                amount: editingExpense.amount,
                category: editingExpense.category,
                date: editingExpense.date,
                type: editingExpense.type
            });

        }

    }, [editingExpense]);

    const handleChange = (e) => {

        setExpense({
            ...expense,
            [e.target.name]: e.target.value
        });

    };

    const saveExpense = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            if (editingExpense) {

                await api.put(
                    `/expense/${editingExpense.id}`,
                    expense,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                alert("Expense Updated Successfully!");

            } else {

                await api.post(
                    `/expense/${userId}`,
                    expense,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                alert("Expense Added Successfully!");

            }

            setExpense({
                title: "",
                amount: "",
                category: "",
                date: "",
                type: "EXPENSE"
            });

            setEditingExpense(null);

            refreshExpenses();

        } catch (error) {

            console.log(error);

            alert("Unable to Save Expense");

        }

    };

    return (

        <form
            onSubmit={saveExpense}
            className="bg-white rounded-2xl shadow-lg p-8"
        >

            <h2 className="text-2xl font-bold mb-6">

                {editingExpense ? "Edit Expense" : "Add New Expense"}

            </h2>

            <div className="grid md:grid-cols-2 gap-5">

                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={expense.title}
                    onChange={handleChange}
                    className="border rounded-lg p-3"
                    required
                />

                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={expense.amount}
                    onChange={handleChange}
                    className="border rounded-lg p-3"
                    required
                />

                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={expense.category}
                    onChange={handleChange}
                    className="border rounded-lg p-3"
                    required
                />

                <input
                    type="date"
                    name="date"
                    value={expense.date}
                    onChange={handleChange}
                    className="border rounded-lg p-3"
                    required
                />

                <select
                    name="type"
                    value={expense.type}
                    onChange={handleChange}
                    className="border rounded-lg p-3"
                >
                    <option value="EXPENSE">Expense</option>
                    <option value="INCOME">Income</option>
                </select>

            </div>

            <div className="mt-6 flex gap-4">

                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                >
                    {editingExpense ? "Update Expense" : "Save Expense"}
                </button>

                {editingExpense && (

                    <button
                        type="button"
                        onClick={() => {

                            setEditingExpense(null);

                            setExpense({
                                title: "",
                                amount: "",
                                category: "",
                                date: "",
                                type: "EXPENSE"
                            });

                        }}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg"
                    >
                        Cancel
                    </button>

                )}

            </div>

        </form>

    );

}

export default ExpenseForm;