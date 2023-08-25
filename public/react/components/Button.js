import React, { useState, useEffect } from 'react';
import { PeopleList } from './PeopleList';
import apiURL from '../api';
import { Button } from './Button';

export const Button = () => {

    const [isFormVisible, setIsFormVisible] = useState(false);
    const [newMember, setNewMember] = useState({
        name: "",
        company: "",
        role: "",
        image: "https://picsum.photos/200",
    });

    function handleClick() {
        setIsFormVisible(!isFormVisible);
    };

    function handleChange(event) {
        const id = event.target.id
        setNewMember({
            ...newMember, 
            [id]:event.target.value,
        })
    };

    async function handleSubmit(event) {
        event.preventDefault();
        const res = await fetch(`${apiURL}/people`, {
            method: "POST",
            headers: {"content-type": "application/JSON"},
            body: JSON.stringify(newMember)
        })
        if (res.ok) {
            const person = await res.json()
            console.log(person)
        }
    };

    return (
        <div className = "button">
            <h5 className = "button-title">

            </h5>
            <button onClick={handleClick}>Add member
            </button>
            {isFormVisible && (
                <form onSubmit={handleSubmit}>
                    <p>
                        <label htmlFor='name' >
                            Name
                        </label>
                        <br/>
                        <input id="name" type="text" value={newMember.name} onChange={handleChange}/>
                    </p>
                    <p>
                        <label htmlFor='company'>
                            Company name
                        </label>
                        <br/>
                        <input id="company" type="text" value={newMember.company} onChange={handleChange}/>
                    </p>
                    <p>
                        <label htmlFor='role'>
                            Role
                        </label>
                        <br/>
                        <select className="target" id="role" onChange={handleChange} value={newMember.role}> 
                            <option value="" >Please choose...</option>
                            <option value="student" > Student </option>
                            <option value="coach" > Coach </option>
                        </select>
                    </p>
                    <p>
                        <label htmlFor='image'>
                            Member picture
                        </label>
                        <br/>
                        <input id="image" type="text" value={newMember.image} onChange={handleChange}/>
                    </p>
                    <p>
                        <button>Submit</button>
                    </p>
                </form>
            )}
        </div>
    );

};



