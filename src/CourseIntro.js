import React from 'react';
import data from './data.json';

export default function CourseIntro({ location: { state: { courseId, subCourseId } }, history }) {
	const course = data.courses[courseId].subCourses[subCourseId];
	const onSubmit = (i) => {
		history.push({ pathname: '/quiz', state: { courseId, subCourseId } });
	};
	return (
		<div>
			<p className="mb-1 topic-heading courses-heading">
				<img src={course.pic} alt="Course" width={50} style={{ marginRight: 20 }} />
				{course.name}
			</p>
		</div>
	);
}