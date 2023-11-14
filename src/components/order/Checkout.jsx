import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import useFormStore from "@/store/useFormStore";
import { Link, useNavigate } from "@tanstack/react-router";

import axios from "axios";
import qs from "qs";

import QRIS from "./images/qris.svg";
import BCALogo from "./images/bca-va.svg";

function Checkout({ onPrev }) {
  const { stepZero, stepOne, stepTwo, stepThree } = useFormStore();
  const [responseCode, setResponseCode] = useState(null);
  console.log("response", responseCode);

  const navigate = useNavigate({ from: "/order" });

  const methods = useForm({
    mode: "onTouched",
    defaultValues: { ...stepZero, ...stepOne, ...stepTwo, ...stepThree },
  });

  const { handleSubmit } = methods;

  console.log("ini 0", stepZero);
  console.log("step 1", stepOne);
  console.log("step 2", stepTwo);
  console.log("step 3", stepThree);
  console.log("ini email", stepTwo.email);

  const onSubmit = (data) => {
    console.log(data);
    // CreateSubs_WithInvoice();
    sendWhatsAppNotification();
  };

  const [formData, setFormData] = useState({ currentTime: "", text: "" });

  useEffect(() => {
    function generateCurrentTime() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");

      const currentTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      return currentTime;
    }

    const current_time = generateCurrentTime();
    console.log(current_time);

    setFormData({ currentTime: current_time });

    // Jangan lupa untuk menyertakan dependensi kosong []
  }, []);

  useEffect(() => {
    if (stepZero && stepOne && stepTwo && stepThree) {
      setFormData({
        ...formData,
        text: `
Hi ${stepTwo.name},

I hope this message finds you well. I am writing to confirm that we have successfully processed your order for the package plan ${stepZero.default_code} in our data center ${stepThree.data_center.label}. Additionally, we will provide the subdomain URL ${stepThree.subdomain}.zenradius.id for you upon successful payment.

This confirmation is made on behalf of ${stepTwo.name}, with the email address ${stepTwo.email}.

We understand the importance of your order, and we want to assure you that our team is working diligently to ensure a smooth and timely setup for your services.

To view your invoice and track the status of your order, please log in to our portal at zenradius.id/login. If you encounter any issues or have questions about your invoice, our support team is ready to assist you.

If you have any further questions or need assistance, feel free to reach out to us. We appreciate your business and look forward to serving you.

Best regards,

Admin
zenradius.id
      `,
      });
    }
  }, [stepZero, stepOne, stepTwo, stepThree]);

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  async function CreateSubs_WithInvoice() {
    try {
      const data = qs.stringify({
        url: "http://172.16.35.43:8059",
        db: "SAAS",
        name: stepTwo.name,
        email: stepTwo.email,
        mobile: stepTwo.phone_number,
        street: stepTwo.address,
        partner_latitude: "0.00",
        partner_longitude: "0.00",
        reference_code: formData.currentTime,
        code: stepZero.default_code, // SKU
        note: `Berlangganan dengan Data Ceenter ${stepThree.data_center.label}`,
        bank_code: "0QRIS",
        api_key: "139139230302891",
        m_id: "195226551278",
      });

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://mid.tachyon.net.id/api/prod/subscriber/with_invoice_pub_create",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data,
      };

      toast.loading("Loading...");

      const response = await axios.request(config);
      if (response.data.code === 201) {
        registerUser();
        toast.success("Your order has been confirmed");
      }
      // const responseDatas = JSON.stringify(response.data);
      console.log("zzz", response.data);
    } catch (error) {
      console.log("yyy", error.response.data.message);
      toast.error(`${error.response.data.message}`);
    }
  }

  async function registerUser() {
    const params = new URLSearchParams();
    params.append("url", "http://172.16.35.43:8059");
    params.append("db", "SAAS");
    params.append("name", stepTwo.name);
    params.append("email", stepTwo.email);
    params.append("new_password", stepTwo.confirm_password);
    params.append("phone", stepTwo.phone_number);
    params.append("street", stepTwo.address);

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://mid.tachyon.net.id/api/prod/register",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: params,
    };

    try {
      const response = await axios(config);
      console.log("ini API Regis", response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function sendWhatsAppNotification() {
    try {
      let params = new URLSearchParams();
      params.append("to", stepTwo.phone_number);
      params.append("text", formData.text);

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://mid.tachyon.net.id/api/prod/wa_notif",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: params,
      };

      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
      // Wait for 4 seconds before navigating to "//thanks-order"
      setTimeout(() => {
        navigate({ to: "//thanks-order" });
      }, 4000);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Stepper />
      <section className="max-w-5xl mx-auto pb-28 pt-12">
        <h1 className="mb-8 font-semibold text-3xl">
          Payment Method & Order Summary
        </h1>
        <FormProvider {...methods}>
          <form className="grid grid-cols-2 " onSubmit={handleSubmit(onSubmit)}>
            <div className="flex-col flex h-[490px] justify-between">
              <div className="space-y-4 ">
                <div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                  <input
                    defaultChecked
                    id="bordered-radio-1"
                    type="radio"
                    value=""
                    name="bordered-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="bordered-radio-1"
                    className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    <img src={QRIS} alt="logo" className="max-w-[100px]" />
                  </label>
                </div>
                {/* <div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                    <input
                      id="bordered-radio-2"
                      type="radio"
                      value=""
                      name="bordered-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="bordered-radio-2"
                      className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      <img src={BCALogo} alt="logo" className="max-w-[170px]" />
                    </label>
                  </div> */}
              </div>
              <div className="space-y-4 ">
                <div>
                  <h3 className="text-lg font-medium">Total</h3>
                  <p className="text-3xl font-bold">
                    {rupiah(stepZero.total_price)}
                  </p>
                  <span className="text-blue-600">*with tax</span>
                </div>
                <button
                  className="text-blue-700 hover:text-white hover:bg-blue-700 border border-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={onPrev}
                >
                  Previous
                </button>
              </div>
            </div>
            <div className="ml-12 bg-slate-800 dark:bg-slate-50 rounded-md">
              <div className="p-8 rounded-md shadow-md">
                <div className="mb-4">
                  <label
                    htmlFor="data-center"
                    className="font-medium block mb-2 text-sm text-[#EDC997] dark:text-white"
                  >
                    Package Plan
                  </label>
                  <div className="w-full flex items-center">
                    <input
                      id="base-input"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={stepZero.default_code}
                      disabled
                      readOnly
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="data-center"
                    className="font-medium block mb-2 text-sm text-[#EDC997] dark:text-white"
                  >
                    Data Center
                  </label>
                  <div className="w-full flex items-center">
                    <input
                      id="base-input"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={stepThree.data_center.label}
                      disabled
                      readOnly
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="base-input"
                    className="block mb-2 text-sm font-medium text-[#EDC997] dark:text-white"
                  >
                    Sub Domain URL
                  </label>
                  <div className="w-full flex items-center">
                    <input
                      type="text"
                      id="base-input"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-tr-none rounded-br-none"
                      value={stepThree.subdomain || ""}
                      disabled
                      readOnly
                    />
                    <span className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 rounded-tl-none rounded-bl-none border-l-0 w-fit">
                      .zenradius.id
                    </span>
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="base-input"
                    className="block mb-2 text-sm font-medium text-[#EDC997] dark:text-white"
                  >
                    Email
                  </label>
                  <div className="w-full flex items-center">
                    <input
                      type="email"
                      id="base-input"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                      value={stepTwo.email}
                      disabled
                      readOnly
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-4 w-full bg-blue-600 rounded focus:outline-nonehover:bg-blue-700 py-4 text-white"
                >
                  Submit Order
                </button>
              </div>
            </div>
          </form>
        </FormProvider>
      </section>
    </>
  );
}

export default Checkout;

function Stepper() {
  return (
    <div className="max-w-5xl mx-auto pt-8">
      <ol className="flex w-full justify-center">
        <li className="flex w-full items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800">
          <span className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
            <svg
              className="w-3.5 h-3.5 text-blue-600 lg:w-4 lg:h-4 dark:text-blue-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 12"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5.917 5.724 10.5 15 1.5"
              />
            </svg>
          </span>
        </li>
        <li className="flex w-full items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800">
          <span className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
            <svg
              className="w-3.5 h-3.5 text-blue-600 lg:w-4 lg:h-4 dark:text-blue-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 12"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5.917 5.724 10.5 15 1.5"
              />
            </svg>
          </span>
        </li>
        <li className="flex w-full items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800">
          <span className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
            <svg
              className="w-3.5 h-3.5 text-blue-600 lg:w-4 lg:h-4 dark:text-blue-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 12"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5.917 5.724 10.5 15 1.5"
              />
            </svg>
          </span>
        </li>
        <li className="flex w-full items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800">
          <span className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
            <svg
              className="w-3.5 h-3.5 text-blue-600 lg:w-4 lg:h-4 dark:text-blue-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 12"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5.917 5.724 10.5 15 1.5"
              />
            </svg>
          </span>
        </li>

        <li className="flex items-center w-full">
          <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
            <svg
              className="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 20"
            >
              <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
            </svg>
          </span>
        </li>
      </ol>
    </div>
  );
}
