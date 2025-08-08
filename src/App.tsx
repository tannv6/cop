import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminLayout from "./components/layout/AdminLayout";
import AdminSettingsForm from "./components/admin/AdminSettingsForm";
import AdminPolicyForm from "./components/admin/AdminPolicyForm";
import AdminConsentForm from "./components/admin/AdminConsentForm";
import InquiryListForm from "./components/admin/InquiryListForm";
import InquiryWriteForm from "./components/admin/InquiryWriteForm";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RequireAuth from "./components/RequireAuth";
import CommonMetaHead from "./components/CommonMetaHead";
import "./i18n";
import AdminMasterPage from "./pages/AdmMaster";

const App: React.FC = () => {
  return (
    <>
      <CommonMetaHead />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/AdmMaster" element={<AdminMasterPage/>} />
        <Route
          path="/AdmMaster/*"
          element={
            <RequireAuth>
              <AdminLayout />
            </RequireAuth>
          }
        >
          <Route path="settings" element={<AdminSettingsForm />} />
          <Route path="policy" element={<AdminPolicyForm />} />
          <Route path="consent" element={<AdminConsentForm />} />
          <Route path="inquiries/list" element={<InquiryListForm />} />
          <Route path="inquiries/write" element={<InquiryWriteForm />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
