import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";
import toast from "react-hot-toast";

const useAuth = create(
  persist(
    (set) => ({
      isLoggedIn: false, // default value
      authUser: null, // Inisialisasi dengan null atau data default sesuai kebutuhan

      login: async (email, password) => {
        try {
          const formData = new URLSearchParams();
          formData.append("url", "http://172.16.35.43:8059");
          formData.append("db", "SAAS");
          formData.append("username", email);
          formData.append("password", password);
          formData.append("model", "res.users");

          const config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "http://mid.tachyon.net.id/api/prod/auth",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            data: formData,
          };

          const response = await axios.request(config);
          // Set isLoggedIn menjadi true setelah berhasil login
          //   set({ isLoggedIn: true });
          console.log(response.data);
          console.log("code", response.data.code);

          if (response.data.code === 200) {
            // Set isLoggedIn menjadi true setelah berhasil login
            set({ authUser: response.data, isLoggedIn: true });
            // Simpan seluruh data pengguna ke localStorage
            localStorage.setItem("authUser", JSON.stringify(response.data));
            toast.success("login is success");
          } else {
            toast.error("Your email or password is not valid");
            console.error("Login error:");
          }
        } catch (error) {
          toast.error("Your email or password is not valid");
          console.error("Login error:", error);
          set({ isLoggedIn: false });
        }
      },

      logout: () => {
        // Tambahkan logika logout disini
        // Set isLoggedIn menjadi false
        toast.success("Logout is success");
        localStorage.removeItem("authUser"); // Hapus data pengguna dari localStorage saat logout
        set({ authUser: null, isLoggedIn: false });
      },
    }),
    {
      name: "auth-storage", // Nama item di storage (harus unik)
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuth;
