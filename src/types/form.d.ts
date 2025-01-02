export type InvestmentType = { return: string; percentage: string };

export type FormDataType = {
    currentAge: string;
    retirementAge: string;
    lifeExpectancy: string;
    startingAssets: string;
    monthlyIncome: string;
    monthlyExpenses: string;
    investment: InvestmentType[];
};
