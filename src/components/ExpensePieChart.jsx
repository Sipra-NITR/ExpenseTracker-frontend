import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

function ExpensePieChart({ expenses = [] }) {

    const COLORS = [
        "#3B82F6",
        "#10B981",
        "#F59E0B",
        "#EF4444",
        "#8B5CF6",
        "#06B6D4",
        "#F97316"
    ];

    // Group expenses by category
    const categoryMap = {};

    expenses.forEach((expense) => {

        if (expense.type === "EXPENSE") {

            const category = expense.category;

            if (categoryMap[category]) {
                categoryMap[category] += Number(expense.amount);
            } else {
                categoryMap[category] = Number(expense.amount);
            }

        }

    });

    const categoryData = Object.keys(categoryMap).map((category) => ({
        category,
        amount: categoryMap[category]
    }));

    console.log("Category Data:", categoryData);

    if (categoryData.length === 0) {
        return (
            <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
                <h2 className="text-2xl font-bold mb-5">
                    Expense by Category
                </h2>

                <p className="text-gray-500">
                    No expense data available.
                </p>
            </div>
        );
    }

    return (

        <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

            <h2 className="text-2xl font-bold mb-5">
                Expense by Category
            </h2>

            <ResponsiveContainer width="100%" height={350}>

                <PieChart>

                    <Pie
                        data={categoryData}
                        dataKey="amount"
                        nameKey="category"
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        label
                    >

                        {categoryData.map((entry, index) => (

                            <Cell
                                key={index}
                                fill={COLORS[index % COLORS.length]}
                            />

                        ))}

                    </Pie>

                    <Tooltip />

                    <Legend />

                </PieChart>

            </ResponsiveContainer>

        </div>

    );

}

export default ExpensePieChart;