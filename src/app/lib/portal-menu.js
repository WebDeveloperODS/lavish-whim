import { MdOutlineDashboard } from "react-icons/md";
import { BsClipboardData } from "react-icons/bs";
import { IoStorefrontOutline } from "react-icons/io5";
import { TbUsersGroup } from "react-icons/tb";
import { MdAddShoppingCart } from "react-icons/md";
import { MdOutlinePersonAddAlt } from "react-icons/md";

export const PortalMenu = [
      {
            title: 'Dashboard',
            link: '/portal/dashboard',
            icon: <MdOutlineDashboard />
      },
      {
            title: 'Products Orders',
            link: '/portal/dashboard/orders-management',
            icon: <BsClipboardData />
      },
      {
            title: 'Manage Products',
            link: '/portal/dashboard/products-list',
            icon: <IoStorefrontOutline />
      },
      {
            title: 'Portal Users',
            link: '/portal/dashboard/portal-users',
            icon: <TbUsersGroup />
      },
      {
            title: 'Add New Product',
            link: '/portal/dashboard/new-product-addition',
            icon: <MdAddShoppingCart />
      },
      {
            title: 'Add New User',
            link: '/portal/dashboard/new-user-addition',
            icon: <MdOutlinePersonAddAlt />
      },
]