import React from 'react';

const Modal = (props) => {
	const modalClass = show ? "modal display-block" : "modal display-none"
	return (
		<div className={modalClass}>
			<section className="modal-main">
				{children}
				<button onClick={this.props.closeModal}>Close This Modal</button>
			</section>
		</div>
	)
}

export default Modal;