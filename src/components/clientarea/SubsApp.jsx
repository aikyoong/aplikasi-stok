import { Link } from "@tanstack/react-router";
import React from "react";
import { ArrowUpFromDot, X } from "lucide-react";

function SubsApp() {
  return (
    <>
      <AppsDetail />
      <SubsDetail />
    </>
  );
}

const AppsDetail = () => {
  return (
    <div className="max-w-5xl mx-auto mt-12">
      <h2 className="text-4xl font-bold mb-8">App Detail</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-2 max-w-2xl">
          <h3 className="font-semibold">Subdomain</h3>
          <a href="https://cumi-cumi.zenradius.id">cumi-cumi.zenradius.id</a>
        </div>
        <div className="grid grid-cols-2 max-w-2xl">
          <h3 className="font-semibold">Data Center</h3>
          <div>POP Pondok Gede</div>
        </div>
        <div className="grid grid-cols-2 max-w-2xl">
          <h3 className="font-semibold">Status</h3>
          <div className="space-y-2">
            <div className="p-4 bg-red_accent text-center text-white">
              <p> Inactive</p>
            </div>
            <p className="text-sm">
              The application is currently{" "}
              <span className="text-red_accent font-semibold">inactive</span>{" "}
              due to pending payment. Please proceed with the{" "}
              <Link
                to={"/clientarea/my-invoice"}
                className="font-semibold text-blue-800"
              >
                payment
              </Link>{" "}
              to activate it
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
const SubsDetail = () => {
  return (
    <div className="max-w-5xl mx-auto mt-12 mb-16">
      <h2 className="text-4xl font-bold mb-8">Subscription Detail</h2>
      <div>
        <a
          href="#"
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          {/* <img
            className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
            src="/docs/images/blog/image-4.jpg"
            alt=""
          /> */}
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Business Plan
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
            <div className="space-x-4 flex">
              <button className="p-3 bg-blue-700 rounded-md text-white flex space-x-4">
                <ArrowUpFromDot className="w-4" />
                <p>Upgrade Plan</p>
              </button>
              <button className="p-3 border-red-700 border-2 rounded-md text-red-900 flex space-x-4">
                <X className="w-4" />
                <p>Cancel Subscription</p>
              </button>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default SubsApp;
