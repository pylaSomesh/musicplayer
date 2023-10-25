console.log("Welcome to Spotify");

let songIndex=0;
let audioElement = new Audio('songs/Luna.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems=Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById('masterSongName');

let songs = [
    {songName: "Luna", filePath: "Luna.mp3", coverPath: "cover1.jpg"},
    {songName: "Saada Pyar", filePath: "Saada Pyar.mp3", coverPath: "cover1.jpg"},
    {songName: "Chu Gon Do", filePath: "Chu Gon Do.mp3", coverPath: "cover1.jpg"},
    {songName: "Click-That-B-Kickin-It", filePath: "Click-That-B-Kickin-It.mp3", coverPath: "cover1.jpg"}

]


songItems.forEach((element, i)=>{
    
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;

})


//audioElement.play();


//handle play pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime <= 0)
    {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
        masterSongName.innerText = songs[songIndex].songName+".mp3";
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0;
        document.getElementById('masterSongName').innerText = "Song Name";
    }
})

//Listen to events
audioElement.addEventListener('timeupdate', ()=>{
    //console.log('timeupdate');
    // update seekbar

    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    //console.log(progress);
    myProgressBar.value=progress;

    if(audioElement.ended)
    {
        songIndex=(songIndex+1)%4;
        audioElement.src=songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName+".mp3";
        audioElement.currentTime=0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    }

})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = (myProgressBar.value * audioElement.duration)/100;

})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src=songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName+".mp3";
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    songIndex = (songIndex+1)%4;
    audioElement.src=songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName+".mp3";
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex == 0)
    {
        songIndex=4;
    }
    else
    {
        songIndex-=1;
    }
    audioElement.src=songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName+".mp3";
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})