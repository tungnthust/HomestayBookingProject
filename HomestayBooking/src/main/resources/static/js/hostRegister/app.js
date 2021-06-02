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
      "hostId" : wardId,       // login đẫ có 
      "name": roomName,   // nhập
      "type" : roomType,         // tích chọn/....
      "capacity": parseInt(capacity),      // nhập
      "area": parseInt(area),       // nhập
      "address": address,    // nhập
      "locationId" : wardId,       // bảng chọn tỉnh-->huyện-->xã,  có api sau khi chọn xong xã sẽ ra locationId
      "bedroomCount": parseInt(bedRoomCount),      // nhập
      "bedCount" : parseInt(bedCount),         // nhập
      "bathroomCount": parseInt(bathRoomCount),     // nhập
      "description" : desc,   // nhập
      "pricePerDay": parseInt(price), //       // nhập
      "policy" : policy,// nhập
      "thumbnailPhoto" : photo[0],   // nhập
      "facilitiesId" : facility,         // tích chọn/...
      "images": photo       // upload ảnh/...  --> return array of url
    }

    // post api request
    api.postData('http://localhost:8080/api/room/addRoom',data);

    console.log(data)
    e.preventDefault();
  })
})