var url = new URL(window.location.href);
var roomId = url.searchParams.get("id");
var images = [];
var num = 0;

window.addEventListener('DOMContentLoaded', async (event) => {
  // add url

  // create ui
  const ui = new UI()
  let user = await fetch('http://localhost:8080/api/auth/user', {
    credentials: 'include'
  });
  user = await user.json();
  document.querySelector("#name").textContent = user.last_name + ' ' + user.first_name;
  // show and choose provinces, 
  const api = new API();
  const provinces = await api.getProvince()
  ui.showProvince(provinces)
  document.getElementById('province').addEventListener('change', async (e) => {
    const provinceId = e.target.value;
    const districts = await api.getDistrict(provinceId);
    ui.showDistrict(districts)
  });
    document.getElementById('district').addEventListener('change', async(e) => {
      const districtId = e.target.value;
      const wards = await api.getWard(districtId);
      ui.showWard(wards);
    });

  const room = await api.getData('http://localhost:8080/search/' + roomId);
  const districts  = await api.getDistrict(room.location.province.id);
  ui.showDistrict(districts)

  const wards = await api.getWard(room.location.district.id);
  ui.showWard(wards)

  document.getElementById('roomName').value = room.name;
  
  document.getElementById('roomType').value = room.type;
  document.getElementById('province').value = room.location.province.id;

  document.getElementById('district').value = room.location.district.id;
  
  document.getElementById('ward').value = room.location.id;
  
  document.getElementById('price').value = room.pricePerDay;
  
  document.getElementById('capacity').value = room.capacity;
  
  document.getElementById('area').value = room.area;
  
  document.getElementById('address').value = room.address;
  
  document.getElementById('bedRoomCount').value = room.bedroomCount;
  
  document.getElementById('bedCount').value = room.bedCount;
  
  document.getElementById('bathRoomCount').value = room.bathroomCount;
  
  document.getElementById('desc').value = room.description;
  
  document.getElementById('policy').value = room.policy
    let checkbox = document.getElementsByName('facility')
    for (let i = 0; i < room.facilities.length; i++) {
    checkbox.forEach(function(box){
      if (box.value == room.facilities[i].id) {
        box.checked = true;
      }
    })
    }
    let imagesUrl = room.images;
    imagesUrl.sort(function(a, b) {
      return parseFloat(a.id) - parseFloat(b.id);
  });
    for (let i = 0; i < imagesUrl.length; i++) {
      
        const response = await fetch(imagesUrl[i].url);
        const blob = await response.blob();
        const file = new File([blob], 'image' + i + '.jpg', {type: blob.type});
        var output = $(".preview-images-zone");
        var html =  '<div class="preview-image preview-show-' + num + '">' +
                    '<div class="image-cancel" data-no="' + num + '">x</div>' +
                    '<div class="image-zone"><img id="pro-img-' + num + '" src="' + URL.createObjectURL(file) + '"></div>' +
                    '</div>';

        output.append(html);
        images.push({
          key: num,
          value: file
        })
        num = num + 1;
      
    }
    
    

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

    let totalImage = images.length;
    for (var index = 0; index < totalImage; index++) {
      formData.append("images", images[index].value);
    }


    formData.append("roomInfo", JSON.stringify(jsonData));
    // post api request
    console.log(formData);
    api.postData('http://localhost:8080/api/room/update/' + roomId,formData);
    e.preventDefault();

  })

  document.getElementById('pro-image').addEventListener('change', (e) => {
    
      if (window.File && window.FileList && window.FileReader) {
          var files = e.target.files; //FileList object
          var output = $(".preview-images-zone");
  
          for (let i = 0; i < files.length; i++) {
            
            var file = files[i];
            if (!file.type.match('image')) continue;
            
            
            var html =  '<div class="preview-image preview-show-' + num + '">' +
                        '<div class="image-cancel" data-no="' + num + '">x</div>' +
                        '<div class="image-zone"><img id="pro-img-' + num + '" src="' + URL.createObjectURL(file) + '"></div>' +
                        '</div>';

            output.append(html);
            images.push({
              key: num,
              value: file
            })
            num = num + 1;
             
          }
      } else {
          console.log('Browser not support');
      }
  
  });
    
    
    $(document).on('click', '.image-cancel', function() {
        let no = $(this).data('no');
        $(".preview-image.preview-show-"+no).remove();
        for (let index = 0; index < images.length; index++) {
            if (images[index].key == no) {
              images.splice(index,1);
            }
        }
    });
    
})



function logout() {
  fetch("http://localhost:8080/api/auth/logout", {
    credentials: 'include'
  });
  window.location.href = "./main.html";
}