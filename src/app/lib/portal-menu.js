import { MdOutlineDashboard } from "react-icons/md";
import { BsClipboardData } from "react-icons/bs";
import { IoStorefrontOutline } from "react-icons/io5";
import { TbUsersGroup } from "react-icons/tb";
import { MdAddShoppingCart } from "react-icons/md";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { RiCoupon3Line } from "react-icons/ri";
import { FiImage } from "react-icons/fi";

export const PortalMenu = [
      {
            title: 'Dashboard',
            link: '/portal/dashboard',
            icon: <MdOutlineDashboard className="w-full h-full"/>
      },
      {
            title: 'Products Orders',
            link: '/portal/dashboard/orders-management',
            icon: <BsClipboardData className="w-full h-full"/>
      },
      {
            title: 'Manage Products',
            link: '/portal/dashboard/products-list',
            icon: <IoStorefrontOutline className="w-full h-full"/>
      },
      {
            title: 'Add New Product',
            link: '/portal/dashboard/new-product-addition',
            icon: <MdAddShoppingCart className="w-full h-full"/>
      },
      {
            title: 'Home Popup',
            link: '/portal/dashboard/home-popup-setup',
            icon: <FiImage className="w-full h-full"/>
      },
      {
            title: 'Active Coupons',
            link: '/portal/dashboard/discount-coupons',
            icon: <RiCoupon3Line className="w-full h-full"/>
      },
]

export const UserManagementMenu = [
      {
            title: 'Portal Users',
            link: '/portal/dashboard/portal-users',
            icon: <TbUsersGroup className="w-full h-full"/>
      },
      {
            title: 'Add New User',
            link: '/portal/dashboard/new-user-addition',
            icon: <MdOutlinePersonAddAlt className="w-full h-full"/>
      },
]