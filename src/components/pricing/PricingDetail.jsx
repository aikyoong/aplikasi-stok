import { useCart } from "@/store/useCart";
import { useNavigate, Router, Link } from "@tanstack/react-router";

const Checklist = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      className="text-slate-700 m-auto"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title id="catTitle"></title>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
};

function PricingDetail() {
  return (
    <section className="max-w-5xl mx-auto py-14">
      <table className="rounded ">
        <THead />
        <tbody>
          <HeadTableRow>
            <HeadTableCell>Support</HeadTableCell>
          </HeadTableRow>

          <TableRow>
            <TableCell isHeader>Technical Support</TableCell>
            <TableCell>Standard Support</TableCell>
            <TableCell>Priority Support</TableCell>
            <TableCell isLast>Enterprise Support</TableCell>
          </TableRow>

          <HeadTableRow>
            <HeadTableCell>CRM</HeadTableCell>
          </HeadTableRow>

          <TableRow>
            <TableCell isHeader>Customer Subscription</TableCell>
            <TableCell>100 customers</TableCell>
            <TableCell>350 customers</TableCell>
            <TableCell>650 customers</TableCell>
          </TableRow>
          <TableRow>
            <TableCell isHeader>Product</TableCell>
            <TableCell>15 products</TableCell>
            <TableCell>40 products</TableCell>
            <TableCell>100 products</TableCell>
          </TableRow>
          <TableRow>
            <TableCell isHeader>Payment</TableCell>
            <TableCell>1 Payment Provider (QRIS)</TableCell>
            <TableCell>5 Payment Provider</TableCell>
            <TableCell>Unlimited Payment Provider</TableCell>
          </TableRow>

          <TableRow>
            <TableCell isHeader>Invoices</TableCell>
            <TableCell>
              <Checklist />
            </TableCell>
            <TableCell>
              <Checklist />
            </TableCell>
            <TableCell>
              <Checklist />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell isHeader>Chat Support</TableCell>
            <TableCell></TableCell>
            <TableCell>
              <Checklist />
            </TableCell>
            <TableCell isLast>
              <Checklist />
            </TableCell>
          </TableRow>

          <HeadTableRow>
            <HeadTableCell>Network Monitoring</HeadTableCell>
          </HeadTableRow>

          <TableRow>
            <TableCell isHeader>Radius</TableCell>
            <TableCell>
              <Checklist />
            </TableCell>
            <TableCell>
              <Checklist />
            </TableCell>
            <TableCell>
              <Checklist />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell isHeader>OLT/ONU</TableCell>
            <TableCell></TableCell>
            <TableCell>
              <Checklist />
            </TableCell>
            <TableCell>
              <Checklist />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell isHeader>FTTH - ODP/Home Pass</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell isLast>
              <Checklist />
            </TableCell>
          </TableRow>

          <HeadTableRow>
            <HeadTableCell> Network Management</HeadTableCell>
          </HeadTableRow>
          <TableRow>
            <TableCell isHeader>Devices</TableCell>
            <TableCell>
              <Checklist />
            </TableCell>
            <TableCell>
              <Checklist />
            </TableCell>
            <TableCell isLast>
              <Checklist />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell isHeader>Services</TableCell>
            <TableCell></TableCell>
            <TableCell>
              <Checklist />
            </TableCell>
            <TableCell isLast>
              <Checklist />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell isHeader>IPAM</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>
              <Checklist />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell isHeader>Sites</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>
              <Checklist />
            </TableCell>
          </TableRow>

          <HeadTableRowSpecial>
            <HeadTableCellSpecial> Special Offer</HeadTableCellSpecial>
          </HeadTableRowSpecial>
          <TableRow>
            <TableCell isHeader>
              Custom Landing Page with Hostpot Localization
            </TableCell>
            <TableCell>Call Us</TableCell>
            <TableCell>Call Us</TableCell>
            <TableCell isLast>Call Us</TableCell>
          </TableRow>
        </tbody>
      </table>
    </section>
  );
}

