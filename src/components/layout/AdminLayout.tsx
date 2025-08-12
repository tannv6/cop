import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
// import "../../styles/admin/css/style.css";
import Topbar from "./Topbar";

const AdminLayout: React.FC = () => {
  const [sidebarToggled, setSidebarToggled] = useState(false);

  useEffect(() => {
    const body = document.body;
    if (sidebarToggled) {
      body.classList.add("sidebar-toggled");
    } else {
      body.classList.remove("sidebar-toggled");
    }
  }, [sidebarToggled]);

  return (
    <>

      <div id="wrapper">
        <Sidebar
          isToggled={sidebarToggled}
          onToggle={() => setSidebarToggled((prev) => !prev)}
        />

        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Topbar />
            <div className="container-fluid text-black">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
