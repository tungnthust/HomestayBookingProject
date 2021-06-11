var images = [];
var num = 0;

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
    // show and choose district
    const districts = await api.getDistrict(provinceId)
    ui.showDistrict(districts)
    document.getElementById('district').addEventListener('change', async(e) => {
      const districtId = e.target.value
      // show and choose ward
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
      "pricePerDay": parseFloat(price),     
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
    api.postData('http://localhost:8080/api/room/addRoom',formData);
    e.preventDefault();

  })

  
  // document.getElementById("images").addEventListener('change', (e) => {
  //   e.preventDefault();
  //   let totalImage = images.files.length;
  //   let list = document.getElementById('imageList');
  //   for (var index = 0; index < totalImage; index++) {
  //     let li = document.createElement('span');
  //     li.style = "padding-right: 20px";
  //     let image = document.createElement('img');
  //     image.src = URL.createObjectURL(e.target.files[index]);
  //     image.height = '150';
  //     li.appendChild(image);
  //     list.appendChild(li);
  //   }
  //   e.preventDefault();
  //   return false;
  // })

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