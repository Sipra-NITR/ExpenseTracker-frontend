function DashboardCard({ title, amount, color }) {

    const colors = {
        green: "bg-green-500",
        red: "bg-red-500",
        blue: "bg-blue-500"
    };

    return (

        <div className="bg-white rounded-2xl shadow-lg p-6">

            <div
                className={`${colors[color]} text-white rounded-xl p-4`}
            >

                <h2 className="text-xl font-semibold">
                    {title}
                </h2>

                <h1 className="text-3xl font-bold mt-4">
                    ₹ {amount}
                </h1>

            </div>

        </div>

    );

}

export default DashboardCard;