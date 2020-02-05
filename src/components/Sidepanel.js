import { UnControlled as CodeMirror } from 'react-codemirror2';
import React, {useState} from 'react';

require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/theme/neat.css');
require('codemirror/mode/javascript/javascript.js');


const Sidepanel = ({ question, title, show }) => {

	const value = "import React from 'react'; \n \n class Counter from React.Component { \n \n constructor(props) { \n  super(props); \n  this.state = { counter: 0 }; \n } \n \n // implement your code here \n increment() { \n \n } \n \n decrement() { \n \n } \n \n render() { \n  return ( \n   <div> \n    <h2>It is { this.state.counter }.</h2> \n   </div> \n  ); \n } \n \n }";
	const options = {
		mode: 'javascript',
		theme: 'material',
		lineNumbers: true
	};
	const [l,m] = useState(0);

	const showVideo = () => {
		m(0);
	};

	const sendCode = (code) => {
		fetch('http://localhost:5000/verify-code', { code }).then(res => res.json())
		.then(res => console.log(res));
	}

	return (
		<aside className={show ? "menu sidepanel panel-show" : "menu sidepanel panel-hide"}>
			<div className="flex">
				<div className="tal">
					<p className="is-size-3 wht">
						{title}
					</p>
					<p className="is-size-6 gry">
						Re-evaluate your skills
  		</p>
					<p className="is-size-4 wht">
						Q: {question}
					</p>
					<button onClick={() => m(1)} className="mt1 button is-medium is-primary" >Submit</button>
				</div>
				<div className="w75">
					<CodeMirror
						value={value}
						options={options}
						onChange={editor => {
							const code = editor.getValue('\n');
							sendCode(code);
						}}
					/>
					{l ?
					(<div className="notification is-danger w50 flxxx">
						Your answer is incorrect. Do you want to practice?
						<button className="button is-small is-primary" onClick={showVideo}>YES</button>
					</div>) : ''}
				</div>
			</div>
		</aside>
	)
}

export default Sidepanel;