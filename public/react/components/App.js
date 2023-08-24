import React, { useState, useEffect } from 'react';
import { PeopleList } from './PeopleList';
import { Button } from './Button';

// import and prepend the api url to any fetch calls
import apiURL from '../api';
import { Person } from './Person';
import { deleteButton } from './DeleteButton';

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


	// async function deleteButton () {
	//   console.log("I have been summoned")
	// 	try {
	// 		const response = await fetch(`${apiURL}/people/${id},` 
	// 			{method: 'DELETE'});
	// 		const personData = await response.json();
	// 		console.log(personData)
	// 		setPerson(personData);
	// 		showPerson = true;
	// 	} catch (err) {
	// 		console.log("Oh no an error! ", err)
	// 	}
	// }

	// const deleteMethod = {
	// 	method: 'DELETE', // Method itself
	// 	headers: {
	// 	 'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
	// 	},
	// 	// No need to have body, because we don't send nothing to the server.
	//    }
	//    // Make the HTTP Delete call using fetch api
	//    fetch(url, deleteMethod) 
	//    .then(response => response.json())
	//    .then(data => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
	//    .catch(err => console.log(err)) 
	// }

	function deleteButton(id) {
		return fetch(`${apiURL}/people/${id}`, {
		  method: 'delete'
		})
		.then(response => response.json());
	}

	if(person){
		return (
			<main>
				<h1>The Tengu Techheads</h1>
				<navbar>
					<div id="update">
						<button onClick={deleteButton}>Delete person</button>
					</div>
					<div id="filter">
						<button onClick={showAll}>All</button>
					</div>
				</navbar>
				<div id="person">
					<img src={person.image} width="200" height="200" />
					<h3>{person.name}</h3>
					<p>{person.company}</p>
					<p>{person.role}</p>
					<p>{person.quote}</p>
					<p>{person.pokemon}</p>
					<p>{person.fact}</p>
				</div>
			</main> 
		)
	}
	return (
		<main>	
			<h1>The Tengu Techheads</h1>
			<navbar>
					<div id="update">
						<Button>Add cohort member</Button>
					</div>
					<div id="filter">
						<button onClick={showStudents}>Students</button>
						<button onClick={showCoaches}>Coaches</button>
						<button onClick={showAll}>All</button>
					</div>
			</navbar>
			<div id="cards">
				<PeopleList people={filteredPeople} fetchPerson={fetchPerson} />
			</div>
		</main>
	)
}