import React from 'react';
import '../Main/index.css';

const Results = (props) => {
	const modalClass = props.show ? "main-form" : "main-form display-none"
	const randomIndex = parseInt(Math.random() * props.restaurants.results.length)
	const randomRestaurant = props.restaurants.results[randomIndex]
	const restaurant = (
		<li className="main-form-text results-text">
			{randomRestaurant.name}
			<br />
			{randomRestaurant.formatted_address}
			<hr />
		</li>		
	)
	return (
		<div className={modalClass}>
			<ul>
				{restaurant}
			</ul>
			<button className="results-modal-button" onClick={props.hide}>Search For Something Else</button>
			<button className="results-modal-button" onClick={props.pickAnother}>Pick Another Restaurant</button>
			<br />
			<button className="results-modal-button" onClick={props.saveRestaurant.bind(null, randomRestaurant)}>Save This Restaurant</button>
		</div>
	)
}

export default Results;