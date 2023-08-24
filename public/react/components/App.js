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


	function deleteButton(id) {
		return fetch(`${apiURL}/people/${id}`, {
		  method: 'delete'
		})
		.then(response => {
			if (response.ok) {
				const updatedPeople = people.filter(person => person.id !== id)
				setPeople(updatedPeople);
			}
		});
	}

	if(person){
		return (
			<main>
				<h1>The Tengu Techheads</h1>
				<navbar>
					<div id="update">
						<button onClick={() => { deleteButton(person.id); setPerson(null) }}>Delete person</button>
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