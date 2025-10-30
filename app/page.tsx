"use client";


import HomeView from "@/components/views/home-view";
import { useState } from "react";

export default function Page() {
  const [openCreateModal, setOpenCreateModal] = useState(false);

  return (
    <>
      <HomeView setOpenCreateModal={setOpenCreateModal} />
      {/* modal create token nanti taruh di sini */}
    </>
  );
}