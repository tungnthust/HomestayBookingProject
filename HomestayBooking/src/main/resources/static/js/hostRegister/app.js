window.addEventListener('DOMContentLoaded', async (event) => {
  // add url

  // create ui
  const ui = new UI()

  // show and choose provinces, 
  const api = new API();
  const provinces = await api.getProvince()
  ui.showProvince(provinces)
  document.getElementById('province').addEventListener('change', async (e) => {
    const provinceId = e.target.value;
    const districts = await api.getDistrict(provinceId)
    ui.showDistrict(districts)
    document.getElementById('district').addEventListener('change', async(e) => {
      const districtId = e.target.value
      const wards = await api.getWard(districtId)
      ui.showWard(wards)
    })
  })

  document.getElementById('form-main').addEventListener('submit', (e) => {
    e.preventDefault();

    let roomName = document.getElementById('roomName').value;
  
    let roomType = document.getElementById('roomType').value

    let wardId = document.getElementById('ward').value
  
    let price = document.getElementById('price').value
  
    let capacity = document.getElementById('capacity').value;
  
    let area = document.getElementById('area').value
  
    let address = document.getElementById('address').value
  
    let bedRoomCount = document.getElementById('bedRoomCount').value
  
    let bedCount = document.getElementById('bedCount').value
  
    let bathRoomCount = document.getElementById('bathRoomCount').value
  
    let desc = document.getElementById('desc').value
  
    let policy = document.getElementById('policy').value
    
    let facility = new Array();
  
    let images = document.getElementById('images');

    let checkbox = document.getElementsByName('facility')
    checkbox.forEach(function(box){
      if (box.checked) {
        facility.push(box.value)
      }
    })

  
    let jsonData = {
      "hostId" : 1,
      "name": roomName,
      "type" : roomType,
      "capacity": parseInt(capacity),
      "area": parseInt(area),
      "address": address,
      "locationId" : wardId,
      "bedroomCount": parseInt(bedRoomCount),
      "bedCount" : parseInt(bedCount),         
      "bathroomCount": parseInt(bathRoomCount),     
      "description" : desc,   
      "pricePerDay": parseInt(price),     
      "policy" : policy,
      "thumbnailPhoto" : '1',   
      "facilitiesId" : facility, 
    }
    var formData = new FormData();

    let totalImage = images.files.length;
    for (var index = 0; index < totalImage; index++) {
      formData.append("images", images.files[index]);
    }


    formData.append("roomInfo", JSON.stringify(jsonData));
    // post api request
    console.log(formData);
    api.postData('http://localhost:8080/api/room/addRoom',formData);

  })

  document.getElementById("images").addEventListener('change', (e) => {
    e.preventDefault();
    let totalImage = images.files.length;
    let list = document.getElementById('imageList');
    for (var index = 0; index < totalImage; index++) {
      let li = document.createElement('span');
      li.style = "padding-right: 20px";
      let image = document.createElement('img');
      image.src = URL.createObjectURL(e.target.files[index]);
      image.height = '150';
      li.appendChild(image);
      list.appendChild(li);
    }
  })
})