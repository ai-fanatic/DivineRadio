document.addEventListener("DOMContentLoaded", function () {
  const searchBar = document.getElementById("search-bar");
  const songList = document.getElementById("song-list");
  const audioPlayer = document.getElementById("audio-player");
  const pdfViewer = document.getElementById("pdf-viewer"); // Assuming you have an iframe with this ID

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
      songDiv.textContent = formatSongName(song.name);
      songDiv.onclick = () => {
        playSong(song.download_url);
        showPDF(song.pdf_url); // Display the PDF when the song is clicked
      };
      songList.appendChild(songDiv);
    });
  }

  function formatSongName(songName) {
    // Remove the '.mp3' extension
    let formattedName = songName.replace(".mp3", "");

    // Find the index of the '-' symbol
    const dashIndex = formattedName.indexOf("-");

    // Remove the part before '-' and the '-' symbol itself
    if (dashIndex !== -1) {
      formattedName = formattedName.substring(dashIndex + 1).trim();
    }

    return formattedName;
  }

  function showPDF(pdfUrl) {
    window.open(pdfUrl, "_blank"); // Opens PDF in a new tab
  }
  function playSong(url) {
    audioPlayer.src = url;
    audioPlayer.play();
  }
  function showPDF(pdfUrl) {
    const viewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(
      pdfUrl
    )}&embedded=true`;
    pdfViewer.src = viewerUrl;
    pdfViewer.style.display = "block";
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
