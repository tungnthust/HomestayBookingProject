var images = [];
var num = 0;
var userId = 3;
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
  })
    document.getElementById('district').addEventListener('change', async(e) => {
      const districtId = e.target.value
      // show and choose ward
      const wards = await api.getWard(districtId)
      ui.showWard(wards)
  })
  
  const user = await api.getData('http://localhost:8080/api/user/' + userId);
  document.getElementById('firstName').value = user.first_name;
  
  document.getElementById('lastName').value = user.last_name;
  document.getElementById('email').value = user.email;

  document.getElementById('phone').value = user.phone;
  if (user.address != null) {
    document.getElementById('address').value = user.address ;
  }
  if (user.location != null) {
    const districts  = await api.getDistrict(user.location.province.id);
    ui.showDistrict(districts)

    const wards = await api.getWard(user.location.district.id);
    ui.showWard(wards)
    document.getElementById('province').value = user.location.province.id;

    document.getElementById('district').value = user.location.district.id;
    document.getElementById('ward').value = user.location.id;
  }

  document.getElementById('form-main').addEventListener('submit', (e) => {
    e.preventDefault();

    let firstName = document.getElementById('firstName').value;
  
    let lastName = document.getElementById('lastName').value

    let phone = document.getElementById('phone').value
  
    let address = document.getElementById('address').value
  
    let location = document.getElementById('ward').value;
  
    let id_card_num = document.getElementById('id-card').value
  
    let date = document.getElementById('date-issue').value
    let date_issue = new Date(date);
    date_issue = date_issue.toISOString().slice(0,10);

  
    let jsonData = {
      "userId" : userId,
      "first_name": firstName,
      "last_name" : lastName,
      "phone": phone,
      "address": address,
      "location" : location,
      "id_card_num": id_card_num,
      "date_issue" : date_issue,         
    }
    var formData = new FormData();

    let totalImage = images.length;
    for (var index = 0; index < totalImage; index++) {
      formData.append("images", images[index].value);
    }


    formData.append("hostInfo", JSON.stringify(jsonData));
    // post api request
    console.log(formData);
    api.postData('http://localhost:8080/api/user/host',formData);
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