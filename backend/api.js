const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require("child_process");
const path = require('path');
const fs = require('fs');

const app = express();

app.use(bodyParser.json());

console.log(__dirname);

function generate() {
	const videosList = ["file '../public/videos/b2.mp4'", "file '../public/videos/a2.mp4'"]
	const videoStrings = videosList.join('\n');
	fs.writeFileSync('./temp.txt', videoStrings);
	exec(`ffmpeg -f concat -safe 0 -i ${path.join(__dirname, 'temp.txt')} -c copy course.mp4`, (error, result) => {
			if (error) return console.log(error);
			console.log(result);
		});
}

app.post('/generate-video-content', (req, res) => {
	generate();
});

generate();

app.listen(5000, () => console.log('Started on PORT 5000.'));