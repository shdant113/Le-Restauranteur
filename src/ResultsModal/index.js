import React from 'react';

const Modal = (props) => {
	const modalClass = props.show ? "modal" : "modal display-none"
	return (
		<div className={modalClass}>
			<section className="modal-main">
				<h1>THIS IS A MODAL</h1>
				<button onClick={props.hide}>Close This Modal</button>
			</section>
		</div>
	)
}

export default Modal;