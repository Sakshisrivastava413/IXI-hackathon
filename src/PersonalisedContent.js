import React from 'react';
import './App.css';
import VideoSlider from './components/Slider';

export default function PersonalisedContent() {
	return (
		<div className="video-container">
			<video width="1024">
				<source src="videos/fake.mov" />
			</video>
			<VideoSlider />
		</div>
	)
}