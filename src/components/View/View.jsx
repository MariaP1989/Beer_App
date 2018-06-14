import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '../../components/Navbar/Navbar';

const View = (props) => (
    <div>
        <Navbar />
        {props.children}
    </div>
);

View.propTypes = {
    children: PropTypes.node
};

export default View;
