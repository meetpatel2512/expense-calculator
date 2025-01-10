"use client";

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
import { ChartResult } from "@/components/Charts/LineChart";
import AddBanner from "@/components/GoogleAds/AddBanner";
import { useEffect, useState } from "react";
import { RootComponent } from "../calculation/main";

const Page = () => {
  const [table, setTableData] = useState<string>("");
  useEffect(() => {
    const staticTableData = localStorage.getItem("tableData");
    setTableData(staticTableData);
  }, []);
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
          chartData={IncomeData(table)}
          chartConfig={IncomeChartConfig}
          dataKey={IncomeDataKey}
          title="Income"
        />
        <ChartResult
          chartData={ExpenseData(table)}
          chartConfig={ExpenseChartConfig}
          dataKey={ExpenseDataKey}
          title="Expense"
        />
        <ChartResult
          className="md:col-span-2"
          chartData={ReturnData(table)}
          chartConfig={ReturnChartConfig}
          dataKey={ReturnDataKey}
          title="Return"
        />
      </div>
    </>
  );
};

export default Page;
