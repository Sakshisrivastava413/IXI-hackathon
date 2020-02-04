import React from 'react';
import Card from './components/Card';
import data from './data';

export default function SubCourseList({ location: { state: { courseId } }, history }) {
	const courses = data.courses[courseId].subCourses;
	const onClick = (i) => {
		history.push({ pathname: '/quiz', state: { courseId, subCourseId: i } });
	};
	return (
		<div>
			{courses.map((info, i) => (
				<Card key={i} {...info} onClick={() => onClick(i)} />
			))}
		</div>
	);
}