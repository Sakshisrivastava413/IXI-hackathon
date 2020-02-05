import { UnControlled as CodeMirror } from 'react-codemirror2';
import React from 'react';

require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/theme/neat.css');
require('codemirror/mode/javascript/javascript.js');


const Sidepanel = ({ question, title, show }) => {

		const value = "import React from 'react'; \n \n class Counter from React.Component { \n \n constructor(props) { \n  super(props); \n  this.state = { counter: 0 }; \n } \n \n render() { \n  return ( \n   <div> \n    <h2>It is { this.state.counter }.</h2> \n   </div> \n  ); \n } \n \n increment // implement your code here \n \n }";
	const options = {
		mode: 'javascript',
		theme: 'material',
		lineNumbers: true
	};

	return (
		<aside className={show ? "menu sidepanel panel-show" : "menu sidepanel panel-hide"}>
			<div className="flex">
			<div className="tal">
			<p className="is-size-3 wht">
				{ title }
  		</p>
			<p className="is-size-6 gry">
				Re-evaluate your skills
  		</p>
			<p className="is-size-4 wht">
				Q: { question }
  		</p>
			</div>
			<CodeMirror
				value={value}
				options={options}
				onChange={(editor, value) => {
					// console.log('uncontrolled', { value });
				}}
			/>
			</div>
		</aside>
	)
}

export default Sidepanel;