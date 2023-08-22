import React, { useState, useEffect } from 'react';
import { PeopleList } from './PeopleList';
import { Button } from './Button';

// import and prepend the api url to any fetch calls
import apiURL from '../api';

export const App = () => {

	const [people, setPeople] = useState([]);

	async function fetchPeople(){
		try {
			const response = await fetch(`${apiURL}/people`);
			const peopleData = await response.json();
			
			setPeople(peopleData);
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}

	useEffect(() => {
		fetchPeople();
	}, []);

	return (
		<main>	
			<h1>Person Store</h1>
			<h2>All things 🔥</h2>
			<PeopleList people={people} />
			<Button>Add cohort member</Button>
		</main>
	)
}