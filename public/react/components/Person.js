import React, { useState } from 'react';

// import and prepend the api url to any fetch calls
import apiURL from '../api';

export const Person = (props) => {
  return <>
    <div id="person">
      <img src={props.person.image} width="200" height="200" />
      {/** Fetching the URL to get individuals  */}
      <a href="#" onClick={() => {props.fetchPerson(props.person.id)}}><h3>{props.person.name}</h3></a>
      <p>{props.person.company}</p>
      <p>{props.person.role}</p>
    </div>
  </>
} 
	