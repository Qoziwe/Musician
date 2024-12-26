const songsList = [
  {
    key: "Midnight Madonna",
    link: "./songs/MidnightMadonna.mp3",
    author: "Powerwolf",
    imgLink: "./images/albumsIMGS/MidnightMadonna.jpeg",
  },
  {
    key: "Moskau",
    link: "./songs/Moskau.mp3",
    author: "Rammstein",
    imgLink: "./images/albumsIMGS/ReiseReise.png",
  },
  {
    key: "Zlo",
    link: "./songs/Zlo.mp3",
    author: "Electroforez",
    imgLink: "./images/albumsIMGS/QuoVadis.jpg",
  },
  {
    key: "Odnazdy",
    link: "./songs/Odnazhdy.mp3",
    author: "Animatsiya",
    imgLink: "./images/albumsIMGS/krugomvragi.png",
  },
  {
    key: "Stuk",
    link: "./songs/Stuk.mp3",
    author: "Kino",
    imgLink: "./images/albumsIMGS/legenda.png",
  },
  {
    key: "Peremen",
    link: "./songs/Peremen.mp3",
    author: "Kino",
    imgLink: "./images/albumsIMGS/legenda.png",
  },
];

const playButton = document.getElementById("MC-SCC-M-PL-SVG");
const progressBar = document.getElementById("MC-SCC-M-Input");
const currentP = document.getElementById("MC-SCC-M-Current");
const songContainer = document.getElementById("MC-SSC-SongContainer");
const backwardButton = document.getElementById("MC-SCC-M-B-Backward");
const forwardButton = document.getElementById("MC-SCC-M-B-Forward");
const Tonearm = document.getElementById("MC-SCC-M-PL-SVG-Tonearm");
const shuffleButton = document.getElementById("MC-SCC-M-B-C-Mixing");
const shuffleIcon = document.querySelector(
  "#MC-SCC-M-B-C-Mixing .MC-SCC-M-B-C-M-SVGPath"
);
const favoriteButton = document.getElementById("MC-SCC-M-B-C-Favorite");
const favoriteIcon = document.getElementById("MC-SCC-M-B-C-F-SVG");
const accordsButton = document.getElementById("MC-SCC-M-B-C-Accords");
const audioVolume = document.getElementById("MC-V-Input");
const audioVolumeZero = document.getElementById("MC-V-Zero");

let currentSongIndex = 0;
let audio = new Audio(songsList[currentSongIndex].link);
let isShuffled = false;
let playOrder = [...songsList.keys()];
let isSpinning = false;
let rotation = 0;
let rotationFrame = null;
let wasPlayed = 0;
let isAccordsMode = false;

