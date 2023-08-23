import React from 'react';
import { Person } from './Person';

export const PeopleList = ({people, fetchPerson}) => {
	return <>
		{
			people.map((person, idx) => {
				return <Person person={person} key={idx} fetchPerson={fetchPerson}/>
			})
		}
	</>
} 
