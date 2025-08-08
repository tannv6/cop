import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import "../../styles/admin/css/style.css";
import { Helmet } from "react-helmet-async";
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
      <Helmet>
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="/images/favicon.svg"
        />
        <link
          rel="apple-touch-icon"
          href="/AdmMaster/_images/apple-touch-icon.png"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
          rel="stylesheet"
        />
        <link
          href="/css/admin/vendor/fontawesome/css/all.min.css"
          rel="stylesheet"
          type="text/css"
        />
        <link href="/css/admin/css/sb-admin-2.min.css" rel="stylesheet" />
        <link href="/css/admin/css/style.css" rel="stylesheet" />
        <link
          rel="stylesheet"
          href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css"
        />
        <link rel="stylesheet" href="/public/lib/jquery/jquery-ui.min.css" />
        <link
          href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.css"
          rel="stylesheet"
        />
      </Helmet>

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
