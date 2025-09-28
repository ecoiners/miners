import React from 'react';

const Link = () => {
    const link = window.location.href;
    return (
        <div>
            <p className='w-40'>
                {link}
            </p>
        </div>
    );
};


export default Link;