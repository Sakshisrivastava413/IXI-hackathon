const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require("child_process");
const path = require('path');
const fs = require('fs');

const app = express();

app.use(bodyParser.json());

function generate(fileNames) {
	return new Promise(resolve => {
		const videosList = fileNames.map(file => `file '../public/videos/${file}.mp4'`);
		const videoStrings = videosList.join('\n');
		fs.writeFileSync('./temp.txt', videoStrings);
		exec(`ffmpeg -f concat -safe 0 -i ${path.join(__dirname, 'temp.txt')} -c copy course.mp4`, (error, result) => {
				if (error) return resolve(false);
				return resolve(true);
			});
	});
}

app.post('/generate-video-content', (req, res) => {
	const { files } = req.body;
	generate(files).then(done => {
		res.json({ done });
	});
});

generate();

app.listen(5000, () => console.log('Started on PORT 5000.'));