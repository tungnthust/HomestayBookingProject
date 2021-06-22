var start = '';
var end = '';
var openFilter = '';
var url = new URL(window.location);
var params = url.searchParams
var hostId = '';
window.addEventListener('DOMContentLoaded', async (event) => {
 
  loadCountGuess()
  checkReservation()
  // show and choose provinces, 
  const api = new API();
  const result = document.getElementById('result');
  const searchInput = document.getElementById('search');
  let login = false;

  let user = await fetch('http://localhost:8080/api/auth/user', {
    credentials: 'include'
  });
  user = await user.json();
  if (user != null) {
    login = true;
  }
  if (login == true) {
    hostId = await fetch("http://localhost:8080/api/user/host/" + user.id);
    hostId = await hostId.text();
    document.getElementById("new-user").style.display = "none";
    document.getElementById("username").style.display = "block";
    document.querySelector("#name").textContent = user.last_name + ' ' + user.first_name;
  } else {
    document.getElementById("new-user").style.display = "block";
    document.getElementById("username").style.display = "none";
  }
  
  document.getElementById("host").addEventListener('click', async (e) => {
    e.preventDefault();
    if (login == true) {
      hostId = await fetch("http://localhost:8080/api/user/host/" + user.id);
      hostId = await hostId.text();
      if (hostId == '') {
        window.location.href = "./hostRegister.html?id=" + user.id; 
      } else {
        window.location.href = "./dashboard.html?hostId=" + hostId; 
      }
    } else {
      window.location.href = "./login.html"; 
    }
  })

  if (hostId != '') {
    const countNotiResponse = await fetch(`http://localhost:8080/api/notification/host/${hostId}`);
    const countNoti = await countNotiResponse.json();
    let notify = document.getElementById("countNotify");
    if (countNoti > 0) {
      notify.style.display = "flex";
      notify.innerHTML = countNoti;
    } else {
      notify.style.display = "none";
    }
  }

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
          let images = room.images;
          images.sort(function(a, b) {
          return parseFloat(a.id) - parseFloat(b.id);
          });
          inner_html += `
          <li onclick ="getId(this.id)" style="cursor: pointer" class="list-group-item link-class d-flex" id="room-${data.rooms[j]}">
            <img src="${room.images[0].url}" height="40" width="40"class="mr-4"/>
            <div>
              <p class="mb-2">${room.name}</p> 
              <span class="text-muted" style="font-size: 12px">${room.location.district.name}, ${room.location.province.name}</span>
            </div>
          </li>
          `
          i++;
      }
      for (let j = 0; j < data.provinces.length; j++) {
        if(i >= 5) break;
        let province = await api.getData('http://localhost:8080/api/location/province/' + data.provinces[j]);
        let countRoom = await api.getData('http://localhost:8080/search/countRoom/' + data.provinces[j]);
        inner_html += `
        <li onclick ="getId(this.id)" style="cursor: pointer" class="list-group-item link-class d-flex" id="provinceId-${data.provinces[j]}">
          <div class="d-flex justify-content-center align-items-center mr-4" style="height:40px; width:40px">
            <i class="fa fa-map-marker fa-lg" aria-hidden="true" font-size="150px"></i>
          </div>
          <div>
            <p class="mb-2">${province.name}</p>
            <span class="text-muted" style="font-size: 12px">${countRoom} Chỗ ở</span>
          </div>
        </li>
        `
        i++;
      }

      for (let j = 0; j < data.districts.length; j++) {
        if(i >= 5) break;
        let district = await api.getData('http://localhost:8080/api/location/district/' + data.districts[j]);
        let countRoom = await api.getData('http://localhost:8080/search/countRoom/district/' + data.districts[j]);
        let province = await api.getData('http://localhost:8080/api/location/province/' + district.provinceId);
        // inner_html += '<li onclick ="getId(this.id)" style="cursor: pointer" class="list-group-item link-class"' + 'id="districtId-' + data.districts[j] +'"><i class="fa fa-map-marker" aria-hidden="true"></i><p>'+district.name+', '+ 
        // province.name + '</p><br><span class="text-muted">'+countRoom+' Chỗ ở</span></li>';
        inner_html += `
        <li onclick ="getId(this.id)" style="cursor: pointer" class="list-group-item link-class d-flex" id="districtId-${data.districts[j]}">
          <div class="d-flex justify-content-center align-items-center mr-4" style="height:40px; width:40px">
            <i class="fa fa-map-marker fa-lg" aria-hidden="true" font-size="150px"></i>
          </div>
          <div>
            <p class="mb-2">${district.name}, ${province.name}</p>
            <span class="text-muted" style="font-size: 12px">${countRoom} Chỗ ở</span>
          </div>
        </li>
        `
        i++;
      }
      for (let j = 0; j < data.wards.length; j++) {
        if(i >= 5) break;
        let ward = await api.getData('http://localhost:8080/api/location/ward/' + data.wards[j]);
        let district = ward.district.name;
        let countRoom = await api.getData('http://localhost:8080/search/countRoom/ward/' + data.wards[j]);
        let province = ward.province.name;
        // inner_html += '<li onclick ="getId(this.id)" style="cursor: pointer" class="list-group-item link-class"' + 'id="location-' + data.wards[j] +'"><i class="fa fa-map-marker" aria-hidden="true"></i><p>'+ward.name + ', ' + 
        // district+', '+ province + '</p><br><span class="text-muted">'+countRoom+' Chỗ ở</span></li>';
        inner_html += `
        <li onclick ="getId(this.id)" style="cursor: pointer" class="list-group-item link-class d-flex" id="location-${data.wards[j]}">
          <div class="d-flex justify-content-center align-items-center mr-4" style="height:40px; width:40px">
            <i class="fa fa-map-marker fa-lg" aria-hidden="true" font-size="150px"></i>
          </div>
          <div>
            <p class="mb-2">${ward.name}, ${district}, ${province}</p>
            <span class="text-muted" style="font-size: 12px">${countRoom} Chỗ ở</span>
          </div>
        </li>
        `
        i++;
      }

    result.innerHTML = inner_html;
    } else {
      result.innerHTML = '';
      params.delete('provinceId')
      params.delete('districtId')
      params.delete('location')
    }

  });  

  document.getElementById('search-submit').addEventListener('submit', (e) => {
    e.preventDefault()
    if (openFilter !== ''){
      window.location.href = "./filter.html?" + params.toString()
    } else {
      window.location.reload();
    }
  })

  const places = await api.getFavoritePlace()
  let homestayPlace = '';
  let countRoom
  for (let i = 0; i < 5; i++){
    if (places[i].type === 'district'){
      countRoom = await api.getCountRoomDistrict(places[i].id)
    } else if (places[i].type === 'province'){
      countRoom = await api.getCountRoom(places[i].id)
    }
    homestayPlace += `
    <li class="place__item">
    <a href="./filter.html?&${places[i].type}Id=${places[i].id}">
      <img src="../static/images/favoriteHomestay/${i+1}.png" alt="" class="place__image">
      <div class="place__name">${places[i].name}</div>
      <div class="place__countroom">${countRoom} phòng</div>
    </a>
  </li>
    `
  }
  document.querySelector('.place__group').innerHTML = homestayPlace

  let homestayLink = `<h3 class="footer__caption">TOP HOMESTAY ĐƯỢC YÊU THÍCH</h3>`
  places.forEach(place => {
    homestayLink += `
    <p class="footer__item">
      <a href="./filter.html?&${place.type}Id=${place.id}" style="text-decoration:none; color:black">Homestay ${place.name}</a>
    </p>
    `
  })
  document.getElementById('favorite').innerHTML = homestayLink
})

