import React, { useState } from 'react';
import Options from './Options';

const Question = ({ currentTopic, question, options = [] }) => {

	const [modalStatus, toggleModal] = useState(1);
	const [selected, setSelected] = useState(null);

	return (
		<div className={modalStatus ? "modal is-active" : "modal"}>
			{/*<button
				className="modal-close is-large"
				aria-label="close"
				onClick={() => toggleModal(!toggleModal)}
			></button>*/}
			<div className="modal-content">
				<p className="is-size-3 mb-1 topic-heading">{currentTopic}</p>
				<p className="is-size-3 mb-1" style={{ textAlign: 'left' }}>{question}</p>
				{options.map((option, i) => (
					<Options
						key={i}
						option={option}
						selected={selected === i}
						onClick={() => setSelected(i)}
					/>))}
					<button class="button is-primary is-large is-rounded next-button">
						Next
						<i></i>
					</button>
				</div>
		</div>
	);
}

export default Question;
