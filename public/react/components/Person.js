import React from 'react';

export const Person = (props) => {

  return <>
    <h3>{props.Person.name}</h3>
    <img src={props.Person.image} alt={props.Person.name} />
  </>
} 
	