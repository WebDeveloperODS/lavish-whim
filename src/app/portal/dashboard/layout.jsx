'use client';

import PortalHeader from "app/ui/components/portal/header";
import SideBar from "app/ui/components/portal/side-bar";
import { useState } from "react";

export default function Layout({ children }) {
  const [openMenu, setOpenMenu] = useState(true);

  const gridCols = openMenu
    ? "2xl:grid-cols-[16%_84%]"
    : "2xl:grid-cols-[5em_calc(100vw-5em)]";

  return (
    <div className={`grid ${gridCols} w-full h-screen`}>
      <SideBar menuCall={openMenu} setMenuCall={setOpenMenu} />

      <div className="w-full relative overflow-x-hidden h-screen">
        <PortalHeader />
        <div className="container p-6">
          {children}
        </div>
      </div>
    </div>

  );
}
