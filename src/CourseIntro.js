import React from 'react';
import data from './data.json';

export default function CourseIntro({ location: { state: { courseId, subCourseId } }, history }) {
	const course = data.courses[courseId].subCourses[subCourseId];
	const [loading, setLoading] = React.useState(false);
	const onSubmit = (i) => {
		setLoading(true);
		setTimeout(() => {
			history.push({ pathname: '/quiz', state: { courseId, subCourseId } });
		}, 1000);
	};
	return (
		<div>
			<p className="mb-1 topic-heading courses-heading">
				<img src={course.pic} alt="Course" width={50} style={{ marginRight: 20 }} />
				{course.name}
			</p>
			<div style={{ textAlign: 'left', marginLeft: 50 }}>
				<ul>
					{course.topics.map(topic => (
						<li key={topic} style={{ fontSize: 36, fontWeight: 200 }}>{`- ${topic}`}</li>
					))}
				</ul>
			</div>
			<div style={{ textAlign: 'left', marginTop: 40, marginLeft: 60 }}>
				<p className="is-size-5" style={{ marginBottom: 20 }}>To create your personalized course content, participate in our test when you're ready...</p>
				<button
					className={`button is-primary is-size-3 ${loading && 'is-loading'}`}
					onClick={onSubmit}
				>
					Start Test
				</button>
			</div>
		</div>
	);
}