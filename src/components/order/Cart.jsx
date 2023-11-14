import { Link } from "@tanstack/react-router";
import { useState, useEffect, Suspense, useCallback } from "react";
// import { useQuery } from "react-query";
import { useQuery } from "@tanstack/react-query";
import { filter } from "lodash";
import { getProductPublic } from "./config_public";
import useFormStore from "@/store/useFormStore";
import Loader from "@/components/Loader";
import { FormProvider, useForm } from "react-hook-form";

function Cart({ onNext }) {
  const { register, handleSubmit, watch, errors, setValue } = useForm(); // Tambahkan inisialisasi useForm
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProductTotalPrice, setSelectedProductTotalPrice] = useState(0); // Tambahkan state ini
  const [isProductSelected, setIsProductSelected] = useState(false);

  const { setData, stepZero } = useFormStore();

  console.log(
    `default.code and totall harga`,
    selectedProduct?.default_code || "",
    selectedProductTotalPrice
  );

  const [selectedProductId, setSelectedProductId] = useState("");

  const {
    isLoading,
    error,
    data: publicProduct,
    isFetching,
    isSuccess,
  } = useQuery({
    queryKey: ["repoData"],
    queryFn: () => getProductPublic(),
  });

  if (isLoading) return <Loader />;

  if (error) return "An error has occurred: " + error.message;

  // console.log("data", data);
  const dataProduct = publicProduct || [];

  const targetIds = [13, 14, 15];
  const filteredData = filter(dataProduct, (obj) => {
    return targetIds.includes(obj.id);
  });

  console.log("sss", filteredData);

  const handleProductChange = (e) => {
    const selectedId = e.target.value;
    setSelectedProductId(selectedId);

    // Cari produk yang sesuai dengan ID yang dipilih
    const selectedProduct = filteredData.find(
      (product) => product.id === parseInt(selectedId)
    );

    setSelectedProduct(selectedProduct);

    if (selectedProduct) {
      const totalHarga = selectedProduct.list_price
        ? Number(selectedProduct.list_price) +
          Number(selectedProduct.list_price) * 0.11
        : 0;

      const SKUCode = selectedProduct.default_code;
      setValue("total_price", totalHarga); // Set total_price ke useForm
      setValue("default_code", SKUCode); // Set total_price ke useForm

      // Simpan total harga ke state
      setSelectedProductTotalPrice(totalHarga);

      // Set isProductSelected to true
      setIsProductSelected(true);
    } else {
      // Set isProductSelected to false if no product is selected
      setIsProductSelected(false);
    }
  };

  const onSubmit = (data) => {
    setData({ step: 0, data });
    // Data yang diambil dari form dapat diakses melalui 'data'
    console.log("sku and total price:", data);
    onNext();
  };

  const rupiah = (number) => {
    const formattedNumber = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);

    return formattedNumber;
  };

  return (
    <Suspense fallback={<Loader />}>
      <Stepper />
      <div className="bg-white h-screen">
        <div className="mt-12 mb-12">
          <div className="max-w-5xl py-8 px-8 mx-auto bg-slate-50 shadow-md rounded-lg  md:max-w-5xl">
            <div className="md:flex ">
              <div className="w-full  px-4 py-4">
                {isSuccess && (
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="md:grid md:grid-cols-3 gap-2 "
                  >
                    <div className="col-span-2 px-4">
                      <div className="flex justify-between ">
                        <h1 className="text-3xl font-semibold ">
                          Product Subscription
                        </h1>
                        <select
                          id="period"
                          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-md  focus:ring-blue-500 focus:border-blue-500 block w-full py-1.5 px-1 mt-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-xs max-w-[120px]"
                          disabled
                        >
                          <option value="US">1 Month</option>
                        </select>
                      </div>

                      <div className=" mt-6 pt-6">
                        <div className="flex justify-between">
                          <div>
                            <select
                              name="default_code"
                              value={selectedProductId}
                              onChange={(e) => handleProductChange(e)}
                              className="block w-full py-3 px-3 mb-6 text-sm text-blue-800 bg-slate-50  rounded-md border-2 border-blue-500 font-medium focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                            >
                              <option value="">Choose Your Plan</option>
                              {filteredData.map((product) => {
                                const displayName = product.display_name
                                  .replace(/\[.*?\]/, "")
                                  .trim();
                                return (
                                  <option key={product.id} value={product.id}>
                                    {displayName}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                          <div>
                            <span className="text-md font-medium">
                              {selectedProduct
                                ? ` ${rupiah(selectedProduct.list_price)}`
                                : ""}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-end"></div>
                      </div>

                      <div className="flex justify-between items-center mt-24 pt-6 border-t">
                        <div className="flex items-center">
                          <Link to="/pricing">
                            <span className="text-base  text-slate-600/50">
                              back to pricing
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className=" p-5 bg-slate-800 rounded overflow-visible">
                      <div className="flex">
                        <span className="text-xl font-medium text-gray-100 block pb-3">
                          Order Price
                        </span>
                        {/* <div className="text-xs">Hapus</div> */}
                      </div>
                      <div className="flex justify-between  pt-4 border-b pb-2">
                        <h3 className="text-xs text-slate-300 ">Subtotal</h3>
                        <p className="text-xs text-slate-300 ">
                          {selectedProduct
                            ? `${rupiah(selectedProduct.list_price)}`
                            : ""}
                        </p>
                      </div>
                      <div className="flex justify-between  pt-4 border-b pb-2">
                        <h3 className="text-xs text-slate-300 ">PPN@ 11.00%</h3>
                        <p className="text-xs text-slate-300 ">
                          {selectedProduct
                            ? `${rupiah(selectedProduct.list_price * 0.11)}`
                            : ""}
                        </p>
                      </div>

                      <div className="flex-col justify-end items-end text-end my-5 pt-4 py-6 bg-slate-500/20 pr-4 ">
                        <h3 className="text-2xl font-bold text-[#EDC997]">
                          {selectedProduct
                            ? rupiah(selectedProduct.list_price * 1.11)
                            : ""}
                        </h3>
                        <p className="text-xs text-slate-300 ">
                          Amount Due Today
                        </p>
                      </div>

                      <button
                        className="h-12 disabled:opacity-70 disabled:hover:bg-blue-600 disabled:hover:cursor-not-allowed  w-full bg-blue-600 rounded focus:outline-none text-white hover:bg-blue-700 flex justify-center items-center"
                        type="submit"
                        disabled={!isProductSelected} // Disable the button if no product is selected
                      >
                        <div className="flex items-center	">
                          <span>Next</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              fillRule="evenodd"
                              d="M3.75 12a.75.75 0 01.75-.75h13.19l-5.47-5.47a.75.75 0 011.06-1.06l6.75 6.75a.75.75 0 010 1.06l-6.75 6.75a.75.75 0 11-1.06-1.06l5.47-5.47H4.5a.75.75 0 01-.75-.75z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}

function Stepper() {
  return (
    <div className="max-w-5xl mx-auto pt-8">
      <ol className="flex w-full justify-center">
        <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700">
          <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
            <svg
              className="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 16"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
            </svg>
          </span>
        </li>
        <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700">
          <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
            <svg
              className="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 16"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
            </svg>
          </span>
        </li>

        <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700">
          <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
            <svg
              className="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 16"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
            </svg>
          </span>
        </li>
        <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700">
          <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
            <svg
              className="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 16"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
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

export default Cart;
