class Room {
  async getRoomAPI(api){
    const roomResponse = await fetch(api, {method: 'POST'});
    console.log(roomResponse)
    const rooms = await roomResponse.json();
    document.getElementById("prevPage").style.display = "block";
    document.getElementById("nextPage").style.display = "block";
    let totalPages = rooms.totalPages;
    let pageNumber = rooms.number + 1;
    totalItems = rooms.totalElements
    let pageList = document.getElementById("page_number");
    pageList.innerHTML = '';
    if (totalPages > 1) {
      for(let i = 0; i < totalPages;i++) {
        pageList.innerHTML += `<a href="#" onclick="paginate(this.id)" id="page-${i+1}">${i+1}</a>`;
      }
      document.getElementById(`page-${pageNumber}`).className = "active";
      if (pageNumber == 1) {
        document.getElementById("prevPage").style.display = "none";
      } 
      if (pageNumber == totalPages) {
        document.getElementById("nextPage").style.display = "none";
      } 
    } else {
      document.getElementById("prevPage").style.display = "none";
      document.getElementById("nextPage").style.display = "none";
    }
    
    return rooms.content
  }

  showRoom(rooms){
    const type = ["Khách sạn", "Căn hộ", "Homestay"]
    let output = ''
    output += `<div class="d-flex  flex-wrap">`
    rooms.forEach(function(room){
        const roomType = type[room.type-1]
        let imagesUrl = room.images;
        imagesUrl.sort(function(a, b) {
          return parseFloat(a.id) - parseFloat(b.id);
        });

        output += `
          <a href="./roomDetail.html?roomId=${room.id}" class="card my-3 mx-2 d-inline-block" style="width: calc(20% - 1rem); text-decoration: none; color: black">
            <img src="${imagesUrl[0].url}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title card-name"> ${room.name}</h5>
              <p class="card-text card-desc">${roomType} - ${room.bedroomCount} phòng ngủ </p>
              <p class="card-price" style="font-weight: bold">${room.pricePerDay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}<u>đ</u>/đêm</p>
           </div>
          </a>
        `
    })
    output += `</div">`
    document.getElementById("rooms").innerHTML = output
  }
}