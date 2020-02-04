import React from 'react';
import Card from './components/Card';
import data from './data';
import './App.css';

export default function CourseList({ history }) {
	const onClick = (courseId) => {
		history.push({ pathname: '/sub-courses', state: { courseId } });
	};
	return (
		<div className="card-list">
			{data.courses.map((info, i) => (
				<Card key={i} {...info} onClick={() => onClick(i)} />
			))}
		</div>
	);
}