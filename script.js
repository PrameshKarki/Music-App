// Strict Mode
"use strict";
//Grabbing elements from the DOM
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const playBtn = document.getElementById('play');
const previousBtn = document.getElementById('previous');
const forwardBtn = document.getElementById('forward');
const audio = document.querySelector('audio');
const albumArt = document.querySelector('img');
const progress = document.querySelector('.progress');
const currentDuration = document.querySelector('.current-duration');
const totalDuration = document.querySelector('.total-duration');
const progressBar=document.querySelector('.progress-bar');

//Current Status of Music Player
let isPlaying = false;
let currentSongIndex = 0;

//Songs Library
const songLibrary = [
    {
        Title: 'Faded',
        Artist: 'Alan Walker',
        musicLocation: './Music/Faded.mp3',
        albumArtLocation: './Images/Faded.jpeg'
    },
    {
        Title: 'A Thousand Years',
        Artist: 'Christina Perri',
        musicLocation: './Music/A Thousand Years.mp3',
        albumArtLocation: './Images/Christina Perri.jpeg'
    },
    {
        Title: 'All Of Me',
        Artist: 'John Legend',
        musicLocation: './Music/All Of Me.mp3',
        albumArtLocation: './Images/All Of Me.jpg'

    },
    {
        Title: 'Let Her Go',
        Artist: 'Passenger',
        musicLocation: './Music/Let Her Go.mp3',
        albumArtLocation: './Images/Let Her Go.jpg'
    },
    {

        Title: 'Perfect',
        Artist: 'Ed Sheeran',
        musicLocation: './Music/Perfect.mp3',
        albumArtLocation: './Images/Perfect.jpg'
    }
];

//Function for playing song
const playSong = () => {
    isPlaying = true;
    audio.play();
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.classList.replace('play-button', 'pause-button');
    albumArt.classList.add('rotationImage');
    playBtn.setAttribute('title', 'Pause');


}
const pauseSong = () => {
    isPlaying = false;
    audio.pause();
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.classList.replace('pause-button', 'play-button');
    albumArt.classList.remove('rotationImage');
    playBtn.setAttribute('title', 'Play');
}



//Check Status whether we have to play song or pause
const checkStatus = () => {
    isPlaying ? pauseSong() : playSong();
}


//Adding event listener to the play/pause button
playBtn.addEventListener('click', checkStatus);

//Function for loading new Song
function loadSong(song) {
    title.innerText = song.Title;
    artist.innerText = song.Artist;
    albumArt.src = `${song.albumArtLocation}`;
    audio.src = song.musicLocation;
    playSong();
}
// Click event handling to the forward Button
forwardBtn.addEventListener('click',nextSong);

// To play next song
function nextSong(){
    currentSongIndex = (currentSongIndex + 1) % (songLibrary.length);
    loadSong(songLibrary[currentSongIndex]);
}

//Event listening to the Previous Button
previousBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songLibrary.length) % songLibrary.length;
    loadSong(songLibrary[currentSongIndex]);
})

//Listening timeUpdate event
audio.addEventListener('timeupdate', event => {
    // For progress Bar
    let { currentTime, duration } = event.srcElement;
    let progressPercentage = Math.ceil((currentTime / duration) * 100);
    progress.style.width = `${progressPercentage}%`;

    // for Current Time
    let currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    currentSeconds = currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds;
    currentDuration.textContent = `${currentMinutes}:${currentSeconds}`;
})


// When user click on progress bar
progressBar.addEventListener('click',event=>{
    let audioDuration=audio.duration;
    let offsetX=event.offsetX;
    let clientWidth=event.srcElement.clientWidth;
    let pickedSongDuration=(offsetX/clientWidth)*audioDuration;
    audio.currentTime=pickedSongDuration;
    playSong();

});


// When song was ended,Play next song of the queue
audio.addEventListener('ended',nextSong);



audio.addEventListener('loadedmetadata',()=>{
    let audioDuration=audio.duration;
    let minute=Math.floor(audioDuration/60);
    let seconds=Math.floor(audioDuration%60);
    seconds=seconds<10?`0${seconds}`:seconds;
    totalDuration.textContent=`${minute}:${seconds}`;

})











// Pramesh Karki
