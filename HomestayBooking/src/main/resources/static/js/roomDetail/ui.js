class UI {
  async getRoomDetail(roomId) {
    const roomResponse = await fetch(`http://localhost:8080/search/${roomId}`);
    const rooms = await roomResponse.json();
    return rooms
  }

  showDetail(room) {
    this.addImage(room.images)
    this.addInfor(room)
  }

  addImage(images) {
    let img = '<div class="carousel-inner">'
    let arrImage = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth']
    for (let i = 0; i < images.length; i++) {
      if (i != 0) {
        img += `
        <div class="carousel-item">
          <img class="d-block w-100 room-img" src="${images[i].url}" alt="${arrImage[i]} slide">
        </div>
        `
      } else {
        img += `
        <div class="carousel-item active">
          <img class="d-block w-100 room-img" src="${images[i].url}" alt="${arrImage[i]} slide">
        </div>
        `
      }
    }
    img += `
    </div>
    <a class="carousel-control-prev" href="#room-carousel" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#room-carousel" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
    `
    document.getElementById('room-carousel').innerHTML = img
  }

  addInfor(room) {
    const type = ["Khách sạn", "Căn hộ", "Homestay"]
    const roomType = type[room.type - 1]

    document.querySelector('.text-title').textContent = `${room.name} - ${room.bedroomCount} phòng ngủ, ${room.area}m2`
    document.querySelector('.room-location').innerHTML = `<strong>${room.address}, ${room.location.prefix} ${room.location.name}, ${room.location.district.prefix} ${room.location.district.name}, ${room.location.province.name}</strong>`
    document.querySelector('.room-area').innerHTML = `<strong>${roomType} . </strong> ${room.area}m2`

    document.querySelector('.room-group').innerHTML = `
      <li class="room-item">${room.bedroomCount} phòng ngủ</li>
      <li class="room-item">${room.bedCount} giường</li>
      <li class="room-item">${room.bathroomCount} phòng tắm</li>
      <li class="room-item">${room.capacity} khách</li>
    `
    document.querySelector('.room-desc').textContent = `${room.description}`

    const facility = ['Điều hòa', 'Máy Giặt', 'Bình nóng lạnh', 'Tivi', 'Bếp', 'Tủ lạnh', 'Sân vườn', 'Bể bơi', 'Karaoke']
    let output = ``
    for (let i = room.facilities.length-1; i >= 0; i--) {
      let item = room.facilities[i].id 
      output += `
      <div class="utility-item d-flex align-items-baseline">
        <div class="utility-icon-img mr-2">
          <img src="../static/images/facility_icon/${item}.jpg" alt="">
        </div>
        <p class="utility-name">${facility[item-1]}</p>
      </div>
      `
    }
    document.querySelector('.utility').innerHTML = output
    document.title = `${room.name} - ${room.bedroomCount} phòng ngủ, ${room.area}m2`;
    document.querySelector('.pricePerday').innerHTML = `<strong>${room.pricePerDay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ/đêm</strong> (Giá có thể tăng vào cuối tuần hoặc ngày lễ)`
    document.querySelector('.policy').textContent = `${room.policy}`
    document.querySelector('.totalPrice').innerHTML = `<strong>${room.pricePerDay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ</strong>`
  }
}