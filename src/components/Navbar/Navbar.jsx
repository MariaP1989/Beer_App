import React from 'react';
import	{	Link }	from	'react-router-dom';
import './navbar.css';

const Navbar = () => (
    <div className='navbar'>
        <Link to='/search'>
            <div className='navbar__icon-dinner'></div>
        </Link>
        <div className='navbar__logo'>
            <div className='logo__text'>
                <span>{'BE'}</span>
                <span>{'ER'}</span>
                <span>{'GU'}</span>
                <span>{'RU'}</span>
            </div>
        </div>
    </div>
);

export default Navbar;
