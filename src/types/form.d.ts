export type FormDataType = {
  currentAge?: number | undefined;
  retirementAge?: number | undefined;
  lifeExpectancy?: number | undefined;
  startingAssets?: number | undefined;
  monthlyIncome?: number | undefined;
  monthlyExpenses?: number | undefined;
  investment?:
    | (
        | {
            return?: number | undefined;
            percentage?: number | undefined;
          }
        | undefined
      )[]
    | undefined;
};
