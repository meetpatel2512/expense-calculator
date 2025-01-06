"use client";

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
    </>
  );
};

export default Page;
