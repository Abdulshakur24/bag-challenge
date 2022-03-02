import React from "react";
import { Link, useLocation } from "react-router-dom";
import { SidbarWrapper } from "./SidebarStyle";
import { ReactComponent as BagLogo } from "../../../../asset/BAG-Logo.svg";

function Sidebar() {
  const { pathname } = useLocation();

  return (
    <SidbarWrapper>
      <div className="container">
        <BagLogo />
        <div className="contents">
          <Link
            className={`${pathname === "/home/my-list" && "selected"}`}
            to="my-list"
          >
            MY LIST
          </Link>
          <Link
            className={`${pathname === "/home/visited" && "selected"}`}
            to="visited"
          >
            VISITED
          </Link>
          <Link
            className={`${pathname === "/home/to-visit" && "selected"}`}
            to="to-visit"
          >
            TO VISIT
          </Link>
        </div>
      </div>
    </SidbarWrapper>
  );
}

export default Sidebar;
