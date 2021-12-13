$.ajax({
  url: "https://api.unsplash.com/search/photos/?",
  type: "GET",
  dataType: "json",
  data: {
    client_id: "dZNHTKQH6NZZdKPtpSxI18wMrGRkisHWD_mhPlc4rrE",
    query: "movies",
  },
  success: function (result) {
    let angkaFoto = Math.floor(Math.random() * 10);
    let foto = result["results"][angkaFoto]["urls"]["full"];

    let active = "active";

    $("#hero").append(
      `
      
           <div class="carousel-item ` +
        active +
        `">
           <img src="` +
        foto +
        `" class="d-block w-100" style="height: 400px; object-fit:cover;" "/>
         </div>
           `
    );

    console.log(foto);
  },
});
