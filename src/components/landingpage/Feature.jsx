import React from "react";

function Feature() {
  const featureItems = [
    {
      title: "CRM",
      description:
        "Elevate your customer relationships with our CRM service. Manage customer data, interactions, and services to enhance their experience.",
    },
    {
      title: "Network Monitoring",
      description:
        "Keep a watchful eye on your network's health and performance in real-time. Detect disruptions and identify network issues swiftly with our Network Monitoring.",
    },
    {
      title: "Inventory Management",
      description:
        "Streamline your inventory of hardware and software essentials. Track inventory, handle purchases, sales, and maintenance seamlessly.",
    },
    {
      title: "Network Management",
      description:
        "Take full control of your ISP network infrastructure. Manage network device configurations, performance monitoring, maintenance scheduling, and security.",
      comingSoon: true, // Add a flag for the "Coming Soon" label
    },
    {
      title: "HRM",
      description:
        "Enhance your human resource management with our HRM service. Handle employee data, payroll, training, recruitment, and HR administration efficiently.",
      comingSoon: true, // Add a flag for the "Coming Soon" label
    },
    // {
    //   title: "CRM",
    //   description:
    //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta sint, quasi nulla saepe quos repellendus sunt! Sunt iusto in itaque!",
    // },
  ];

  return (
    <section className="max-w-5xl mx-auto pt-36 pb-10">
      <h2 className="text-center font-bold text-2xl ">
        Zenradius <span className="text-blue-600">simplifies the process</span>{" "}
        of selling internet services, connecting customers, handling billing,
        and providing customer support.
      </h2>
      <p className="text-center pt-3">
        Improve results in each aspect of your business
      </p>

      <div className="grid grid-cols-3 gap-4">
        {featureItems.map((item, index) => (
          <FeatureItem
            key={index}
            title={item.title}
            description={item.description}
            comingSoon={item.comingSoon} // Pass the flag to the FeatureItem
          />
        ))}
      </div>
    </section>
  );
}

function FeatureItem({ title, description, comingSoon }) {
  return (
    <>
      <div
        className={`relative  p-[1px] mt-4 shadow-md  shadow-[#eaf0f9] group ${
          comingSoon ? "" : "hover:scale-105"
        }   transition-all grid overflow-hidden rounded-md  duration-300`}
      >
        <span>
          <span className="spark mask-gradient animate-flip before:animate-rotate absolute inset-0 h-[100%] w-[100%] overflow-hidden rounded-full [mask:linear-gradient(#4C90FF,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:bg-[conic-gradient(from_0deg,transparent_0_340deg,#4C90FF_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
        </span>
        {/* <span className="backdrop absolute inset-[1px] bg-white transition-colors duration-200 group-hover:bg-slate-200" /> */}

        <div className="relative z-50  px-8 pb-8 pt-6 bg-white rounded-md ">
          {comingSoon && (
            <span className="text-xs font-semibold inline-block text-center py-1 px-2 uppercase rounded-full text-red-500 bg-red-100 uppercase last:mr-0 mr-1">
              Coming Soon
            </span>
          )}
          <div className="flex space-x-4 pt-2">
            <h3 className="font-bold">{title}</h3>
          </div>
          <p className="text-sm ">{description}</p>
        </div>
      </div>
    </>
  );
}

export default Feature;
