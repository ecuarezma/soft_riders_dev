/* global body $ */
$(document).ready(() => {
  //TOGGLE MENU ON MOBILE VERSION
  const menu = $("nav .bars");

  if (mq.matches) {
    $("#playlists, .navbar ul").css("display", "none");
  }

  menu.on("click", () => {
    $("footer, .container, .title").toggleClass("blur-background");
    $(".navbar ul").slideToggle();
  });

  //LOAD PLAYLISTS
  getPlaylists();

  //EVENT LISTENER FOR PLAYLISTS
  spotify_grid.on("click", ".playlist-card", function() {
    let key = $(this)
        .children("#image")
        .attr("key"),
      src = $(this)
        .children("#image")
        .attr("src");
    spotify_content.children().remove();
    if (mq.matches) {
      spotify_content.append(
        `<div class="spotify-player">
          <iframe 
            src="https://open.spotify.com/embed/playlist/${key}"
            width="100%"
            height="80px"
            frameborder="0"
            allowtransparency="true"
            allow="encrypted-media">
          </iframe>
        </div>`
      );
    } else {
      spotify_content.append(
        `<div class="spotify-player">
        <img  id="play-image" 
              src="${src}" 
        />
        <iframe 
          src="https://open.spotify.com/embed/playlist/${key}"
          width="100%"
          height="400px"
          frameborder="0"
          allowtransparency="true"
          allow="encrypted-media">
        </iframe>
      </div>`
      );
    }
  });
  
});
//API VARIABLES
let token = x;
const user = "englishwallpaper";
const url = `https://api.spotify.com/v1/users/${user}/playlists?limit=50`;

function loadPlaylists(data) {
  data.map((playlist, index) => {
    const src = playlist.images[0].url,
      display_name = playlist.owner.display_name;
    let newDiv = $(
      `<div class="playlist-card">
        <img 
          id="image" 
          src="${src}"
          alt="playlist-${index}"
          key="${playlist.id}"
        />
        <p class="caption">
          ${playlist.name}
          <span>Curated by ${display_name}</span>
        </p>
      </div>`
    );
    if (display_name !== "Miki Lee") {
      $(".spotify-grid").append(newDiv);
    }
  });
  // console.log(data);
}

//CALLING SPOTIFY API current
async function getPlaylists() {
  let playlists = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` }
  }).then(res => res.json().then(data => data.items));
  loadPlaylists(playlists);
}

//CSS MEDIA QUERY VARIABLE
let mq = window.matchMedia("(max-width: 576px)");

const spotify_grid = $(".spotify-grid");
const spotify_content = $(".spotify-content");
