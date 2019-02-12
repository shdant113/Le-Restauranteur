import React from 'react';

const Results = (props) => {
	const modalClass = props.show ? "modal" : "modal display-none"
	console.log(props.restaurants)
	const randomIndex = parseInt(Math.random() * 20)
	console.log(randomIndex)
	const getRestaurants = props.restaurants.results.map((restaurants, i) => {
		if (i == randomIndex) {
			return (
				<li className="results-text" key={i} style={{listStyleType: "none"}}>
					{restaurants.name}
					<br />
					{restaurants.formatted_address}
					<hr />
				</li>
			)
		}
	})
	return (
		<div className={modalClass}>
			<section className="modal-main">
				<ul style={{padding: 0}}>
					{getRestaurants}
				</ul>
				<button className="modal-button" onClick={props.hide}>Search Something Else</button>
				<button className="modal-button" onClick={props.search}>Pick Another Restaurant</button>
				<br />
				<button className="modal-button" onClick={props.saveRestaurant.bind(null, getRestaurants[randomIndex])}>Save This Restaurant</button>
			</section>
		</div>
	)
}

export default Results;