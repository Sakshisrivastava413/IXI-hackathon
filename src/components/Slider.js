import React, { useState } from 'react';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import playButton from '../assets/play.svg';
import pauseButton from '../assets/pause.svg';
import p5 from 'p5';
import 'p5/lib/addons/p5.sound';
import '../App.css';

export default function VideoSlider() {

	const [isPlayButtonActive, changeVideoAction] = useState(true);
	const [voiceCounter, setVoiceCounter] = useState(0);
	const [ampInterval, setAmpInterval] = useState(() => {});

	const videoAction = () => {
		changeVideoAction(!isPlayButtonActive);
		toggleNoise();
	}

	const toggleNoise = () => {
		const mic = new p5.AudioIn();
		if (ampInterval) {
			setAmpInterval(() => {});
			mic.stop();
			return clearInterval(ampInterval);
		}
		mic.start();
		const amplitudeInstance = new p5.Amplitude();
		amplitudeInstance.setInput(mic);

		let lastAmpVal = 0;
		const temp = setInterval(() => {
			const amplitude = Math.ceil(amplitudeInstance.getLevel() * 100);
			if (amplitude - lastAmpVal > 3) setVoiceCounter(voiceCounter + 1);
			console.log(amplitude, lastAmpVal)
			if (voiceCounter < 4 && voiceCounter >= 2) handleAmplitude("Very Noisy");
			else if (voiceCounter >= 4) handleAmplitude("Little Noisy");
			else handleAmplitude("Slient");


			lastAmpVal = amplitude;
		}, 100);
		setAmpInterval(temp);
	}

	const handleAmplitude = (res) => {
		// if (res == 0 && isNotificationShown) {
		// 	alert('helo');
		// 	setShown(false);
		// }
		console.log(res)
	}

	return (
		<div className="slider-container-bottom main-container-bottom m-abs-bottom">
			<div className="play">
				<button type="button" className="button-img-container" onClick={videoAction}>
					<img className="play-pause-btn" alt="PlayPauseButton" src={isPlayButtonActive ? playButton : pauseButton} />
				</button>
				<Range
					allowCross={false}
					pushable={false}
					trackStyle={[{ backgroundColor: '#D6D6D6' }]}
					handleStyle={[
						{
							backgroundColor: 'rgba(54,112,255,1)',
							borderRadius: '0',
							border: '0',
							width: '8px',
							padding: '0',
						},
						{
							backgroundColor: 'rgba(54,112,255,1)',
							borderRadius: '0',
							border: '0',
							width: '8px',
							padding: '0',
						}]}
					activeHandleStyle={[{
						background: 'green',
					},
					]}
					railStyle={{ backgroundColor: '#363636' }}
				/>
			</div>
		</div>
	)
}