import React from "react";
import Image from 'next/image';

import {
  AiOutlineHistory,
  AiOutlineHome,
  AiOutlineMessage,
} from "react-icons/ai";


const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <div className="logo-container">
      <Image
      src="/assets/logo.png"
      width={80}
      height={80}
      alt="logo"
    />
      </div>
      <ul className="navigations">
        <li>
          <AiOutlineHome className="nav-icon" />

          <span>Home</span>
        </li>
        <li>
         
            <AiOutlineHistory className="nav-icon" />
        
          <span>History</span>
        </li>
        <li>
        
            <AiOutlineMessage className="nav-icon" />
        
          <span>Support</span>
        </li>
      </ul>
      <p>theme</p>
    </div>
  );
};

export default Sidebar;
