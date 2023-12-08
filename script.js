document.addEventListener("DOMContentLoaded", function () {
  const searchBar = document.getElementById("search-bar");
  const songList = document.getElementById("song-list");
  const audioPlayer = document.getElementById("audio-player");

  // Fetch and display songs
  function fetchSongs() {
    fetch("/api/songs")
      .then((response) => response.json())
      .then((songs) => {
        displaySongs(songs);
      });
  }

  function displaySongs(songs) {
    songList.innerHTML = "";
    songs.forEach((song) => {
      const songDiv = document.createElement("div");
      songDiv.textContent = song.name;
      songDiv.onclick = () => playSong(song.download_url);
      songList.appendChild(songDiv);
    });
  }

  function playSong(url) {
    audioPlayer.src = url;
    audioPlayer.play();
  }

  // Search functionality
  searchBar.addEventListener("input", function () {
    const searchTerm = searchBar.value.toLowerCase();
    const songs = document.querySelectorAll("#song-list div");
    songs.forEach((song) => {
      const songName = song.textContent.toLowerCase();
      song.style.display = songName.includes(searchTerm) ? "" : "none";
    });
  });

  fetchSongs();
});
// ... existing JavaScript code ...

function toggleTheme() {
  const body = document.body;
  const themeIcon = document.getElementById("theme-icon");
  const isNightMode = body.classList.toggle("night-mode");

  if (isNightMode) {
    themeIcon.textContent = "🌙";
  } else {
    themeIcon.textContent = "🌞";
  }
}

// ... existing JavaScript code ...
