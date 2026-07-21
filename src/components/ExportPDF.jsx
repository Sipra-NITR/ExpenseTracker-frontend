import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function ExportPDF({ expenses }) {

    const exportPDF = () => {

        const doc = new jsPDF();

        const userName = localStorage.getItem("userName") || "User";

        doc.setFontSize(20);
        doc.text("Expense Tracker Report", 14, 20);

        doc.setFontSize(12);
        doc.text(`Name: ${userName}`, 14, 30);
        doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 38);

        const income = expenses
            .filter(e => e.type === "INCOME")
            .reduce((sum, e) => sum + Number(e.amount), 0);

        const expense = expenses
            .filter(e => e.type === "EXPENSE")
            .reduce((sum, e) => sum + Number(e.amount), 0);

        const balance = income - expense;

        doc.text(`Total Income : ₹${income}`, 14, 50);
        doc.text(`Total Expense : ₹${expense}`, 14, 58);
        doc.text(`Balance : ₹${balance}`, 14, 66);

        autoTable(doc, {
            startY: 75,
            head: [["Title", "Category", "Amount", "Date", "Type"]],
            body: expenses.map(item => [
                item.title,
                item.category,
                `₹${item.amount}`,
                item.date,
                item.type
            ])
        });

        doc.save("Expense_Report.pdf");
    };

    return (
        <button
            onClick={exportPDF}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg"
        >
            Download PDF
        </button>
    );
}

export default ExportPDF;