const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require("child_process");
const cors = require('cors');
const { getVideoDurationInSeconds } = require('get-video-duration')
const path = require('path');
const fs = require('fs');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const filesMap = {
	REACT: {
		files: [
			'Introduction.mp4',
			'Components.mp4',
			'State.mp4',
			'Props.mp4',
		]
	}
};

function generate(fileNames) {
	return new Promise(resolve => {
		const videosList = fileNames.map(file => `file '../public/videos/${file}'`);
		const videoStrings = videosList.join('\n');
		fs.writeFileSync('./temp.txt', videoStrings);

		// calculate durations
		const durationPromises = fileNames.map(file => getVideoDurationInSeconds(path.join(__dirname, '../public/videos', file)));
		Promise.all(durationPromises).then(durations => {
			// merge videos
			resolve({ durations });
		// 	exec(`ffmpeg -f concat -safe 0 -i ${path.join(__dirname, 'temp.txt')} -c copy course.mp4`, (error, result) => {
		// 		if (error) return resolve({ error });
		// 		return resolve({ durations });
		// 	});
		});

	});
}

app.post('/generate-video-content', (req, res) => {
	const { subCourseId } = req.body;
	generate(filesMap.REACT.files).then(durations => {
		res.json({ durations });
	});
});

app.listen(5000, () => console.log('Started on PORT 5000.'));

// generate(filesMap.REACT.files).then(({ durations, error }) => {
// 	console.log(error);
// 	console.log(durations);
// });