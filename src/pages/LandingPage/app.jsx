import Layout from "@/components/Layout";
import Hero from "@/components/landingpage/Hero";

import Feature from "@/components/landingpage/Feature";
import ChooseUs from "@/components/landingpage/ChooseUs";
import Interest from "@/components/landingpage/Interest";

export default function Landing() {
  return (
    <Layout>
      <Hero />
      <Feature />
      <ChooseUs />
      <Interest />
    </Layout>
  );
}
