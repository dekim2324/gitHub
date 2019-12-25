import React from 'react';
import PropTypes from 'prop-types';

const Navbar = ({ title }) => {
        return (
            <nav className='navbar bg-primary'>
                {title}
            </nav>
        )
}

Navbar.defaultProps = {
    title: 'Github Finder'
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired
}

export default Navbar
