import React from 'react';
import QuizQuestion from './components/Question';
// import data from './data.json';
import { AdaptiveTestEngine } from './quiz-engine';

export default function SelfAnalysis({ location: { state: { courseId, subCourseId } } }) {
	const engine = new AdaptiveTestEngine(courseId, subCourseId);
	const { question, currentTopic } = engine.getCurrentQuestion();
	const onNext = (answerId) => {
		try {
			if (!engine.testEnded) {
				engine.submitAnswer(answerId);
			}
		} catch {
		}
	};
	console.log(question);
	return (
		<div>
			<QuizQuestion
				currentTopic={currentTopic}
				question={question.text}
				options={question.options}
			/>
		</div>
	)
}