import PropTypes from "prop-types";
import { ReactNode } from "react";
import SideBar from "../../Components/SideBar";

function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-grow">
        <div className="w-1/5">
          <SideBar />
        </div>
        <div className="flex-grow w-4/5">
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
