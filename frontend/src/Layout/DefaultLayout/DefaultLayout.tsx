import PropTypes from 'prop-types';
import { ReactNode } from 'react';
import SideBar from '../../Components/SideBar';

function DefaultLayout({ children }: { children: ReactNode }) {
    return (  
        <div className="flex flex-col h-screen">
            <div className="flex flex-grow">
                <SideBar />
                <div className="flex-grow ">{children}</div>
            </div>
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
