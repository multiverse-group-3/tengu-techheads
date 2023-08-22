import React, { useState, useEffect } from 'react';
import { PeopleList } from './PeopleList';
import apiURL from '../api';

export const Button = () => {

    const [button, setButton] = useState(0);

    function handleClick() {
        setButton(count + 1);
    }

    return (
        <div className = "button">
            <h5 className = "button-title">

            </h5>
            <button onClick={handleClick}> add member
            </button>
        </div>
    );

};

// export default Button;


