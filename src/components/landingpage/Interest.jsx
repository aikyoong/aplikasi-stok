import { Link } from "@tanstack/react-router";

function Interest() {
  return (
    // bg-[#1F2732]
    // <section className="py-24 bg-[#1c2431]">
    <section className="py-24 bg-blue_soft">
      <div className="max-w-5xl mx-auto ">
        <h2 className="text-center font-bold text-2xl text-blue_accent">
          interested in our services? Join Zenradius now !
        </h2>
        <p className="text-white text-center text-sm pt-4">
          Discover the benefits of Zenradius services and take your business to
          the next level.
          <br /> Join now to access powerful tools for network monitoring,
          billing, and more.
        </p>
        <div className="flex justify-center items-center mt-6 ">
          <Link to="/pricing">
            <button className="text-center px-6 py-2 border transition-all duration-300  border-[#EDC997] hover:bg-white hover:text-[#1F2732] rounded-md text-white font-medium">
              Check Our Rates
            </button>
          </Link>
        </div>

        {/* <Cart />
        <ProductList /> */}
      </div>
    </section>
  );
}

export default Interest;
