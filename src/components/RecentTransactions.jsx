function RecentTransactions({ expenses }) {

    const recentExpenses = [...expenses]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);

    return (

        <div className="bg-white rounded-2xl shadow-lg p-6 mt-10">

            <h2 className="text-2xl font-bold mb-5">
                🧾 Recent Transactions
            </h2>

            <table className="w-full">

                <thead>

                    <tr className="bg-gray-100 border-b">

                        <th className="p-3 text-left">Title</th>
                        <th className="p-3 text-left">Category</th>
                        <th className="p-3 text-left">Amount</th>
                        <th className="p-3 text-left">Type</th>
                        <th className="p-3 text-left">Date</th>

                    </tr>

                </thead>

                <tbody>

                    {recentExpenses.map((expense) => (

                        <tr
                            key={expense.id}
                            className="border-b hover:bg-gray-50"
                        >

                            <td className="p-3">{expense.title}</td>

                            <td className="p-3">
                                {expense.category}
                            </td>

                            <td className="p-3 font-semibold">
                                ₹ {expense.amount}
                            </td>

                            <td className="p-3">

                                <span
                                    className={
                                        expense.type === "INCOME"
                                            ? "text-green-600 font-semibold"
                                            : "text-red-600 font-semibold"
                                    }
                                >
                                    {expense.type}
                                </span>

                            </td>

                            <td className="p-3">
                                {expense.date}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default RecentTransactions;