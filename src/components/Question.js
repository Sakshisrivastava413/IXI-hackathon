import React, { useState } from 'react';
import Options from './Options';

const Question = ({ currentTopic, question, options = [], nextButtonLoading, onNextClick }) => {

	const [selected, setSelected] = useState(null);
	React.useEffect(() => {
		setSelected(null);
	}, [question]);

	return (
		<div className="modal is-active">
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
					<button 
						className={`button is-primary is-large is-rounded next-button ${nextButtonLoading && 'is-loading'}`}
						onClick={() => onNextClick(selected)}
					>
						Next
					</button>
				</div>
		</div>
	);
}

export default Question;
