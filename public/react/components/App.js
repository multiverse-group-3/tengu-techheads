import React, { useState, useEffect } from 'react';
import { PeopleList } from './PeopleList';
import { Button } from './Button';

// import and prepend the api url to any fetch calls
import apiURL from '../api';
import { Person } from './Person';

export const App = () => {

	let filters = {
		all: () => {
			return true;
		}, 
		students: 
			student => student.role === "Student",
		coaches:
			coach => coach.role === "Coach"
	};
	const [people, setPeople] = useState([]);
	const [activeFilter, setActiveFilter] = useState("all");
	const [person,setPerson] = useState(null)
	const filteredPeople = people.filter(filters[activeFilter]);
	let showPerson = false;

	async function fetchPeople(){
		try {
			const response = await fetch(`${apiURL}/people`);
			const peopleData = await response.json();
			
			setPeople(peopleData);
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}

	async function fetchPerson (id){
	  console.log("I have been summoned")
		try {
			const response = await fetch(`${apiURL}/people/${id}`);
			const personData = await response.json();
			console.log(personData)
			setPerson(personData);
			showPerson = true;
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
		setPerson(false)
	}

	useEffect(() => {
		fetchPeople();
	}, []);

	if(person){
		return (
			<main>
				<button onClick={showAll}>All</button>
				<div id="person">
					<img src={person.image} width="200" height="200" />
					<h3>{person.name}</h3>
					<p>{person.company}</p>
					<p>{person.role}</p>
				</div>
			</main>
		)
	}
	return (
		<main>	
			<Button>Add cohort member</Button>
			<h2>All the things 🔥 woop woop!</h2>
			<button onClick={showStudents}>Students</button>
			<button onClick={showCoaches}>Coaches</button>
			<button onClick={showAll}>All</button>
			<PeopleList people={filteredPeople} fetchPerson={fetchPerson} />
		</main>
	)
}