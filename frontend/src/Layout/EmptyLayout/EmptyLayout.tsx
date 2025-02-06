import PropTypes from 'prop-types';
import { ReactNode } from 'react';

function EmptyLayout({ children }: { children: ReactNode }) {
    return (  
        <div>
            <div>{children}</div> 
        </div>
    );
}

EmptyLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default EmptyLayout;
