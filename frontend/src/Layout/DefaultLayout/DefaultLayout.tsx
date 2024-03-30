import PropTypes from "prop-types";
import { ReactNode } from "react";
import SideBar from "../../Components/SideBar";
import { useState } from "react";
function DefaultLayout({ children }: { children: ReactNode }) {
  const [currentTab, setCurrentTab] = useState(children);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-grow">
        <div className="w-1/5">
          <SideBar setTab={setCurrentTab} />
        </div>
        <div className="flex-grow w-4/5">{currentTab}</div>
      </div>
    </div>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
