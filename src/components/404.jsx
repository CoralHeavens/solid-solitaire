import React from "react";

const error = '404 Page Not Found';
const message = 'Please, use navigation in app instead of manual <3';

const returnMessage = 'Go back to catalogue';

const NotFound = () => (
    <div className='text-center'>
        <div className="glitch w-fit mx-auto text-5xl font-bold leading-[60px] mb-10" title={error}>{error}</div>
        <div className='mb-14'>
            {message}
        </div>
        <a href='/' className='px-8 py-5 border-ghost'>
            {returnMessage}
        </a>
    </div>
)

export default NotFound;