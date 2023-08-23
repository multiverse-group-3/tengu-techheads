import React from 'react';

export const Person = (props) => {

  return <>
  <div>
    <h3>{props.person.name}</h3>
    <p>{props.person.company}</p>
    <p>{props.person.role}</p>
    <img src={props.person.image} width="200" height="200" />
  </div>
  </>
} 
	