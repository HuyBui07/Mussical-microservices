import PropTypes from "prop-types";
import { ReactNode } from "react";
import AdminSideBar from "../../Components/AdminSidebar";

function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-grow">
        <div className="w-1/5">
          <AdminSideBar />
        </div>
        <div className="flex-grow">
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;
