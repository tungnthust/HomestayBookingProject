class Room {
  async getRoomAPI(api){
    const roomResponse = await fetch(api, {method: 'POST'});
    const rooms = await roomResponse.json();
    return rooms.content
  }

  showRoom(rooms){
    const type = ["Khách sạn", "Căn hộ", "Homestay"]
    let output = ''
    output += `<div class="d-flex  flex-wrap">`
    rooms.forEach(function(room){
        const roomType = type[room.type-1]
        output += `
          <a href="./roomDetail.html?roomId=${room.id}" class="card my-3 mx-2 d-inline-block" style="width: calc(20% - 1rem); text-decoration: none; color: black">
            <img src="${room.images[0].url}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title card-name"> ${room.name}</h5>
              <p class="card-text card-desc">${roomType} - ${room.bedroomCount} phòng ngủ </p>
              <p class="card-price" style="font-weight: bold">${room.pricePerDay}<u>đ</u>/đêm</p>
           </div>
          </a>
        `
    })
    output += `</div">`
    document.getElementById("rooms").innerHTML = output
  }
}