import React from 'react';

const Results = (props) => {
	const modalClass = props.show ? "modal" : "modal display-none"
	console.log(props.restaurants)
	const getRestaurants = props.restaurants.map((restaurants, i) => {
		return (
			<li key={i} style={{listStyleType: "none"}}>
				Name: {restaurants.name}
				<br />
				Address: {restaurants.address}
				<br />
				City: {restaurants.city}
				<br />
				State: {restaurants.state}
				<hr />
			</li>
		)
	})
	return (
		<div className={modalClass}>
			<section className="modal-main">
				<ul style={{padding: 0}}>
					{getRestaurants}
				</ul>
				<button onClick={props.hide}>Close This Modal</button>
			</section>
		</div>
	)
}

export default Results;