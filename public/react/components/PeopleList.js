import React from 'react';
import { Person } from './Person';

export const PeopleList = ({people}) => {
	return <>
		{
			people.map((person, idx) => {
				return <person person={person} key={idx} />
			})
		}
	</>
} 
