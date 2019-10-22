/* global $ */
$(document).ready(() => {
  //MOBILE MENU TOGGLE
  $("nav .bars").on("click", () => {
    $("footer, .promos-player, .promos-container, .title").toggleClass(
      "blur-background"
    );
    $(".navbar ul").slideToggle();
  });

  //EVENT LISTENER FOR PLAYER
  $(".promos-container").on("click", ".promo-btn", function() {
    let src = $(this)
        .children("#promo-img")
        .attr("src"),
      key = $(this)
        .children("#promo-img")
        .attr("key");
    $(".promos-player")
      .children()
      .remove();
    $(".promos-player").append(key);
  });

  //LOAD THUMBNAILS
  callVimeoAPI();
});

//CALLING VIMEO API
function addPromosButtons(data) {
  data.map((promo, index) => {
    let newDiv = $(
      `<div class="promo-btn">
        <img
        id="promo-img"
        src='${promo.pictures.sizes[4].link}'
        key='${promo.embed.html}'/>
      </div>`
    );
    $(".promos-container").append(newDiv);
  });
}

async function callVimeoAPI() {
  const url = "https://api.vimeo.com/users/99155390/videos";
  let token = x;
  let promos = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` }
  }).then(res => res.json());

  let imgArray = promos.data;
  addPromosButtons(imgArray);
  // console.log(imgArray);
}
