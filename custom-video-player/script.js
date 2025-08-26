const video = document.getElementById('video');
const playBtn = document.getElementById('play');
const stopBtn = document.getElementById('stop');
const progressBar = document.getElementById('progress');
const timeStamp = document.getElementById('timestamp');

const toggleVideoStatus = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
};

const updatePlayIcon = () =>
  (playBtn.innerHTML = `<i class="fa fa-${
    video.paused ? 'play' : 'pause'
  } fa-2x"></i>`);

const stopVideo = () => {
  video.pause();
  video.currentTime = 0;
};

const updateProgress = () => {
  progressBar.value = (video.currentTime / video.duration) * 100;

  let mins = Math.floor(video.currentTime / 60);
  let secs = Math.floor(video.currentTime % 60);

  timeStamp.textContent = `${formatNum(mins)}:${formatNum(secs)}`;
};

const formatNum = (num) => String(num).padStart(2, '0');

const setVideoProgress = () =>
  (video.currentTime = (+progressBar.value * video.duration) / 100);

video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

playBtn.addEventListener('click', toggleVideoStatus);
stopBtn.addEventListener('click', stopVideo);
progressBar.addEventListener('change', setVideoProgress);
