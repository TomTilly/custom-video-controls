const player = document.querySelector('.player');
const video = player.querySelector('video');
const playButton = player.querySelector('.play-button');
const progressBar = player.querySelector('.progress');
const progressBarFill = player.querySelector('.progress__filled');
const skipButtons = player.querySelectorAll('[data-skip]');
let isPlaying = false;

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
	const progressBarTotalWidth = progressBar.offsetWidth;
	const progressPercentage = (e.offsetX / progressBarTotalWidth);
	video.currentTime = progressPercentage * video.duration;
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

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', updateProgressBar);

playButton.addEventListener('click', togglePlay);

progressBar.addEventListener('mousedown', updateProgress);

skipButtons.forEach(button => button.addEventListener('click', skip));