import React, { useState } from 'react';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import playButton from '../assets/play.svg';
import pauseButton from '../assets/pause.svg';

export default function VideoSlider() {

	const [isPlayButtonActive, changeVideoAction] = useState(true);
	const videoAction = () => {
		changeVideoAction(!isPlayButtonActive);
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