function updateUI() {
  const currentSong = songsList[playOrder[currentSongIndex]];
  songContainer.innerHTML = `<div id="MC-SSC-SC-Song">
    <img src="${currentSong.imgLink}" alt="" />
    <span>
      <h1>${currentSong.key}</h1>
      <p>Author: "${currentSong.author}"</p>
    </span>
  </div>`;

  const favoriteSongs = JSON.parse(localStorage.getItem("favoriteSongs")) || [];
  const isFavorite = favoriteSongs.some((song) => song.key === currentSong.key);
  const favoriteIconPath = document.querySelectorAll(
    "#MC-SCC-M-B-C-F-SVG path"
  );
  favoriteIcon.setAttribute("fill", isFavorite ? "white" : "none");
  favoriteIconPath.forEach((path) => {
    path.setAttribute("stroke", isFavorite ? "white" : "#ABABAB");
  });
}
function playSong(index) {
  audio.pause();
  currentSongIndex = index;
  audio = new Audio(songsList[playOrder[currentSongIndex]].link);
  audio.play();
  startRotation();

  audio.onended = () => playSong((currentSongIndex + 1) % playOrder.length);
  audio.ontimeupdate = () => {
    progressBar.value = Math.floor(audio.currentTime);
    progressBar.max = Math.floor(audio.duration);
    currentP.textContent = `${Math.floor(audio.currentTime / 60)}:${String(
      Math.floor(audio.currentTime % 60)
    ).padStart(2, "0")}`;
  };

  progressBar.oninput = () => (audio.currentTime = progressBar.value);
  updateUI();
}
function startRotation() {
  if (!rotationFrame) {
    Tonearm.classList.replace(
      Tonearm.classList[0],
      "MC-SCC-M-PL-SVG-T-Playing"
    );
    isSpinning = true;
    rotate();
  }
}
function stopRotation() {
  Tonearm.classList.replace(Tonearm.classList[0], "MC-SCC-M-PL-SVG-T-Pausing");
  isSpinning = false;
  cancelAnimationFrame(rotationFrame);
  rotationFrame = null;
}
function rotate() {
  if (isSpinning) {
    rotation = (rotation + 5) % 360;
    playButton.style.transform = `rotate(${rotation}deg)`;
    rotationFrame = requestAnimationFrame(rotate);
    Tonearm.classList.replace(
      Tonearm.classList[0],
      "MC-SCC-M-PL-SVG-T-Playing"
    );
  }
}
function toggleAccordsMode() {
  const songContainer = document.getElementById("MC-SSC-SongContainer");
  const article = document.getElementById("MC-SSC-Article");
  const svgContainer = document.getElementById("MC-SCC-M-Buttons");
  const playButton = document.getElementById("MC-SCC-M-PlayButton");
  const songControlsContainer = document.getElementById(
    "MC-SongControlsContainer"
  );
  const svgs = svgContainer.getElementsByTagName("svg");
  const MCVolume = document.getElementById("MC-Volume");
  const accordsButtonSVG = accordsButton.querySelectorAll("svg path");

  if (isAccordsMode) {
    MCVolume.style.height = "";
    songContainer.style.borderRadius = "";
    article.innerHTML = "<h1>Playable Song</h1>";
    article.style.display = "flex";
    document.getElementById("MC-SSC-SVG").style.display = "block";
    songControlsContainer.style.gridTemplateRows = "";
    playButton.style.position = "";
    playButton.style.transform = "";
    playButton.style.top = "";
    svgContainer.style.marginTop = "";
    accordsButtonSVG.forEach((path) => {
      path.setAttribute("fill", "#ABABAB");
    });
    for (let svg of svgs) {
      svg.style.transform = "";
    }
  } else {
    MCVolume.style.height = "calc(80vh - 7vw)";
    songContainer.style.borderRadius = "5vw";
    article.innerHTML = "";
    article.style.display = "none";
    document.getElementById("MC-SSC-SVG").style.display = "none";
    songControlsContainer.style.gridTemplateRows = "4vw 8vw";
    playButton.style.position = "absolute";
    playButton.style.transform = "translateX(-25vw)";
    playButton.style.top = "3.5vw";
    svgContainer.style.marginTop = "1vw";
    accordsButtonSVG.forEach((path) => {
      path.setAttribute("fill", "white");
    });
    for (let svg of svgs) {
      svg.style.transform = "scale(0.8)";
    }
  }
  isAccordsMode = !isAccordsMode;
}
function updateVolumeButton() {
  if (audio.volume === 0) {
    audioVolumeZero.setAttribute("viewBox", "0 0 800 800");
    audioVolumeZero.innerHTML = `<g clip-path="url(#clip0_118_2)">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M346.667 60C385.107 8.74585 466.667 35.933 466.667 100V704.047C466.667 768.463 384.377 795.423 346.26 743.497L216.452 566.667H133.333C78.1049 566.667 33.3333 521.897 33.3333 466.667V333.333C33.3333 278.105 78.1049 233.333 133.333 233.333H216.667L346.667 60ZM400 100L270 273.333C257.41 290.12 237.65 300 216.667 300H133.333C114.924 300 99.9999 314.924 99.9999 333.333V466.667C99.9999 485.077 114.924 500 133.333 500H216.452C237.677 500 257.634 510.107 270.194 527.217L400 704.047V100Z"
        fill="#ABABAB"
      />
      <path
        d="M540.457 139.148C536.98 118.817 552.577 100 573.203 100C588.783 100 602.16 110.933 604.88 126.275C614.14 178.449 633.333 298.822 633.333 400C633.333 501.177 614.14 621.55 604.88 673.727C602.16 689.067 588.783 700 573.203 700C552.577 700 536.98 681.183 540.457 660.853C550.247 603.577 566.667 493.58 566.667 400C566.667 306.421 550.247 196.423 540.457 139.148Z"
        fill="#ABABAB"
      />
      <path
        d="M713.667 166.667C691.153 166.667 674.673 189.799 679.887 211.699C689.193 250.804 700 314.597 700 400C700 485.403 689.193 549.197 679.887 588.3C674.673 610.2 691.153 633.333 713.667 633.333C725.72 633.333 736.58 626.48 740.337 615.03C750.113 585.23 766.667 517.443 766.667 400C766.667 282.557 750.113 214.769 740.337 184.971C736.58 173.519 725.72 166.667 713.667 166.667Z"
        fill="#ABABAB"
      />
      <rect
        y="65.7609"
        width="93"
        height="1038.39"
        rx="46.5"
        transform="rotate(-45 0 65.7609)"
        fill="#ABABAB"
      />
    </g>
    <defs>
      <clipPath id="clip0_118_2">
        <rect width="800" height="800" fill="white" />
      </clipPath>
    </defs>`;
  } else {
    audioVolumeZero.setAttribute("viewBox", "0 0 24 24");
    audioVolumeZero.innerHTML = `<path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10.4 1.8C11.5532 0.262376 14 1.07799 14 3.00001V21.1214C14 23.0539 11.5313 23.8627 10.3878 22.3049L6.49356 17H4C2.34315 17 1 15.6569 1 14V10C1 8.34315 2.34315 7 4 7H6.5L10.4 1.8ZM12 3L8.1 8.2C7.72229 8.70361 7.12951 9 6.5 9H4C3.44772 9 3 9.44772 3 10V14C3 14.5523 3.44772 15 4 15H6.49356C7.13031 15 7.72901 15.3032 8.10581 15.8165L12 21.1214V3Z"
      fill="#ABABAB"
    />
    <path
      d="M16.2137 4.17445C16.1094 3.56451 16.5773 3 17.1961 3C17.6635 3 18.0648 3.328 18.1464 3.78824C18.4242 5.35347 19 8.96465 19 12C19 15.0353 18.4242 18.6465 18.1464 20.2118C18.0648 20.672 17.6635 21 17.1961 21C16.5773 21 16.1094 20.4355 16.2137 19.8256C16.5074 18.1073 17 14.8074 17 12C17 9.19264 16.5074 5.8927 16.2137 4.17445Z"
      fill="#ABABAB"
    />
    <path
      d="M21.41 5C20.7346 5 20.2402 5.69397 20.3966 6.35098C20.6758 7.52413 21 9.4379 21 12C21 14.5621 20.6758 16.4759 20.3966 17.649C20.2402 18.306 20.7346 19 21.41 19C21.7716 19 22.0974 18.7944 22.2101 18.4509C22.5034 17.5569 23 15.5233 23 12C23 8.47672 22.5034 6.44306 22.2101 5.54913C22.0974 5.20556 21.7716 5 21.41 5Z"
      fill="#ABABAB"
    />`;
  }
}
function syncVolume() {
  audioVolume.value = audio.volume * 100;
}

