window.addEventListener('DOMContentLoaded', async (event) => {
  // add url
  const url = new URL();

  // create ui
  const ui = new UI()

  // show and choose provinces, 
  const api = new API();

  url.loadListener();

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
  
    let checkbox = document.getElementsByName('facility')
    checkbox.forEach(function(box){
      if (box.checked) {
        facility.push(box.value)
      }
    })

    photo = url.getList()
  
    let data = {
      "hostId" : wardId,
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
      "thumbnailPhoto" : photo[0],   
      "facilitiesId" : facility, 
      "images": photo       
    }

    // post api request
    api.postData('http://localhost:8080/api/room/addRoom',data);

    console.log(data)
    e.preventDefault();
  })
})