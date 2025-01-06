import Script from "next/script";

const AddSense = () => {
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${
        process.env.NEXT_GOOGLE_ADS_ID || "6665140687874205"
      }`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
};

export default AddSense;