export default PricingDetail;
// -----------------

const THead = () => {
  const navigate = useNavigate({ from: "/pricing" });
  const pricingData = [
    {
      title: "Basic",
      description: "For small ISPs",
      price: "RP 250.000",
      price_description: "/month or billed annually",
      buttonLabel: "Subscribe Basic Plan",
      productId: "13", // Assign a unique product ID
    },
    {
      title: "Business",
      description: "For mid-sized ISPs",
      price: "RP 550.000",
      price_description: "/month or billed annually",
      buttonLabel: "Subscribe Business Plan",
      productId: "14", // Assign a unique product ID
    },
    {
      title: "Enterprise",
      description: "For large ISPs",
      price: "RP 1.150.000",
      price_description: "/month or billed annually",
      buttonLabel: "Subscribe Enterprise Plan",
      productId: "15", // Assign a unique product ID
    },
  ];

  const addToCart = useCart((state) => state.addToCart);

  const handleClick = (productId) => {
    addToCart(productId);
  };

  return (
    <thead className="sticky block top-0" scope="col">
      <tr className="flex text-left">
        <th scope="row" className=" hidden sm:block w-1/4 p-4 rounded-tl "></th>
        {pricingData.map((item, index) => (
          <th
            key={index}
            scope="col"
            className={`w-1/${pricingData.length} sm:w-1/4 p-4   ${
              index === 0 ? "rounded-tl" : ""
            } ${
              index === pricingData.length - 1 ? "rounded-tr" : ""
            }  font-normal bg-slate-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-0 border border-slate-100`}
          >
            <h4 className="font-semibold">{item.title}</h4>
            <p className="text-sm hidden sm:block">{item.description}</p>
            <div className="flex items-center mb-4 flex-wrap sm:no-wrap justify-center sm:justify-start">
              <p className="text-3xl font-bold">{item.price}</p>
              <div className="font-normal text-xs ml-2">
                <p>{item.price_description}</p>
              </div>
            </div>
            {index === 0 || index === 2 ? (
              <button
                href=""
                className=" block px-8 text-blue-600 border border-[#c5d1f8] hover:bg-blue-600 hover:text-white text-xs py-3 text-center rounded font-semibold"
                title=""
                // onClick={handleButtonClick(item.productId)}
              >
                {item.buttonLabel}
              </button>
            ) : (
              <Link to="/order">
                <button
                  href=""
                  className=" block px-8 text-white bg-blue-600 hover:bg-blue-700 text-xs py-3 text-center rounded font-semibold"
                  title=""
                  // onClick={handleClick(item.productId)}
                >
                  {item.buttonLabel}
                </button>
              </Link>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};

const TableCell = ({ children, isHeader = false, isLast = false }) => {
  const cellClasses = `w-1/3 sm:w-1/4 p-4 border-slate-300 border text-center ${
    isHeader ? "bg-slate-100 font-normal" : ""
  }`;

  return <td className={cellClasses}>{children}</td>;
};

const TableRow = ({ children, header = false }) => {
  const rowClasses = `flex text-left text-sm flex-wrap sm:no-wrap ${
    header ? "sm:border-t" : ""
  }`;

  return <tr className={rowClasses}>{children}</tr>;
};

const HeadTableRow = ({ children }) => {
  return <tr className="flex text-left">{children}</tr>;
};

const HeadTableRowSpecial = ({ children }) => {
  return <tr className="flex text-left ">{children}</tr>;
};

const HeadTableCell = ({ children }) => {
  const cellClasses = `p-4 bg-slate-100 border  border-slate-300 min-w-full border-b-0 text-blue-600`;
  return <td className={cellClasses}>{children}</td>;
};

const HeadTableCellSpecial = ({ children }) => {
  const cellClasses = `p-4 bg-gradient-to-r from-[#1C2431] to-[#EDC997] border  border-slate-300 min-w-full border-b-0 text-[#EDC997]`;
  return <td className={cellClasses}>{children}</td>;
};
