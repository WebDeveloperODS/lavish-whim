'use client'
import PortalHeader from "app/ui/components/portal/header";
import SideBar from "app/ui/components/portal/side-bar";
import { useState } from "react";

export default function Layout({ children }) {
  const [openMenu, setOpenMenu] = useState(true);

  return (
    <div className={`grid 2xl:${openMenu === true ? 'grid-cols-[16%_84%]' : 'grid-cols-[5%_95%]'} w-full h-full`}>
      <SideBar menuCall={openMenu} />
      <div className="">
        <PortalHeader openMenu={openMenu} setOpenMenu={setOpenMenu} />
        {children}
      </div>
    </div>
  );
}
