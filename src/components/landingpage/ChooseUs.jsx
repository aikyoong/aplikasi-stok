import Payment from "./images/payment.png";
import Csv from "./images/CSV.png";
import Crm from "./images/CRM.png";

function ChooseUs() {
  const chooseItems = [
    {
      title: "Accurate and reliable billing",
      description:
        "A billing engine designed around your requirements, aimed at effective invoicing and payment collection.",
      features: [
        "Automated recurring & prepaid billing",
        "Multiple payment channels",
      ],
      imageUrl: Payment,
    },
    {
      title: "Modern visuals and easy data export",
      description:
        "Utilizing modern visuals and offering easy data export, our software provides a seamless experience for both data analysis and presentation.",
      features: [
        "Easy to read",
        "Export to CSV",
        // "Code completion with instant preview",
      ],
      imageUrl: Csv,
    },
    {
      title: "Operational management & control",
      description:
        "Work smarter, not harder. Automate and simplify your operations.",
      features: [
        "CRM & Customer portal",
        // "Scheduling",
        // "Helpdesk",
        "Inventory management",
      ],
      imageUrl: Crm,
    },
    // Tambahkan item lain di sini jika diperlukan
  ];

  return (
    <section className="max-w-5xl mx-auto pt-5 pb-16">
      <h2 className="text-center font-bold text-2xl ">
        Choose us and enjoy the benefits of not having <br /> to take care of
        the following
      </h2>
      <div className="grid grid-cols-1 gap-4">
        {chooseItems.map((item, index) => (
          <ChooseItem
            key={index}
            title={item.title}
            description={item.description}
            features={item.features}
            imageUrl={item.imageUrl}
            orderLeft={index % 2 === 0} // Mengatur order kiri atau kanan
          />
        ))}
      </div>
    </section>
  );
}

function ChooseItem({ title, description, features, imageUrl, orderLeft }) {
  return (
    <div className={`flex mt-12 ${orderLeft ? "" : "md:flex-row-reverse"}`}>
      <div className={`w-1/2 ${orderLeft ? "order-1" : ""}`}>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-lg mt-2 pb-4 text-slate-400">{description}</p>
        <ul className="space-y-4">
          {features.map((feature, index) => (
            <li className="flex items-center" key={index}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 stroke-[#4C90FF]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <p className="ml-4">{feature}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className={`w-1/2 ${orderLeft ? "order-2" : ""}`}>
        <div className={`${orderLeft ? "pl-8" : "pr-8"}`}>
          <img
            className="object-contain max-h-96 w-full rounded-2xl"
            src={imageUrl}
            alt={title}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

export default ChooseUs;
