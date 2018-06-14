import React from 'react';
import './searchBox.css';

const SearchBox = ({className, onChangeHandler, spinnerType}) => (
    <div>
        <div className={className}>
            <p>{'Enter your favorite '}<b>{'ingredient '}</b>{'or '}<b>{'dish '}</b>{'and find the best beer that suits your meal. '}</p>
            <div className='ingredient'>
                <input type='text' onChange={onChangeHandler} placeholder=' e.g. pad thai, salmon, cheese ... '></input>
                <button onClick={spinnerType}></button>
            </div>
        </div>
    </div>
);

export default SearchBox;
