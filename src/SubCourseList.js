import React from 'react';
import Card from './components/Card';
import data from './data';

export default function SubCourseList({ location: { state: { courseId } }, history }) {
	const courses = data.courses[courseId];
	const onClick = (i) => {
		history.push({ pathname: '/quiz', state: { courseId, subCourseId: i } });
	};
	return (
		<div>
			<p className="mb-1 topic-heading courses-heading">Sub Courses - {courses.name}</p>
			{courses.subCourses.map((info, i) => (
				<Card key={i} {...info} onClick={() => onClick(i)} />
			))}
		</div>
	);
}