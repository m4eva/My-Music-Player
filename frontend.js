document.addEventListener('DOMContentLoaded', async () => {

  /* songs */
  let songs = [];
  const res = await fetch('http://localhost:5000/api')
  const data = await res.json()
  songs = data.songs;

  /* music buttons */
  const play = document.getElementById('play');
  const back = document.getElementById('back');
  const next = document.getElementById('next');

  /* audio */
  let index = 0;
  let audio = new Audio(songs[0].src);

  /* UI */
  let songTitle = document.getElementById('title');
  let songArtist = document.getElementById('artist');
  //let songImg = document.querySelector('');


  // functions
  function playSong() {
    audio.play();
  }

  function pauseSong() {
    audio.pause();
  }

  function currentSong() {
    songTitle.textContent = songs[index].title;
    songArtist.textContent = songs[index].artist;
    if (audio.paused){
      play.textContent = '⏸';
    } else {
      play.textContent = '▶';
    }
  }

  function nextSong() {
    index = (index + 1) % songs.length;
    audio.src = songs[index].src;
    currentSong();
    playSong();
  }

  function prevSong() {
    index = (index - 1 + songs.length) % songs.length;
    audio.src = songs[index].src;
    currentSong();
    playSong();
  }


  // event listeners
  audio.addEventListener('ended', () => {
    index = (index + 1) % songs.length;
    audio.src = songs[index].src;
    currentSong();
    playSong();
  });

  play.addEventListener('click', () =>
    {
      currentSong();
      if (!audio.paused) { pauseSong(); }
      else { playSong(); }
    });

  next.addEventListener('click', nextSong);
  back.addEventListener('click', prevSong);
});