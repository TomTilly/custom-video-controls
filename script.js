const player = document.querySelector('.player');
const video = player.querySelector('video');
const playButton = player.querySelector('.play-button');
const progressBar = player.querySelector('.progress');
const progressBarFill = player.querySelector('.progress__filled');
const skipButtons = player.querySelectorAll('[data-skip]');
const volumeRangeEl = player.querySelector('[name="volume"]');
const playbackRateEl = player.querySelector('[name="playbackRate"]');
let isPlaying = false;
let mouseDown = false;

function togglePlay(){
	isPlaying ? video.pause() : video.play();
	isPlaying = !isPlaying;
}

function updateButton() {
	const icon = this.paused ? '►' : '❚ ❚';
	playButton.textContent = icon;
}

// Just updates the currentTime property, doesn't handle the display
function updateProgress(e) {
	if(mouseDown || e.type === 'mousedown'){
		const progressBarTotalWidth = progressBar.offsetWidth;
		const userClickedX = e.offsetX;
		const progressPercentage = (userClickedX / progressBarTotalWidth);
		video.currentTime = progressPercentage * video.duration; // will automatically trigger timeupdate event and updateProgressBar handler
	}
}

function updateVolume(){
	video.volume = this.value;
}

function updatePlaybackRate(){
	video.playbackRate = this.value;
}

// Updates the display of the progress bar
function updateProgressBar() {
	const totalDuration = video.duration;
	const currentTime = video.currentTime;
	const progress = (currentTime / totalDuration) * 100;
	progressBarFill.style.flexBasis = `${progress}%`;
}

function skip() {
	video.currentTime += parseFloat(this.dataset.skip)
}


// Toggle playing of video when user clicks on video or play/pause button
video.addEventListener('click', togglePlay);
playButton.addEventListener('click', togglePlay);

// Update button icon when video play and pause state changes
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

// Update the progress bar on the screen when time updates
video.addEventListener('timeupdate', updateProgressBar);

// Let user click and move along progress bar to scroll through video 
progressBar.addEventListener('mousedown', updateProgress);
progressBar.addEventListener('mousemove', updateProgress);

// Let users skip ahead and back
skipButtons.forEach(button => button.addEventListener('click', skip));

volumeRangeEl.addEventListener('input', updateVolume);
playbackRateEl.addEventListener('input', updatePlaybackRate);

// Listen for mousedown and up to know if user is clicking while moving the mouse (used for scrolling the progress bar)
progressBar.addEventListener('mousedown', () => mouseDown = true);
progressBar.addEventListener('mouseup', () => mouseDown = false);