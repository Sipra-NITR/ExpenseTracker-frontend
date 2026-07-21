import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";

function MonthlyExpenseChart({ expenses }) {

    const monthlyData = [
        { month: "Jan", amount: 0 },
        { month: "Feb", amount: 0 },
        { month: "Mar", amount: 0 },
        { month: "Apr", amount: 0 },
        { month: "May", amount: 0 },
        { month: "Jun", amount: 0 },
        { month: "Jul", amount: 0 },
        { month: "Aug", amount: 0 },
        { month: "Sep", amount: 0 },
        { month: "Oct", amount: 0 },
        { month: "Nov", amount: 0 },
        { month: "Dec", amount: 0 }
    ];

    expenses
        .filter(expense => expense.type === "EXPENSE")
        .forEach(expense => {

            const month = new Date(expense.date).getMonth();

            monthlyData[month].amount += Number(expense.amount);

        });

    return (

        <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

            <h2 className="text-2xl font-bold mb-5">
                Monthly Expenses
            </h2>

            <ResponsiveContainer width="100%" height={350}>

                <BarChart data={monthlyData}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip />

                    <Bar
                        dataKey="amount"
                        radius={[8, 8, 0, 0]}
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>

    );

}

export default MonthlyExpenseChart;