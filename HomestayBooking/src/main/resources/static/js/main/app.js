window.addEventListener('DOMContentLoaded', async (event) => {
 
  // show and choose provinces, 
  const api = new API();
  const result = document.getElementById('result');
  const searchInput = document.getElementById('search');
  searchInput.addEventListener('keyup', async function() {
    let query = searchInput.value;
    if (query != '') {
      let url = 'http://localhost:8080/api/search?query=' + query;
    let data = await fetch(url, {
      method: 'POST',
    })
    let inner_html = '';
    data = await data.json();
    let i = 0;

      for (let j = 0; j < data.rooms.length; j++) {
          if(i >= 5) break;
          let room = await api.getData('http://localhost:8080/search/' + data.rooms[j]);
          inner_html += '<li onclick ="getId(this.id)" style="cursor: pointer" class="list-group-item link-class"' + 'id="room-' + data.rooms[j] +'"><img src="'+room.images[0].url+'" height="40" width="40"/><p>'+room.name+
          '</p><br> <span class="text-muted">'+room.location.district.name + ', ' + room.location.province.name +'</span></li>';
          i++;
      }
      for (let j = 0; j < data.provinces.length; j++) {
        if(i >= 5) break;
        let province = await api.getData('http://localhost:8080/api/location/province/' + data.provinces[j]);
        let countRoom = await api.getData('http://localhost:8080/search/countRoom/' + data.provinces[j]);
        inner_html += '<li onclick ="getId(this.id)" style="cursor: pointer" class="list-group-item link-class"' + 'id="pronvinceId-' + data.provinces[j] +'"><i class="fa fa-map-marker" aria-hidden="true"></i><p>'+province.name+
        '</p><br><span class="text-muted">'+countRoom+' Chỗ ở</span></li>';
        i++;
      }

      for (let j = 0; j < data.districts.length; j++) {
        if(i >= 5) break;
        let district = await api.getData('http://localhost:8080/api/location/district/' + data.districts[j]);
        let countRoom = await api.getData('http://localhost:8080/search/countRoom/district/' + data.districts[j]);
        let province = await api.getData('http://localhost:8080/api/location/province/' + district.provinceId);
        inner_html += '<li onclick ="getId(this.id)" style="cursor: pointer" class="list-group-item link-class"' + 'id="districtId-' + data.districts[j] +'"><i class="fa fa-map-marker" aria-hidden="true"></i><p>'+district.name+', '+ 
        province.name + '</p><br><span class="text-muted">'+countRoom+' Chỗ ở</span></li>';
        i++;
      }
      for (let j = 0; j < data.wards.length; j++) {
        if(i >= 5) break;
        let ward = await api.getData('http://localhost:8080/api/location/ward/' + data.wards[j]);
        let district = ward.district.name;
        let countRoom = await api.getData('http://localhost:8080/search/countRoom/ward/' + data.wards[j]);
        let province = ward.province.name;
        inner_html += '<li onclick ="getId(this.id)" style="cursor: pointer" class="list-group-item link-class"' + 'id="location-' + data.wards[j] +'"><i class="fa fa-map-marker" aria-hidden="true"></i><p>'+ward.name + ', ' + 
        district+', '+ province + '</p><br><span class="text-muted">'+countRoom+' Chỗ ở</span></li>';
        i++;
      }

    result.innerHTML = inner_html;
    } else {
      result.innerHTML = '';
    }

  });
    
 
  
    
})

function getId(id) {
  console.log(id);
  let query = document.querySelector('#' + id + ' > p').textContent;
  document.getElementById('search').value = query;
  document.getElementById('result').innerHTML = '';
  let searchQuery = id.split("-");
  if (searchQuery[0] == "room") {
    window.open("./roomDetail.html?roomId=" + searchQuery[1]);
  }
}