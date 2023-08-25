import React, { useState, useEffect } from 'react';
import { PeopleList } from './PeopleList';
import apiURL from '../api';

export const UpdatePerson = (props) => {

    const [isFormVisible, setIsFormVisible] = useState(false);
    const [updateMember, setUpdateMember] = useState({
        name: props.person.name,
        company: props.person.company,
        role: props.person.role,
        image: props.person.image,
        quote: props.person.quote,
        pokemon: props.person.pokemon,
        fact: props.person.fact,
    });

    function handleClick() {
        setIsFormVisible(!isFormVisible);
    };

    function handleChange(event) {
        const id = event.target.id
        console.log("I'm changing something: " + event.target.value)
        setUpdateMember({
            ...updateMember, 
            [id]:event.target.value,
        })
    };

    async function handleSubmit(event) {
        event.preventDefault();
        const res = await fetch(`${apiURL}/people/${props.person.id}`, {
            method: "PATCH",
            headers: {"content-type": "application/JSON"},
            body: JSON.stringify(updateMember)
        })
        if (res.ok) {
            const person = await res.json()
            console.log("Success: " + person)
        }
    };

    return (
        <div className = "button">
            <h5 className = "button-title">

            </h5>
            <button onClick={handleClick}>Update member
            </button>
            {isFormVisible && (
                <form onSubmit={handleSubmit}>
                    <p>
                        <label htmlFor='name' >
                            Name
                        </label>
                        <br/>
                        <input id="name" type="text" value={updateMember.name} onChange={handleChange}/>
                    </p>
                    <p>
                        <label htmlFor='company'>
                            Company name
                        </label>
                        <br/>
                        <input id="company" type="text" value={updateMember.company} onChange={handleChange}/>
                    </p>
                    <p>
                        <label htmlFor='role'>
                            Title
                        </label>
                        <br/>
                        <select className="target" id="role" onChange={handleChange} value={updateMember.role}> 
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
                        <input id="image" type="text" value={updateMember.image} onChange={handleChange}/>
                    </p>
                    <p>
                        <button>Submit</button>
                    </p>
                </form>
            )}
        </div>
    );

};