function getId(id) {
  let query = document.querySelector('#' + id + ' > div > p').textContent;
  document.getElementById('search').value = query;
  document.getElementById('result').innerHTML = '';
  let searchQuery = id.split("-");
  if (searchQuery[0] == "room") {
    window.open("./roomDetail.html?roomId="+searchQuery[1]);
  } else {
    openFilter = `${searchQuery[0]}=${searchQuery[1]}`;
    if (searchQuery[0] === 'provinceId'){
      params.set('provinceId', searchQuery[1])
      params.delete('districtId')
      params.delete('location')
    } else if (searchQuery[0] === 'districtId'){
      params.set('districtId', searchQuery[1])
      params.delete('provinceId')
      params.delete('location')
    } else if (searchQuery[0] === 'location'){
      params.set('location', searchQuery[1])
      params.delete('provinceId')
      params.delete('districtId')
    }
  }
  console.log(params.toString())
  console.log(openFilter + getParam())
}

function loadCountGuess(){
  document.getElementById('delete-nbGuess').addEventListener('click', () => {
    document.getElementById('count-adult').value = ''
    document.getElementById('count-children').value = ''
    document.getElementById('showGuess').textContent = 'Số khách'
    params.delete('childrenCount')
    params.delete('adultCount')
    url.search = params.toString()
    window.history.pushState({}, '', url);
  })
  document.getElementById('apply-nbGuess').addEventListener('click', () => {
    let countAdult = document.getElementById('count-adult').value
    let countChildren = document.getElementById('count-children').value
    if (countAdult == '' && countChildren == '') {
      alert("Vui lòng chọn số lượng khách.");
      return;
    }
    
    if (countAdult == '') {
      countAdult = 0;
      alert("Vui lòng chọn ít nhất 1 người lớn.");
      return;
    } 
    let totalGuess = 0
    if (countAdult !== '' || countChildren !== ''){
      if (countChildren > 0){
        params.set('childrenCount', countChildren)
        totalGuess += parseInt(countChildren)
      } else {
        params.delete('childrenCount');
      }
      if (countAdult > 0){
        params.set('adultCount', countAdult)
        totalGuess += parseInt(countAdult)
      }
      url.search = params.toString()
      window.history.pushState({}, '', url);
      document.getElementById('showGuess').textContent = `${totalGuess} khách`
    }
  })
}

