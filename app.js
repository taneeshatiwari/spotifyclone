let songIndex=0;
let audioElement = new Audio();
let masterPlay = document.getElementById('masterPlay');
let progressBar = document.getElementById('bar');
let playingGif=document.getElementById('playingGif');
let songItems = document.querySelectorAll('.songItems');


let songs = [
    {songName:"Husn - Anuv Jain",filePath: "song/Husn.mp3",coverPath : "cover/Husn.png"},
    {songName:"Alag Aasmaan - Anuv Jain",filePath: "song/Alag Aasmaan.mp3",coverPath : "cover/Alag Aasmaan.png"},
    {songName:"Baarishein - Anuv Jain",filePath: "song/Baarishein.mp3",coverPath : "cover/Baarishein.png"},
    {songName:"Mera Safar - Iqlipse Nova",filePath: "song/Mera Safar.mp3",coverPath : "cover/Mera Safar.png"},
    {songName:"Udta Parinda - Iqlipse Nova",filePath: "song/Udta Parinda.mp3",coverPath : "cover/Udta Parinda.png"},

]

masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        playingGif.style.opacity=1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    }
    else{
        audioElement.pause();
        playingGif.style.opacity=0;
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
    }
   
})


audioElement.addEventListener('timeupdate',()=>{
    progress=(audioElement.currentTime/audioElement.duration)*100;
    progressBar.value=progress;
})

progressBar.addEventListener('change',()=>{
    audioElement.currentTime=(progressBar.value)*(audioElement.duration)/100;
})



const makeAllPlays =()=>{
    let songPlay =document.querySelectorAll('.songPlay i');
    songPlay.forEach((element)=>{
        
        element.classList.remove("fa-circle-pause");
        element.classList.add("fa-circle-play");
    });
}

songItems.forEach((element,i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText =songs[i].songName;
    let newaudio = new Audio(songs[i].filePath)
    newaudio.addEventListener('loadedmetadata',  ()=> {
        element.getElementsByClassName('songTime')[0].innerText = (newaudio.duration/60).toFixed(2);
    });


    newaudio.addEventListener('canplaythrough', () => {
    let songButton = element.querySelectorAll('.songPlay i')[0];
    songButton.addEventListener('click',(evt)=>{
        songIndex=i;
        makeAllPlays();
        evt.target.classList.remove("fa-circle-play");
        evt.target.classList.add("fa-circle-pause")
        audioElement.src=songs[songIndex].filePath;
        audioElement.load();
        audioElement.currentTime=0;
        document.getElementsByClassName('songPlaying')[0].innerText=songs[songIndex].songName;
          masterPlay.click();

        
    });
});
});


document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex==0){
        songIndex=songs.length - 1 ;
    }
    else{
        songIndex=songIndex-1;
    }
   songButton=document.getElementsByTagName('i')[songIndex];
    songButton.click();
   
});

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex==songs.length-1){
        songIndex=0 ;
    }
    else{
        songIndex=songIndex+1;
    }
    songButton=document.getElementsByTagName('i')[songIndex];
    songButton.click();
});

