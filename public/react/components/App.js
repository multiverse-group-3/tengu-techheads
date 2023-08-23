import React, { useState, useEffect } from 'react';
import { PeopleList } from './PeopleList';
import { Button } from './Button';

// import and prepend the api url to any fetch calls
import apiURL from '../api';

export const App = () => {

	const [people, setPeople] = useState([]);
	let filters = {
		all: () => {
			return true;
		}, 
		students: 
			student => student.role === "Student",
		coaches:
			coach => coach.role === "Coach"
	};

	const [activeFilter, setActiveFilter] = useState("all");
	const filteredPeople = people.filter(filters[activeFilter]);

	async function fetchPeople(){
		try {
			const response = await fetch(`${apiURL}/people`);
			const peopleData = await response.json();
			
			setPeople(peopleData);
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}

	async function showStudents(event) {
		setActiveFilter("students");
	}

	async function showCoaches(event) {
		setActiveFilter("coaches")
	}

	async function showAll(event) {
		setActiveFilter("all")
	}

	useEffect(() => {
		fetchPeople();
	}, []);

	return (
		<main>	
			<Button>Add cohort member</Button>
			<h2>All the things 🔥</h2>
			<button onClick={showStudents}>Students</button>
			<button onClick={showCoaches}>Coaches</button>
			<button onClick={showAll}>All</button>
			<PeopleList people={filteredPeople} />
		</main>
	)
}