import { FormDataType } from "@/types/form";
import { TableRowData } from "@/types/table";

/**
 * Maps input data to a consistent numeric format and processes investments data.
 */
const mapInputData = (data: FormDataType): FormDataType => {
  return Object.keys(data).reduce((acc, curr: string | undefined) => {
    if (!curr) return acc;

    const value = data[curr as keyof FormDataType];
    if (typeof value === "object") {
      acc[curr] = value?.map((v) => ({
        return: Number(v?.return),
        percentage: Number(v?.percentage),
      }));
    } else {
      acc[curr] = Number(value);
    }
    return acc;
  }, {} as FormDataType);
};

/**
 * Calculates the average return rate for investments.
 */
const calculateInvestmentReturn = (
  investment: { return: number; percentage: number }[] = []
): number => {
  return investment.reduce((total, item) => {
    return total + (item.percentage * item.return) / 100;
  }, 0);
};

/**
 * Formats a number to a currency or percentage format for display.
 */
export const formatValue = (
  value: number,
  style: "currency" | "percent" = "currency",
  digits = 0
): string => {
  const options: Intl.NumberFormatOptions =
    style === "currency"
      ? { style: "currency", currency: "INR", maximumFractionDigits: digits }
      : { style: "percent", maximumFractionDigits: digits };
  return Intl.NumberFormat("en-IN", options).format(value);
};

/**
 * Generates the retirement savings data table.
 */
export const calculateRetirementSavings = (
  data: FormDataType,
  userData: Record<string, string | undefined>
): TableRowData[] => {
  const mappedData = mapInputData(data);
  const {
    currentAge = 0,
    retirementAge = 0,
    lifeExpectancy = 0,
    startingAssets = 0,
    monthlyIncome = 0,
    monthlyExpenses = 0,
    investment = [],
  } = mappedData;

  const validatedInvestment = investment.map((inv) => ({
    return: inv.return !== undefined ? inv.return : 0,
    percentage: inv.percentage !== undefined ? inv.percentage : 0,
  }));


  const investmentReturn = calculateInvestmentReturn(validatedInvestment);
  const initialPercentageCorpus = startingAssets / (monthlyExpenses * 12);
  const avgMonthlyReturnRate = investmentReturn / 12;

  let incomeInvest = 0;
  let incomeInvest_actual = 0;
  let previousNx = startingAssets;
  let previousNx_actual = Number(startingAssets);
  let month = 1;
  const result: TableRowData[] = [];

  for (
    let ageInMonths = currentAge * 12;
    ageInMonths < lifeExpectancy * 12;
    ageInMonths++
  ) {

    const year = month / 12;
    const runningAge = currentAge + year;
    const yearInfo = JSON.parse(
      userData[runningAge.toFixed(2).toString()] || "{}"
    ) as FormDataType;

    const monthlyInvestmentReturn = yearInfo?.investment?.reduce((total, item) => {
      return total + (item.percentage * item.return) / 100;
    }, 0) / 12;

    const N = initialPercentageCorpus + year / 2;
    const Nx = previousNx + incomeInvest;
    const Nx_actual = previousNx_actual + Number(incomeInvest_actual);
    const yearlyExpenses = Nx / N;
    const monthlyExpensesCurrent = yearlyExpenses / 12;
    const monthlyIncomeCurrent =
      runningAge <= retirementAge ? monthlyIncome : 0;
    const expectedIncome = (avgMonthlyReturnRate * Nx) / 100;
    const expectedIncome_actual = (monthlyInvestmentReturn * Nx_actual) / 100;
    incomeInvest =
      monthlyIncomeCurrent - monthlyExpensesCurrent + expectedIncome;
    incomeInvest_actual = (yearInfo?.monthlyIncome - yearInfo?.monthlyExpenses + expectedIncome_actual) || 0;




    result.push({
      runningAge: runningAge.toFixed(2),
      year: formatValue(year, "currency", 2),
      month: Intl.NumberFormat("en-IN").format(month),
      N: Intl.NumberFormat("en-IN").format(N),
      Nx: formatValue(Nx),
      yearly_expenses: formatValue(yearlyExpenses),
      monthly_expenses: monthlyExpensesCurrent,
      monthly_income: monthlyIncomeCurrent,
      income_Nx: formatValue(avgMonthlyReturnRate / 100, "percent", 2),
      expected_income: expectedIncome,
      income_invest: incomeInvest,
      actual_income: yearInfo?.monthlyIncome || 0,
      actual_expenses: yearInfo?.monthlyExpenses || 0,
      actual_return: incomeInvest_actual,
    });

    month += 1;
    previousNx = Nx;
    previousNx_actual = Nx_actual;
  }

  return result;
};
