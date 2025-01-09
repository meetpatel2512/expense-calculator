"use client";
import { TableRowData } from "@/types/table";

const staticTableData = localStorage.getItem("tableData");

// Income Data 
export const IncomeDataKey = ["actual_income", "expected_income"];
export const IncomeChartConfig = {
    actual_income: {
        label: "actual_income",
        color: "red",
    },
    expected_income: {
        label: "expected_income",
        color: "blue",
    },
};
export const IncomeData = () => {
    if (staticTableData) {
        const parseTableData = JSON.parse(staticTableData) || [];
        const result = parseTableData
            // .filter((d) => Math.ceil(Number(d.runningAge)) == Number(d.runningAge))
            .map((data: TableRowData) => ({
                month: +data.runningAge,
                actual_income: data.actual_income ? +data.actual_income : 0,
                expected_income: data.expected_income,
            }));
        return result;
    }
}
// Expense Data 
export const ExpenseDataKey = ["actual_expense", "expected_expense"];
export const ExpenseChartConfig = {
    actual_expense: {
        label: "actual_expense",
        color: "red",
    },
    expected_expense: {
        label: "expected_expense",
        color: "blue",
    },
};
export const ExpenseData = () => {
    if (staticTableData) {
        const parseTableData = JSON.parse(staticTableData) || [];
        const result = parseTableData
            // .filter((d) => Math.ceil(Number(d.runningAge)) == Number(d.runningAge))
            .map((data: TableRowData) => ({
                month: +data.runningAge,
                actual_expense: data.actual_expenses ? +data.actual_expenses : 0,
                expected_expense: data.monthly_expenses,
            }));

        return result;
    }
}

// Return Data
export const ReturnDataKey = ["actual_return", "expected_return"];
export const ReturnChartConfig = {
    actual_return: {
        label: "actual_return",
        color: "red",
    },
    expected_return: {
        label: "expected_return",
        color: "blue",
    },
};
export const ReturnData = () => {
    if (staticTableData) {
        const parseTableData = JSON.parse(staticTableData) || [];
        const result = parseTableData
            // .filter((d) => Math.ceil(Number(d.runningAge)) == Number(d.runningAge))
            .map((data: TableRowData) => ({
                month: +data.runningAge,
                actual_return: data.actual_return ? +data.actual_return : 0,
                expected_return: data.expected_income,
            }));
        return result;
    }
} 