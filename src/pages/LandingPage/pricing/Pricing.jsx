import React from "react";
import Pricing from "@/components/pricing/Pricing";
import PricingDetail from "@/components/pricing/PricingDetail";
import Layout from "@/components/Layout";

function PricingPage() {
  return (
    <Layout>
      <Pricing />
      <PricingDetail />
    </Layout>
  );
}

export default PricingPage;
