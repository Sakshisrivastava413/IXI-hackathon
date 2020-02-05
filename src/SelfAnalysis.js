import React from 'react';
import QuizQuestion from './components/Question';
// import data from './data.json';
import { AdaptiveTestEngine } from './quiz-engine';

export default function SelfAnalysis({ location: { state: { courseId, subCourseId } }, history }) {
	const [engine] = React.useState(new AdaptiveTestEngine(courseId, subCourseId));
	const [state, setState] = React.useState({
		question: (engine.getCurrentQuestion() || {}).question,
		currentTopic: (engine.getCurrentQuestion() || {}).currentTopic,
		nextButtonLoading: false,
		generatingCourseContent: false,
	});
	const onNext = (answerId) => {
		try {
			engine.submitAnswer(answerId);
			setState({ ...state, nextButtonLoading: true });
			setTimeout(() => {
				if (!engine.testEnded) {
					const newQuestion = engine.getCurrentQuestion();
					setState({
						question: newQuestion.question,
						currentTopic: newQuestion.currentTopic,
						nextButtonLoading: false,
					});
				} else {
					// test end logic
					const result = engine.getResult();
					setState({ generatingCourseContent: true });
					setTimeout(() => {
						fetch('http://localhost:5000/generate-video-content', {
							method: 'POST',
							body: {
								files: [
									"abcd",
									"asomerosindo"
								]
							}
						}).then(res => res.json())
							.then(({ durations }) => {
								console.log({
									courseId,
									subCourseId,
									durations,
									result,
								});
								history.push({
									pathname: 'personalised-content',
									state: {
										courseId,
										subCourseId,
										durations,
										result,
									},
								});
							});
					}, 1000);
				}
			}, 400);
		} catch (error) {
			console.error(error);
		}
	};

	if (state.generatingCourseContent) return (
		<div className="card-list" style={{ display: 'flex', justifyContent: 'center' }}>
			<p className="is-size-3 mb-1">Generating your customized course content...</p>
			<progress className="progress is-large is-info generating-content-progress" max="100">60%</progress>
		</div>
	);

	return (
		<div>
			<QuizQuestion
				currentTopic={state.currentTopic}
				question={state.question.text}
				options={state.question.options}
				onNextClick={onNext}
				nextButtonLoading={state.nextButtonLoading}
			/>
		</div>
	)
}