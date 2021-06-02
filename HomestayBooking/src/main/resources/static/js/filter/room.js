class Room {
  async getRoomAPI(api){
    const roomResponse = await fetch(api, {method: 'POST'});
    const rooms = await roomResponse.json();
    return rooms.content
  }

  showRoom(api){
    const rooms = getRoomAPI(api);
    
    let output = ''
    rooms.forEach(function(room){
      output += `<div class="d-flex justify-content-between">`
      for (let i=0; i<5; i++){
        output += `
          <div class="card" style="width: calc(20% - 1rem)">
            <img src="${room.thumbnailPhoto}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">Can ho dich vu - 1 phong ngu</h5>
              <p class="card-text card-desc">The Galaxy Home - 1 Phong ngu 2 phong tam 3 phong ve sinh</p>
              <p class="" style="font-weight: bold">${room.pricePerDay}d/dem</p>
           </div>
          </div>
        `
      }
    })
  }
}