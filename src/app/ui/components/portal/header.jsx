import React from 'react'
import { CgMenuLeftAlt, CgMenuRightAlt } from "react-icons/cg";

const PortalHeader = (
      {openMenu, setOpenMenu}
) => {
      return (
            <div className='flex justify-between px-2 py-3 border-b border-black/50'>
                  {
                        !openMenu ? <CgMenuLeftAlt className='w-6 bg-black text-white rounded-sm h-auto border border-black' onClick={() => setOpenMenu(true)}/> : <CgMenuRightAlt className='w-6 bg-black text-white rounded-sm h-auto border border-black' onClick={() => setOpenMenu(false)}/>
                  }                  
            </div>
      )
}

export default PortalHeader