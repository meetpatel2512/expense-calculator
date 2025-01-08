"use client";

import { ChartResult } from "@/components/Charts/LineChart";
import AddBanner from "@/components/GoogleAds/AddBanner";
import { RootComponent } from "../calculation/main";
const Page = () => {
  return (
    <>
      <AddBanner
        dataAdSlot="2638271663"
        dataAdFormat="auto"
        dataFullWidthResponsive={true}
      />
      <RootComponent />
      <div className="">
        <ChartResult />
      </div>
    </>
  );
};

export default Page;
