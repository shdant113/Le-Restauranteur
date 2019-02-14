import React from 'react';

const Results = (props) => {
	const modalClass = props.show ? "results-modal" : "results-modal display-none"
	const randomIndex = parseInt(Math.random() * props.restaurants.results.length)
	const randomRestaurant = props.restaurants.results[randomIndex]
	const restaurant = (
		<li className="results-text">
			{randomRestaurant.name}
			<br />
			{randomRestaurant.formatted_address}
			<hr />
		</li>		
	)
	return (
		<div className={modalClass}>
			<section className="results-modal-main">
				<ul>
					{restaurant}
				</ul>
				<button className="results-modal-button" onClick={props.hide}>Search For Something Else</button>
				<button className="results-modal-button" onClick={props.pickAnother}>Pick Another Restaurant</button>
				<br />
				<button className="results-modal-button" onClick={props.saveRestaurant.bind(null, randomRestaurant)}>Save This Restaurant</button>
			</section>
		</div>
	)
}

export default Results;