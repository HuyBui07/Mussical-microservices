import PropTypes from 'prop-types';
import { ReactNode } from 'react';

function DefaultLayout({ children }: { children: ReactNode }) {
    return (  
        <div>
            <div>{children}</div> 
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
