import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import Select from "react-select";
import supabase from "@/config/supabaseClient";
import { useState, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { RefreshCw, ListPlus } from "lucide-react";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const initialItems = [
  {
    id: 1,
    productName: "Select Product",
    quantity: 2,
    unitPrice: 22500,
    total: 45000,
  },
];

const formSetorSchema = z.object({
  totalitem: z.string(),
  totalharga: z.string().regex(/^[1-9][0-9]*$/, {
    message:
      "Jumlah Total Harga Transaksi harus berupa angka positif dan tidak boleh dimulai dengan angka 0.",
  }),
  idkonsumen: z.number(),
  tanggaltransaksi: z.string(),
  statuspembayaran: z.string(),
});

async function fetchKonsumen() {
  const { data, error } = await supabase.from("konsumen").select("*");
  if (error) {
    throw new Error("Could not fetch konsumen");
  }
  return data;
}

const TransactionForm = () => {
  const form = useForm({
    resolver: zodResolver(formSetorSchema),
    defaultValues: {
      idkonsumen: "",
      totalitem: "", // nilai awal sebagai string kosong
      totalharga: "", // sesuaikan dengan tipe data yang diharapkan
      tanggaltransaksi: "",
      statuspembayaran: "",
    },
  });

  const { data: konsumenData, error: fetchError2 } = useQuery({
    queryKey: ["konsumen"],
    queryFn: fetchKonsumen,
  });

  const [items, setItems] = useState(initialItems);

  const addItem = () => {
    const newItem = {
      id: items.length + 1,
      productName: "",
      quantity: 0,
      unitPrice: 0,
      total: 0,
    };
    setItems([...items, newItem]);
  };

  const removeItem = (itemId) => {
    setItems(items.filter((item) => item.id !== itemId));
  };

  // Update item quantity
  const updateQuantity = (itemId, quantity) => {
    setItems(
      items.map((item) =>
        item.id === itemId
          ? { ...item, quantity: quantity, total: item.unitPrice * quantity }
          : item
      )
    );
  };

  // Calculate total quantity
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

  const konsumenOption = konsumenData?.map((konsumen) => ({
    value: konsumen.idkonsumen,
    label: konsumen.nama_konsumen,
  }));

  function onSubmit(values) {
    const {
      totalitem,
      totalharga,
      tanggaltransaksi,
      idkonsumen,
      statuspembayaran,
    } = values;

    // Tambahkan waktu dan zona waktu ke tanggal
    const tanggalTransaksiFormatted = `${tanggaltransaksi} 00:00:00+00`;

    // addTransaksiPenjualan(
    //   totalitem,
    //   totalharga,
    //   tanggaltransaksi,
    //   idkonsumen,
    //   statuspembayaran
    // );

    console.log("On Submitsss", values);
  }

  return (
    <Layout>
      <div className="container max-w-5xl mx-auto py-12">
        <h1 className="text-2xl font-semibold mb-6">Tambah Transaksi</h1>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
          {/* Konsumen Section */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="md:col-span-1">
                <h2 className="text-lg font-medium mb-3">Konsumen</h2>
                <div className="mb-4">
                  <FormField
                    control={form.control}
                    name="idkonsumen"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-sm font-medium text-gray-700 mb-1">
                          Nama Konsumen
                        </FormLabel>
                        <FormControl>
                          <Controller
                            name="idkonsumen"
                            control={form.control}
                            render={({ field }) => {
                              // Menentukan nilai yang dipilih berdasarkan field.value
                              const selectedValue = konsumenOption?.find(
                                (option) => option.value === field.value
                              );

                              return (
                                <Select
                                  {...field}
                                  options={konsumenOption}
                                  value={selectedValue}
                                  onChange={(option) =>
                                    field.onChange(option.value)
                                  }
                                  className="mt-1 block w-full   border-gray-300 bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                              );
                            }}
                          />
                        </FormControl>
                        <FormDescription>
                          pilih konsumen yang membeli
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="transactionDate"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Tanggal Transaksi
                  </label>
                  <input
                    type="date"
                    id="transactionDate"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="paymentStatus"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Status Pembayaran
                  </label>
                  <select
                    id="paymentStatus"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option>Select</option>
                    {/* Map through payment status options here */}
                  </select>
                </div>
              </div>
            </form>
          </Form>

          {/* Items Section */}
          <div className="md:col-span-4">
            <h2 className="text-lg font-medium mb-3">Item</h2>
            <table className="min-w-full divide-y divide-gray-200 mb-4">
              <thead className="bg-gray-50">
                <tr>
                  <th className="w-1/2 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nama Produk
                  </th>
                  <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Jumlah Barang
                  </th>
                  <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Harga Satuan
                  </th>
                  <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {items.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <select className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                        <option>Select Product</option>
                        {/* Map through product options here */}
                      </select>
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        value={item.quantity}
                        onChange={(e) => {
                          // Handle quantity change
                        }}
                      />
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        value={item.unitPrice}
                        onChange={(e) => {
                          // Handle unit price change
                        }}
                      />
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap text-center font-bold">
                      {item.total.toLocaleString()}
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        X
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="py-2 mx-4 px-4 border text-blue-500 border-blue-600  font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
              onClick={addItem}
            >
              + Tambah Item
            </button>
          </div>
        </div>

        {/* Summary Section */}
        <div className="flex justify-end items-center mb-6">
          <div className="text-right">
            <div className="mb-2">
              <span className="text-lg font-medium">Total Item:</span>
              <span className="ml-2">{items.length}</span>
            </div>
            <div class="text-right mb-2">
              <span className="text-lg font-medium">Total Jumlah Barang:</span>
              <span className="ml-2">1</span>
            </div>
            <div>
              <span className="text-lg font-medium">Total Harga:</span>
              <span className="ml-2">
                {items
                  .reduce((sum, item) => sum + item.total, 0)
                  .toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 focus:outline-none"
          >
            Submit Transaksi
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default TransactionForm;
