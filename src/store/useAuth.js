import { create } from "zustand";
import { useState, useCallback, useEffect } from "react";
import { persist, createJSONStorage } from "zustand/middleware";
import supabase from "@/config/supabaseClient";
import dayjs from "dayjs";
import axios from "axios";
import toast from "react-hot-toast";

const useAuth = create(
  persist(
    (set, get) => ({
      authUser: null, // Inisialisasi dengan null atau data default sesuai kebutuhan
      isLoggedIn: false, // default value
      lastActive: new Date(),

      // login: async (email, password) => {
      //   try {
      //     const formData = new URLSearchParams();
      //     formData.append("url", "http://172.16.35.43:8059");
      //     formData.append("db", "SAAS");
      //     formData.append("username", email);
      //     formData.append("password", password);
      //     formData.append("model", "res.users");

      //     const config = {
      //       method: "post",
      //       maxBodyLength: Infinity,
      //       url: "http://mid.tachyon.net.id/api/prod/auth",
      //       headers: {
      //         "Content-Type": "application/x-www-form-urlencoded",
      //       },
      //       data: formData,
      //     };

      //     const response = await axios.request(config);
      //     // Set isLoggedIn menjadi true setelah berhasil login
      //     //   set({ isLoggedIn: true });
      //     console.log(response.data);
      //     console.log("code", response.data.code);

      //     if (response.data.code === 200) {
      //       // Set isLoggedIn menjadi true setelah berhasil login
      //       set({ authUser: response.data, isLoggedIn: true });
      //       // Simpan seluruh data pengguna ke localStorage
      //       localStorage.setItem("authUser", JSON.stringify(response.data));
      //       toast.success("login is success");
      //     } else {
      //       toast.error("Your email or password is not valid");
      //       console.error("Login error:");
      //     }
      //   } catch (error) {
      //     toast.error("Your email or password is not valid");
      //     console.error("Login error:", error);
      //     set({ isLoggedIn: false });
      //   }
      // },

      login: async (email, password) => {
        let { data, error } = await supabase.auth.signInWithPassword({
          email: `${email}`,
          password: `${password}`,
        });

        if (!error) {
          set({ authUser: data, isLoggedIn: true });
          localStorage.setItem("authUser", JSON.stringify(data));
          toast.success(`Login berhasil`);
        } else {
          toast.error(`Email / password tidak valid`);
        }

        if (error) {
          throw new Error("Could not login");
        }
        return data;
      },

      logout: async () => {
        let { error } = await supabase.auth.signOut();
        if (!error) {
          toast.success("Logout is success");
          localStorage.removeItem("authUser"); // Hapus data pengguna dari localStorage saat logout
          set({ authUser: null, isLoggedIn: false });
        }
      },

      setLastActive: () => {
        set({ lastActive: new Date() });
      },

      checkInactivity: () => {
        const now = dayjs(new Date());
        const lastActive = dayjs(get().lastActive);
        if (now.diff(lastActive, "minute") > 10) {
          get().logout();
        }
      },
    }),
    {
      name: "auth-storage", // Nama item di storage (harus unik)
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useAutoLogout = () => {
  const { setLastActive, checkInactivity, logout, lastActive } = useAuth();

  useEffect(() => {
    // Set interval untuk check inaktivitas
    const interval = setInterval(() => {
      checkInactivity();
    }, 60 * 1000); // check setiap menit

    // Event listener untuk aktivitas pengguna
    const activityHandler = () => {
      setLastActive();
    };

    window.addEventListener("mousemove", activityHandler);
    window.addEventListener("keydown", activityHandler);

    // Handler untuk beforeunload
    const handleBeforeUnload = () => {
      const now = dayjs(new Date());
      const lastActiveTime = dayjs(lastActive);
      if (now.diff(lastActiveTime, "minute") > 20) {
        logout();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", activityHandler);
      window.removeEventListener("keydown", activityHandler);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [setLastActive, checkInactivity, logout, lastActive]);
};

export default useAuth;
