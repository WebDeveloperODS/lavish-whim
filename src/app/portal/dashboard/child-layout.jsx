'use client';
import PortalHeader from "app/ui/components/portal/header";
import SideBar from "app/ui/components/portal/side-bar";
import { useState } from "react";

export default function ChildLayout({ children, name }) {
  const [openMenu, setOpenMenu] = useState(true);

  const gridCols = openMenu
    ? "md:grid-cols-[16%_84%]"
    : "md:grid-cols-[5em_calc(100vw-5em)]";

  return (
    <div className={`grid ${gridCols} w-full h-screen`}>
      <SideBar
        menuCall={openMenu}
        setMenuCall={setOpenMenu}
        username={name}
      />

      <div className="w-full relative overflow-x-hidden h-screen">
        <PortalHeader />
        <div className="container p-6">{children}</div>
      </div>
    </div>
  );
}