playButton.onclick = () => {
  if (audio.paused) {
    if (wasPlayed == 0) {
      playSong(0);
      wasPlayed = 1;
    }
    audio.play();
    startRotation();
  } else {
    audio.pause();
    stopRotation();
  }
};
document.onkeydown = function iziz(iz) {
  if (iz.keyCode == "32") {
    if (audio.paused) {
      if (wasPlayed == 0) {
        playSong(0);
        wasPlayed = 1;
      }
      audio.play();
      startRotation();
    } else {
      audio.pause();
      stopRotation();
    }
  }
};
backwardButton.onclick = function () {
  if (wasPlayed == 0) {
    playSong(0);
    wasPlayed = 1;
  }
  playSong((currentSongIndex - 1 + playOrder.length) % playOrder.length);
};
forwardButton.onclick = function () {
  playSong((currentSongIndex + 1) % playOrder.length);
  if (wasPlayed == 0) {
    playSong(0);
    wasPlayed = 1;
  }
};
shuffleButton.onclick = () => {
  isShuffled = !isShuffled;
  playOrder = isShuffled
    ? playOrder.sort(() => Math.random() - 0.5)
    : [...songsList.keys()];
  if (isShuffled) {
    const elements = Array.from(
      document.getElementsByClassName("MC-SCC-M-B-C-M-SVGPath")
    );
    elements.forEach((element) => {
      element.style.fill = "white";
    });
  } else {
    const elements = Array.from(
      document.getElementsByClassName("MC-SCC-M-B-C-M-SVGPath")
    );
    elements.forEach((element) => {
      element.style.fill = "#ABABAB";
    });
  }
  playSong(0);
  updateUI();
};
favoriteButton.onclick = () => {
  const favoriteSongs = JSON.parse(localStorage.getItem("favoriteSongs")) || [];
  const currentSong = songsList[playOrder[currentSongIndex]];

  if (favoriteSongs.some((song) => song.key === currentSong.key)) {
    localStorage.setItem(
      "favoriteSongs",
      JSON.stringify(
        favoriteSongs.filter((song) => song.key !== currentSong.key)
      )
    );
  } else {
    favoriteSongs.push(currentSong);
    localStorage.setItem("favoriteSongs", JSON.stringify(favoriteSongs));
  }

  updateUI();
};
accordsButton.onclick = toggleAccordsMode;
audioVolumeZero.addEventListener("click", () => {
  audio.volume = 0;
  audioVolume.value = 0;
  updateVolumeButton();
});
audioVolume.addEventListener("input", () => {
  audio.volume = audioVolume.value / 100;
  updateVolumeButton();
});
audio.addEventListener("volumechange", syncVolume);

syncVolume();
updateVolumeButton();
updateUI();
