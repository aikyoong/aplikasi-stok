import Logo from "@/components/main/logo/icon.png";
import Type from "@/components/main/logo/dark-type.png";
import { Download, RefreshCw } from "lucide-react";

function InvoiceDetail() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="space-x-4 flex mt-12 mb-8">
        <button className="p-3 bg-blue-700 rounded-md text-white flex space-x-4">
          <Download className="w-4" />
          <p>Download PDF</p>
        </button>
        <button className="p-3 border-gold_accent border-2 rounded-md text-blue_dark flex space-x-4">
          <RefreshCw className="w-4" />
          <p>Refresh Payment Status</p>
        </button>
      </div>
      <div className="max-w-4xl  mb-12 border-2 rounded-[32px]">
        <div className="px-12 pt-12 pb-8 space-y-6">
          <div className="space-y-6">
            <img src={Logo} alt="logo" className="max-w-[90px] " />
            <h1 className="font-bold text-4xl">
              INVOICE{" "}
              <span className="font-medium text-blue_dark/50">
                #INV-070401-00123
              </span>
            </h1>
            <div className="space-x-6 flex">
              <h3 className="font-semibold text-blue_dark">
                Date{" "}
                <span className="font-medium text-blue_dark/50 ml-1">
                  07/04/2001
                </span>
              </h3>
              <h3 className="font-semibold text-blue_dark">
                Date Due
                <span className="font-medium text-blue_dark/50 ml-1">
                  07/04/2001
                </span>
              </h3>
            </div>
            <TableItem />
          </div>
        </div>
        <Total />
        <Payment />
        <div className="px-12 flex justify-end pb-12">
          <img src={Type} alt="" className="max-w-[190px]" />
        </div>
      </div>
    </div>
  );
}

export default InvoiceDetail;

const TableItem = () => {
  return (
    <table className="min-w-full text-left text-sm">
      <thead className="bg-gray-50">
        <tr>
          <th className=" py-2  font-medium text-slate-500">Item</th>
          <th className=" py-2  font-medium text-slate-500">Desc</th>
          <th className=" py-2  font-medium text-slate-500">Quantity</th>
          <th className=" py-2  font-medium text-slate-500">Price</th>
        </tr>
      </thead>
      <tbody className="bg-white">
        <tr>
          <th className=" py-2  text-blue-950 ">[ISP-ERP-BUSINESS-PLAN]</th>
          <th className=" py-2  font-medium text-blue-950">
            subscribing app zenradius admin
          </th>
          <th className=" py-2  font-medium text-blue-950">1</th>
          <th className=" py-2  font-medium text-blue-950">Rp.550.000</th>
        </tr>
      </tbody>
    </table>
  );
};

const Total = () => {
  return (
    <div className="p-12 text-sm bg-blue_soft py-5 mb-8 text-white">
      <div className="grid grid-cols-4">
        <div></div>
        <div></div>
        <div></div>
        <div className="space-y-3">
          <div className="flex justify-between">
            <h3>Subtotal</h3>
            <p className="text-gold_accent">RP.250.000</p>
          </div>
          <div className="flex justify-between pb-3 border-b">
            <h3>Tax(11%)</h3>
            <p className="text-gold_accent">RP.26.500</p>
          </div>
          <div className="flex justify-between pb-3 ">
            <h3>Total</h3>
            <p className="font-medium text-gold_accent">RP.276.500</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Payment = () => {
  return (
    <div className="p-12 text-sm py-5 mb-8">
      <div className="grid grid-cols-4">
        <div className="space-y-3">
          <h3 className="font-medium text-slate-500">Billing To</h3>
          <p className="font-medium text-blue-950">Ricky Raihan Azhari</p>
        </div>
        <div className="space-y-3">
          <h3 className="font-medium text-slate-500">Billing Address</h3>
          <p className="font-medium text-blue-950">
            Rawa Buntu no101 rt 08 rw02, South Tangerang City, Banten,
            Indonesia,
          </p>
        </div>
        <div className="space-y-3">
          <h3 className="font-medium text-slate-500">Payment Method</h3>
          <p className="font-medium text-blue-950">QRIS</p>
          <img
            src="https://www.berkabarnews.com/foto_berita/3IMG_20210228_175025.jpg"
            alt="qris"
            className=" max-w-[140px]"
          />
        </div>
        <div className="space-y-3">
          <h3 className="font-medium text-slate-500">Payment Status</h3>
          <div className="w-full text-center py-4 bg-red_accent ">
            <p className="uppercase font-bold text-white">NOT PAID</p>
          </div>
        </div>
      </div>
    </div>
  );
};
