import React, { useState } from 'react';
import Options from './Options';

const Question = ({ question, options = [] }) => {

	const [modalStatus, toggleModal] = useState(1);
	const [selected, setSelected] = useState(0);

	return (
		<div className={modalStatus ? "modal is-active" : "modal"}>
			<div className="modal-background"></div>
			<button
				className="modal-close is-large"
				aria-label="close"
				onClick={() => toggleModal(!toggleModal)}
			></button>
			<div className="modal-content">
				<p className="is-size-3 mb-1">{question}</p>
				{options.map((option, i) => (
					<Options
						option={option}
						selected={selected === i}
						onClick={() => {}}
					/>))}
			</div>
		</div>
	);
}

export default Question;
