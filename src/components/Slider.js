import React from 'react';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';
import playButton from '../assets/play.svg';
import pauseButton from '../assets/pause.svg';

const SliderWithTooltip = createSliderWithTooltip(Slider);

export default function VideoSlider({
	playing,
	durations,
	totalDuration,
	toggleVideo,
	currentDuration,
	updateVideoTime,
}) {
	const videoAction = () => {
		if (toggleVideo) toggleVideo();
	};

	console.log(durations.length);

	return (
		<div className="slider-container-bottom main-container-bottom m-abs-bottom">
			<div className="play">
				<button type="button" className="button-img-container" onClick={videoAction}>
					<img className="play-pause-btn" alt="PlayPauseButton" src={playing ? pauseButton : playButton} />
				</button>
				<SliderWithTooltip
					allowCross={false}
					trackStyle={[{ backgroundColor: '#D6D6D6' }]}
					min={0}
					max={Math.ceil(totalDuration)}
					count={durations.length}
					defaultValue={currentDuration}
					value={currentDuration}
					onChange={updateVideoTime}
					tipFormatter={() => {
						const min = Math.floor(currentDuration / 60);
						const seconds = Math.floor(currentDuration % 60);
						return `${min}:${seconds}`;
					}}
					handleStyle={[
						{
							backgroundColor: 'rgba(54,112,255,1)',
							borderRadius: '0',
							border: '0',
							width: '8px',
							padding: '0',
						}
					]}
					activeHandleStyle={[
						{
							background: 'green',
						},
					]}
					dots
					railStyle={{ backgroundColor: '#363636' }}
					range={false}
				/>
			</div>
		</div>
	)
}