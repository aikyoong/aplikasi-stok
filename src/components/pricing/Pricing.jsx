import { useEffect } from "react";
import { useCart } from "@/store/useCart";
import { useNavigate, Link } from "@tanstack/react-router";

const Pricing = () => {
  useEffect(() => {
    // Menggulir ke atas saat komponen Pricing dimuat
    window.scrollTo(0, 0);
  }, []); // Tambahkan array dependensi kosong

  return (
    <section className=" pb-12 pt-16 bg-blue_soft">
      <div className="max-w-5xl mx-auto">
        <div className=" mb-[60px] max-w-4xl mx-auto  lg:mb-20">
          <h2 className="mb-4 text-3xl font-bold text-center  sm:text-4xl md:text-[40px] text-blue_accent">
            Plans & Pricing
          </h2>
          <p className="text-white text-center ">
            {/* Discover Zenradius's ISP-ERP Plans & Pricing, offering three
            feature-rich plans designed to meet your ISP's needs. Choose the
            plan that aligns best with your goals and unlock the potential of
            Zenradius to elevate your business. */}
            Explore Zenradius's ISP-ERP Plans & Pricing, featuring three plans
            tailored for your ISP.
            <br /> Select the ideal plan to align with your goals and unleash
            Zenradius's potential for business growth.
          </p>
        </div>

        <div className="flex space-x-4">
          <PricingCard
            name={"Basic Plan"}
            type="Basic"
            price="RP 250.000"
            subscription="month or billed annually"
            description="Ideal for small ISPs seeking basic ERP capabilities for seamless management."
            buttonText="Subscribe Basic Plan"
          >
            <List>100 User</List>
            <List>15 Product</List>
            <List>1 Payment Provider</List>
            <List>Radius - NAS, User</List>
            <List>Network Device</List>
            <List>Standart Support</List>
          </PricingCard>
          <PricingCard
            name={"Business Plan"}
            type="Business"
            price="RP 550.000"
            subscription="month or billed annually"
            description="Ideal for mid-sized ISPs requiring advanced ERP tools for improved efficiency."
            buttonText="Subscribe Business Plan"
            active
          >
            <List>350 User</List>
            <List>40 Product</List>
            <List>5 Payment Provider</List>

            <List>+ OLT/ONU</List>
            <List>+ Network Service</List>
            <List>Priority Support</List>
          </PricingCard>
          <PricingCard
            name={"Enterprise Plan"}
            type="Enterprise"
            price="RP 1.150.000"
            subscription="month or billed annually"
            description="Designed for large ISPs needing a comprehensive ERP solution for network optimization."
            buttonText="Subscribe Enterprise Plan"
          >
            <List>650 User</List>
            <List>100 Product</List>
            <List>Unlimited Payment Provider</List>

            <List>+ ODP & Homepass</List>
            <List>+ Network IPAM & Sites</List>
            <List>Enterprise Support</List>
          </PricingCard>
        </div>
      </div>
    </section>
  );
};