function logout() {
  fetch("http://localhost:8080/api/auth/logout", {
    credentials: 'include'
  });
  console.log("Logout");
  window.location.reload();
}

function checkReservation() {

  $('input[name="daterange"]').daterangepicker({
    autoUpdateInput: false,
    opens: 'left',
    locale: {
      cancelLabel: 'Xóa',
      applyLabel: 'Áp dụng'
    }
  });

  $('input[name="daterange"]').on("apply.daterangepicker", function (e, picker) {

    // Get the selected bound dates.
    let startDate = picker.startDate
    let endDate = picker.endDate
    start = startDate.format("YYYY-MM-DD");
    end = endDate.format("YYYY-MM-DD");
    if (start == end) {
      alert("Ngày nhận phòng và trả phòng không thể trùng nhau.");
      start = null;
      end = null;
      return;
    }
    params.set('checkinDate', startDate.format("YYYY-MM-DD"))
    params.set('checkoutDate', endDate.format("YYYY-MM-DD"))
    url.search = params.toString()
    window.history.pushState({}, '', url)
    $(this).val(startDate.format('MMM D') + "-" + endDate.format('MMM D'));
    getParam()
  });

  $('input[name="daterange"]').on('cancel.daterangepicker', function (ev, picker) {
    $(this).val("Ngày");
    params.delete('checkinDate')
    params.delete('checkoutDate')
    url.search = params.toString()
    window.history.pushState({}, '', url)
    start = ''
    end = ''
  });
};

function getParam() {
  let param ='';
  if (start !== '' && end !== '') {
    param += `&checkinDate=${start}&checkoutDate=${end}`;
  } 
  let countAdult = document.getElementById('count-adult').value
  let countChildren = document.getElementById('count-children').value
  if (countAdult !== ''){
    param += `&adultCount=${countAdult}`
  }
  if (countChildren !== ''){
    param += `&childrenCount=${countChildren}`
  }
  return param;
}