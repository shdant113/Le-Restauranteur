import React from 'react';

const Results = (props) => {
	const modalClass = props.show ? "results-modal" : "results-modal display-none"
	console.log(props.restaurants)
	const randomIndex = parseInt(Math.random() * 20)
	console.log(randomIndex)
	const getRestaurants = props.restaurants.results.map((restaurants, i) => {
		if (i == randomIndex) {
			return (
				<li className="results-text" key={i}>
					{restaurants.name}
					<br />
					{restaurants.formatted_address}
					<hr />
				</li>
			)
		}
	})
	const randomRestaurant = getRestaurants[randomIndex];
	return (
		<div className={modalClass}>
			<section className="results-modal-main">
				<ul>
					{randomRestaurant}
				</ul>
				<button className="results-modal-button" onClick={props.hide}>Search For Something Else</button>
				<button className="results-modal-button" onClick={props.search}>Pick Another Restaurant</button>
				<br />
				<button className="results-modal-button" onClick={props.saveRestaurant.bind(null, getRestaurants[randomIndex])}>Save This Restaurant</button>
			</section>
		</div>
	)
}

export default Results;