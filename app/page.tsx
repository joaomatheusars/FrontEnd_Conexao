"use client";

import { useEffect, useState } from "react";
import Table from "./components/clientsTable";
import { useRouter } from "next/navigation";
import Header from "@/components/header";

export default function Home() {
  const token = localStorage.getItem("access_token");
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []);

  return (
    <div>
      <Header />
      <Table token={token} />
    </div>
  );
}
