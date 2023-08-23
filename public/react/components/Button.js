import React, { useState, useEffect } from 'react';
import { PeopleList } from './PeopleList';
import apiURL from '../api';
import { Button } from './Button';

export const Button = () => {

    const [isFormVisible, setIsFormVisible] = useState(false);

    function handleClick() {
        setIsFormVisible(!isFormVisible);
    }

    return (
        <div className = "button">
            <h5 className = "button-title">

            </h5>
            <button onClick={handleClick}> add member
            </button>
            {isFormVisible && (
                <form>
                    <p>
                        <label htmlFor='name' >
                            Name
                        </label>
                        <br/>
                        <input id="name" type="text"/>
                    </p>
                    <p>
                        <label>
                            
                        </label>
                    </p>
                    <p>
                        <button>Submit</button>
                    </p>
                </form>
            )}
        </div>
    );

};

// export default Button;


