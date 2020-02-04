const data = require('./data.json');

export class AdaptiveTestEngine {

	constructor(courseId, subCourseId) {
		const course = data.courses[courseId].subCourses[subCourseId];
		const { questions } = course;
		this.INCORRECT_THRESHOLD = 2;
		this.questions = questions;
		this.currentTopicId = 0;
		this.currentTopic = Object.keys(this.questions)[this.currentTopicId];
		this.currentQuestionId = 0;

		const questionScoreMap = Object.keys(this.questions).reduce((obj, ques) => ({
			...obj,
			[ques]: 0
		}), {});

		this.testEnded = false;
		this.currentTotalScore = 0;
		this.incorrects = { ...questionScoreMap };
		this.currentScoreMap = { ...questionScoreMap };
	}

	getCurrentQuestion() {
		if (this.testEnded) return;
		const question = this.questions[this.currentTopic][this.currentQuestionId];
		return { question, currentTopic: this.currentTopic };
	}

	goToNextQuestion(forceNextTopic = false) {
		if (this.testEnded) return;
		if (!forceNextTopic && this.questions[this.currentTopic][this.currentQuestionId + 1]) {
			// go to next question of current topic
			this.currentQuestionId++;
		} else {
			// all questions of current topic are attempted
			this.currentTopicId++;
			this.currentTopic = Object.keys(this.questions)[this.currentTopicId];
			if (!this.currentTopic) this.endTest();
			this.currentQuestionId = 0;
		}
	}

	endTest() {
		this.testEnded = true;
	}

	submitAnswer(answerId) {
		if (this.testEnded) throw new Error('Test is already ended!');
		const question = this.questions[this.currentTopic][this.currentQuestionId];
		let forceNextTopic = false;
		if (question.correct === answerId) {
			this.currentScoreMap[this.currentTopic] += question.weightage;
		} else {
			this.incorrects[this.currentTopic]++;
			if (this.incorrects[this.currentTopic] >= this.INCORRECT_THRESHOLD) {
				forceNextTopic = true;
			}
		}
		// console.log(this.currentTopic, this.currentQuestionId);
		this.goToNextQuestion(forceNextTopic);
	}

}

// TESTING CODE

// const adaptiveTest = new AdaptiveTest(0, 0);
// adaptiveTest.submitAnswer(0);
// adaptiveTest.getCurrentQuestion();
// adaptiveTest.submitAnswer(1);
// adaptiveTest.submitAnswer(0);
// adaptiveTest.submitAnswer(0);
// console.log(adaptiveTest.getCurrentQuestion());
// adaptiveTest.submitAnswer(2);
// adaptiveTest.submitAnswer(3);