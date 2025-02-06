import { redirect, useRouter } from "next/navigation";

export const CheckToken = () => {
  const router = useRouter();
  const token = localStorage.getItem("access_token");

  const API = async () => {
    const res = await fetch("http://localhost:8000/checkToken", {
      method: "Get",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const value = await res;

    if (value.status !== 200) {
      router.push("/login");
    }
  };

  return { API };
};
