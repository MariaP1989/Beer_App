import React from 'react';
import './spinner.css';

const Spinner = ({className}) => (
    <div className={className}>
        <p>{'Beer loading ...'}</p>
        <div></div>
    </div>
);

export default Spinner;
