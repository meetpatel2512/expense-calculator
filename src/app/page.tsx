"use client";

import { ChartResult } from "@/components/Charts/LineChart";
import AddBanner from "@/components/GoogleAds/AddBanner";
import { RootComponent } from "../calculation/main";
import {
  ExpenseChartConfig,
  ExpenseData,
  ExpenseDataKey,
  IncomeChartConfig,
  IncomeData,
  IncomeDataKey,
  ReturnChartConfig,
  ReturnData,
  ReturnDataKey,
} from "@/components/Charts/data";
const Page = () => {
  return (
    <>
      <AddBanner
        dataAdSlot="2638271663"
        dataAdFormat="auto"
        dataFullWidthResponsive={true}
      />
      <RootComponent />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 m-5">
        <ChartResult
          chartData={IncomeData()}
          chartConfig={IncomeChartConfig}
          dataKey={IncomeDataKey}
          title="Income"
        />
        <ChartResult
          chartData={ExpenseData()}
          chartConfig={ExpenseChartConfig}
          dataKey={ExpenseDataKey}
          title="Expense"
        />
        <ChartResult
          className="md:col-span-2"
          chartData={ReturnData()}
          chartConfig={ReturnChartConfig}
          dataKey={ReturnDataKey}
          title="Return"
        />
      </div>
    </>
  );
};

export default Page;
