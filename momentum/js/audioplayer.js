'use strict'

import playList from "./playlist.js";

const audio = document.querySelector('.audio'),
      trackList = document.querySelector('.play-list'),
      playBtn = document.querySelector('.play'),
      prevBtn = document.querySelector('.play-prev'),
      nextBtn = document.querySelector('.play-next'),
      currentTrackOut = document.querySelector('.player-track-name');

let playNum = 0;

// make track list

function makeTrackList() {
  playList.forEach(item => {
    trackList.insertAdjacentHTML('beforeend', 
      `
        <li><div class="play player-icon list"></div>${item.title}</li>
      `);
  })
}

makeTrackList()

const tracks = document.querySelectorAll('.play-list > li'),
      playListBtns = document.querySelectorAll('.player-icon.list');


function playAudio(button) {
  audio.paused ? audio.play() : audio.pause();
  // change icon playButton
  audio.paused && button.classList.contains('pause') ? 
    button.classList.remove('pause') : 
      button.classList.add('pause');
  
  trackHighlight()
  setGeneralTime()
}

function playPrev() {
  if(playNum === 0) {
    playNum = (playList.length-1);
    audio.src = playList[playNum].src;
    playAudio(playBtn)
  } else {
    playNum = (playNum-1)
    audio.src = playList[playNum].src;
    playAudio(playBtn)
  }  
}

function playNext() {
  if(playNum === (playList.length-1)) {
    playNum = 0;
    audio.src = playList[playNum].src;
    playAudio(playBtn)
  } else {
    playNum = (playNum+1)
    audio.src = playList[playNum].src;
    playAudio(playBtn)
  }
}

function trackHighlight(i = playNum) {
  tracks.forEach(item => {
    item.classList.remove('item-active')
  })

  tracks[i].classList.contains('item-active') ?
    tracks[i].classList.remove('item-active') :
      tracks[i].classList.add('item-active');

  currentTrackOut.textContent = tracks[i].textContent;
}

playBtn.addEventListener('click', () => {
  playAudio(playBtn)
})
prevBtn.addEventListener('click', playPrev)
nextBtn.addEventListener('click', playNext)

// playlist buttons
let src;
playListBtns.forEach((item, i) => {
  item.addEventListener('click', () => {
    if(src !== playList[i].src) {
      audio.src = playList[i].src;
      src = playList[i].src;
    }
    audio.paused ? audio.play() : audio.pause();


    if(!audio.paused && !playBtn.classList.contains('pause')) {
      item.classList.add('pause')
      playBtn.classList.add('pause')
    } else if (audio.paused && playBtn.classList.contains('pause')) {
      playBtn.classList.remove('pause')
      item.classList.remove('pause')
    }
    setGeneralTime(i)
    trackHighlight(i)
  })
})

currentTrackOut.textContent = tracks[0].textContent;

audio.addEventListener('ended', playNext)

// Audio upgrade

const audioDuration = document.querySelector('.player-duration'),
      audioVolume = document.querySelector('.volume-range'),
      volumeBtn = document.querySelector('.volume-icon'),
      currentTime = document.querySelector('.current-time'),
      generalTime = document.querySelector('.all-time');


function setGeneralTime(i = playNum) {
  generalTime.textContent = playList[i].duration;
}
setGeneralTime()

function outCurrentTime() {
  currentTime.textContent = new Date(audio.currentTime * 1000).toISOString().substring(14, 19);
}

// duration magic

audio.addEventListener('timeupdate', () => {
  if (isNaN(audio.duration)) {
    audioDuration.value = 0;
  } else {
    audioDuration.value = audio.currentTime / (audio.duration / 100);
    currentTime.textContent = Math.round(audio.currentTime);
    outCurrentTime()
  }
})

audioDuration.addEventListener('input', () => {
  audio.currentTime = audioDuration.value * (audio.duration / 100)
})

// defaul player settings
audio.src = playList[0].src;
audio.volume = 0.5
audioDuration.value = 0;

// volume magic
audioVolume.addEventListener('input', (e) => {
  audio.volume = audioVolume.value / 100;
  audio.volume === 0 ? volumeBtn.classList.add('muted') : volumeBtn.classList.remove('muted') 
})

let cacheVol;
volumeBtn.addEventListener('click', () => {
  if(audio.volume >= 0.01) {
    cacheVol = audioVolume.value / 100;
    audio.volume = 0;
    audioVolume.value = 0;
    volumeBtn.classList.add('muted')
  } else {
    volumeBtn.classList.remove('muted')
    audio.volume = cacheVol;
    audioVolume.value = cacheVol * 100;
  }
});