const PricingCard = ({
  children,
  description,
  price,
  type,
  subscription,
  buttonText,
  active,
}) => {
  const navigate = useNavigate({ from: "/pricing" });

  const addToCart = useCart((state) => state.addToCart);
  const productsInCart = useCart((state) => state.products);
  // const isProductInCart = productsInCart.includes(productId);
  const removeFromCart = useCart((state) => state.removeFromCart);

  return (
    <>
      <div className="w-full md:w-1/2 lg:w-1/3">
        {/* <button onClick={removeFromCart} className="bg-red-900">
          hapus
        </button> */}
        <div className="relative z-10 px-8 py-10 mb-10 overflow-hidden bg-white border rounded-xl  border-opacity-20 shadow-pricing sm:p-12 lg:py-10 lg:px-6 xl:p-8">
          <span className="block mb-4 text-lg font-semibold text-primary">
            {type}
          </span>
          <h2 className="mb-2 text-[42px] text-3xl font-bold ">{price}</h2>
          <span className="mb-5 text-base font-medium text-body-color">
            / {subscription}
          </span>
          <p className="mb-8 mt-5 border-b border-[#F2F2F2] pb-8 text-base text-body-color">
            {description}
          </p>
          <ul className="mb-7">
            <div className="mb-1 text-base leading-loose text-body-color">
              {children}
            </div>
          </ul>
          <Link
            to="/order"
            // onClick={handleButtonClick}
            className={`hover:cursor-pointer ${
              active
                ? `w-full block text-base font-semibold text-white bg-blue-600 border border-primary rounded-md text-center p-4 hover:bg-blue-700 transition`
                : `block w-full rounded-md border border-[#c5d1f8] bg-transparent p-4 text-center text-base font-semibold 
                     text-blue-950 hover:bg-blue-700 hover:text-white transition hover:border-blue-600  `
            }`}
          >
            {buttonText}
          </Link>
          <div>
            <span className="absolute right-0 top-7 z-[-1]">
              <svg
                width={77}
                height={172}
                viewBox="0 0 77 172"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx={86} cy={86} r={86} fill="url(#paint0_linear)" />
                <defs>
                  <linearGradient
                    id="paint0_linear"
                    x1={86}
                    y1={0}
                    x2={86}
                    y2={172}
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#3056D3" stopOpacity="0.09" />
                    <stop offset={1} stopColor="#C4C4C4" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <span className="absolute right-4 top-4 z-[-1]">
              <svg
                width={41}
                height={89}
                viewBox="0 0 41 89"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="38.9138"
                  cy="87.4849"
                  r="1.42021"
                  transform="rotate(180 38.9138 87.4849)"
                  fill="#3056D3"
                />
                <circle
                  cx="38.9138"
                  cy="74.9871"
                  r="1.42021"
                  transform="rotate(180 38.9138 74.9871)"
                  fill="#3056D3"
                />
                <circle
                  cx="38.9138"
                  cy="62.4892"
                  r="1.42021"
                  transform="rotate(180 38.9138 62.4892)"
                  fill="#3056D3"
                />
                <circle
                  cx="38.9138"
                  cy="38.3457"
                  r="1.42021"
                  transform="rotate(180 38.9138 38.3457)"
                  fill="#3056D3"
                />
                <circle
                  cx="38.9138"
                  cy="13.634"
                  r="1.42021"
                  transform="rotate(180 38.9138 13.634)"
                  fill="#3056D3"
                />
                <circle
                  cx="38.9138"
                  cy="50.2754"
                  r="1.42021"
                  transform="rotate(180 38.9138 50.2754)"
                  fill="#3056D3"
                />
                <circle
                  cx="38.9138"
                  cy="26.1319"
                  r="1.42021"
                  transform="rotate(180 38.9138 26.1319)"
                  fill="#3056D3"
                />
                <circle
                  cx="38.9138"
                  cy="1.42021"
                  r="1.42021"
                  transform="rotate(180 38.9138 1.42021)"
                  fill="#3056D3"
                />
                <circle
                  cx="26.4157"
                  cy="87.4849"
                  r="1.42021"
                  transform="rotate(180 26.4157 87.4849)"
                  fill="#3056D3"
                />
                <circle
                  cx="26.4157"
                  cy="74.9871"
                  r="1.42021"
                  transform="rotate(180 26.4157 74.9871)"
                  fill="#3056D3"
                />
                <circle
                  cx="26.4157"
                  cy="62.4892"
                  r="1.42021"
                  transform="rotate(180 26.4157 62.4892)"
                  fill="#3056D3"
                />
                <circle
                  cx="26.4157"
                  cy="38.3457"
                  r="1.42021"
                  transform="rotate(180 26.4157 38.3457)"
                  fill="#3056D3"
                />
                <circle
                  cx="26.4157"
                  cy="13.634"
                  r="1.42021"
                  transform="rotate(180 26.4157 13.634)"
                  fill="#3056D3"
                />
                <circle
                  cx="26.4157"
                  cy="50.2754"
                  r="1.42021"
                  transform="rotate(180 26.4157 50.2754)"
                  fill="#3056D3"
                />
                <circle
                  cx="26.4157"
                  cy="26.1319"
                  r="1.42021"
                  transform="rotate(180 26.4157 26.1319)"
                  fill="#3056D3"
                />
                <circle
                  cx="26.4157"
                  cy="1.4202"
                  r="1.42021"
                  transform="rotate(180 26.4157 1.4202)"
                  fill="#3056D3"
                />
                <circle
                  cx="13.9177"
                  cy="87.4849"
                  r="1.42021"
                  transform="rotate(180 13.9177 87.4849)"
                  fill="#3056D3"
                />
                <circle
                  cx="13.9177"
                  cy="74.9871"
                  r="1.42021"
                  transform="rotate(180 13.9177 74.9871)"
                  fill="#3056D3"
                />
                <circle
                  cx="13.9177"
                  cy="62.4892"
                  r="1.42021"
                  transform="rotate(180 13.9177 62.4892)"
                  fill="#3056D3"
                />
                <circle
                  cx="13.9177"
                  cy="38.3457"
                  r="1.42021"
                  transform="rotate(180 13.9177 38.3457)"
                  fill="#3056D3"
                />
                <circle
                  cx="13.9177"
                  cy="13.634"
                  r="1.42021"
                  transform="rotate(180 13.9177 13.634)"
                  fill="#3056D3"
                />
                <circle
                  cx="13.9177"
                  cy="50.2754"
                  r="1.42021"
                  transform="rotate(180 13.9177 50.2754)"
                  fill="#3056D3"
                />
                <circle
                  cx="13.9177"
                  cy="26.1319"
                  r="1.42021"
                  transform="rotate(180 13.9177 26.1319)"
                  fill="#3056D3"
                />
                <circle
                  cx="13.9177"
                  cy="1.42019"
                  r="1.42021"
                  transform="rotate(180 13.9177 1.42019)"
                  fill="#3056D3"
                />
                <circle
                  cx="1.41963"
                  cy="87.4849"
                  r="1.42021"
                  transform="rotate(180 1.41963 87.4849)"
                  fill="#3056D3"
                />
                <circle
                  cx="1.41963"
                  cy="74.9871"
                  r="1.42021"
                  transform="rotate(180 1.41963 74.9871)"
                  fill="#3056D3"
                />
                <circle
                  cx="1.41963"
                  cy="62.4892"
                  r="1.42021"
                  transform="rotate(180 1.41963 62.4892)"
                  fill="#3056D3"
                />
                <circle
                  cx="1.41963"
                  cy="38.3457"
                  r="1.42021"
                  transform="rotate(180 1.41963 38.3457)"
                  fill="#3056D3"
                />
                <circle
                  cx="1.41963"
                  cy="13.634"
                  r="1.42021"
                  transform="rotate(180 1.41963 13.634)"
                  fill="#3056D3"
                />
                <circle
                  cx="1.41963"
                  cy="50.2754"
                  r="1.42021"
                  transform="rotate(180 1.41963 50.2754)"
                  fill="#3056D3"
                />
                <circle
                  cx="1.41963"
                  cy="26.1319"
                  r="1.42021"
                  transform="rotate(180 1.41963 26.1319)"
                  fill="#3056D3"
                />
                <circle
                  cx="1.41963"
                  cy="1.4202"
                  r="1.42021"
                  transform="rotate(180 1.41963 1.4202)"
                  fill="#3056D3"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

const List = ({ children }) => {
  return (
    <p className="mb-1 text-base leading-loose text-body-color">{children}</p>
  );
};

export default Pricing;
