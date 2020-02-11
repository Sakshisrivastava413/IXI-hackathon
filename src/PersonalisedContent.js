import React from 'react';
import './App.css';
import VideoSlider from './components/Slider';
import Sidepanel from './components/Sidepanel';

export default class PersonalisedContent extends React.Component {

	constructor(props) {
		super(props);
		const { courseId, subCourseId, durations, result } = {
			courseId: 0,
			subCourseId: 0,
			durations: [
				263, 484, 377, 331
			],
			result: {
				'Basics of React': 0.9,
				'Component': 0.3,
				'State': 0.3,
				'Props': 0.1
			}
		};

		let totalDuration = 0;
		const startDurations = durations.map(duration => {
			totalDuration += duration;
			return Math.floor(totalDuration);
		});

		this.state = {
			durations,
			result,
			courseId,
			subCourseId,
			playing: false,
			totalDuration: durations.reduce((d, c) => c + d, 0),
			disableIndices: Object.keys(result).map(topic => result[topic] >= 0.8),
			startDurations
		};

	}
	
	toggleVideo = () => {
		const video = document.querySelector('video');

		if (this.state.playing) {
			clearInterval(this.videoInterval);
			video.pause();
			this.setState({
				playing: false,
				currentDuration: video.currentTime 
			});
			return;
		}

		this.setState(
			{ playing: true },
			() => {
				if (this.state.playing) {
					video.ontimeupdate = () => {
						this.setState({ currentDuration: video.currentTime });
						let selfId;
						for (let i = 0; i < this.state.disableIndices.length; i++) {
							if (Math.floor(video.currentTime) < this.state.durations[i]) {
								selfId = i;
								break;
							}
						}
						// console.log(video.currentTime, this.state.startDurations[1]);
						if (video.currentTime > this.state.startDurations[1] && video.currentTime < this.state.startDurations[1] + 2) {
							// console.log('shown nigga');
							this.toggleVideo();
							video.ontimeupdate = () => {};
							this.setState({ showSidePanel: true });
						}
						if (this.state.disableIndices[selfId]) {
							selfId++;
							video.currentTime = this.state.startDurations[selfId - 1];
							// current portion should be disabled so play the next portion
							// let nextPos;
							// for (let i = selfId + 1; i < this.state.disableIndices.length; i++) {
							// 	if (!this.state.disableIndices[i]) {
							// 		nextPos = this.state.startDurations[i];
							// 		break;
							// 	}
							// }
							// if (nextPos) {
							// 	// if we found a next portion to be played
							// 	// console.log('found');
							// 	video.currentTime = nextPos;
							// }
						}
					};
					video.play();
				}
			}
		);
	}

	updateVideoTime = (duration) => {
		const video = document.querySelector('video');
		video.currentTime = duration;
	}

	onHover = (left, tooltipText) => {
		this.setState({ showHovered: true, tooltipLeft: left, tooltipText });
	}

	removeFocus = (left) => {
		this.setState({ showHovered: false, tooltipLeft: left });
	}

	render() {
		return (
			<div className="video-container">
				<Sidepanel
					show={this.state.showSidePanel}
					toggleVideo={() => {
						this.setState({ showSidePanel: false })
						const video = document.querySelector('video');
						video.currentTime = this.state.startDurations[0];
						this.toggleVideo();
					}}
				/>
				<video width="1024">
					<source src="videos/course.mp4" />
				</video>
				<VideoSlider
					playing={this.state.playing}
					durations={this.state.durations}
					steps={Math.floor(this.state.totalDuration / 100)}
					currentDuration={this.state.currentDuration}
					updateVideoTime={this.updateVideoTime}
					totalDuration={this.state.totalDuration}
					toggleVideo={this.toggleVideo}
				/>
				{this.state.showHovered && (
					<div className="video-point-tooltip" style={{ left: this.state.tooltipLeft }}>
						{this.state.tooltipText}
					</div>
				)}
				<img
					src="https://cdn1.iconfinder.com/data/icons/locations-6/48/1-512.png"
					alt=""
					className="pin"
					onMouseOver={() => this.onHover('14rem', 'Introduction')}
					onMouseLeave={this.removeFocus}
				/>
				<img
					src="https://cdn1.iconfinder.com/data/icons/locations-6/48/1-512.png"
					alt=""
					className="pin"
					style={{ left: '26rem' }}
					onMouseOver={() => this.onHover('25.7rem', 'Components')}
					onMouseLeave={this.removeFocus}
				/>
				<img
					src="https://cdn1.iconfinder.com/data/icons/locations-6/48/1-512.png"
					alt=""
					className="pin"
					style={{ left: '46rem' }}
					onMouseOver={() => this.onHover('46rem', 'State')}
					onMouseLeave={this.removeFocus}
				/>
				<img
					src="https://cdn1.iconfinder.com/data/icons/locations-6/48/1-512.png"
					alt=""
					className="pin"
					style={{ left: '57.4rem' }}
					onMouseOver={() => this.onHover('57.4rem', 'Props')}
					onMouseLeave={this.removeFocus}
				/>
			</div>
		);
	}
}