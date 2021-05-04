const navBtn = document.getElementById('nav-btn');
const cancelBtn = document.getElementById('cancel-btn');
const sideNav = document.getElementById('sidenav');
const modalMenu = document.getElementById('modal-menu');


// Initialize and add the map
function initMap() {
    // The location of Uluru
    const uluru = { lat: -25.344, lng: 131.036 };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: uluru,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
      position: uluru,
      map: map,
    });
  }


navBtn.addEventListener("click", function(){
    sideNav.classList.add('show');
    modalMenu.classList.add('showModal');
});

cancelBtn.addEventListener('click', function(){
    sideNav.classList.remove('show');
    modalMenu.classList.remove('showModal');
});



window.addEventListener('click', function(event){
    if(event.target === modalMenu){
        sideNav.classList.remove('show');
        modalMenu.classList.remove('showModal');
    }
});

