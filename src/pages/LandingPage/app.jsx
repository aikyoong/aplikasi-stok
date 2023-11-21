import Layout from "@/components/Layout";
import Hero from "./images/hero.jpg";
import Visi from "./images/visi.jpg";
import Karyawan from "./images/karyawan.jpg";
import Contact from "./images/contact.jpg";

function Landing() {
  // return <Layout>LandingPagfe</Layout>;
  return (
    <>
      <img src={Hero} alt="heo image" className="min-h-screen" />
      <img src={Visi} alt="heo image" className="min-h-screen" />
      <img src={Karyawan} alt="heo image" className="min-h-screen" />
      <img src={Contact} alt="heo image" className="min-h-screen" />
    </>
  );
}

export default Landing;
