var start;
var end;

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
      let hostId = await fetch("http://localhost:8080/api/user/host/" + user.id);
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
  let query = document.querySelector('#' + id + " > div > p").textContent;
  document.getElementById('search').value = query;
  document.getElementById('result').innerHTML = '';
  let searchQuery = id.split("-");
  if (searchQuery[0] == "room") {
    window.open("./roomDetail.html?roomId="+searchQuery[1]+ getParam());
  }   else if (searchQuery[0] === "provinceId"){
    window.open("./filter.html?&provinceId="+searchQuery[1]+getParam());
  }
}

function loadCountGuess(){
  document.getElementById('delete-nbGuess').addEventListener('click', () => {
    document.getElementById('count-adult').value = ''
    document.getElementById('count-children').value = ''
    document.getElementById('showGuess').textContent = 'Số khách'
  })
  document.getElementById('apply-nbGuess').addEventListener('click', () => {
    let countAdult = document.getElementById('count-adult').value
    let countChildren = document.getElementById('count-children').value
    let totalGuess
    if (countAdult !== '' || countChildren !== ''){
      console.log(countChildren, countAdult)
      if (countAdult !== '' && countChildren !== ''){
        totalGuess = parseInt(countAdult) + parseInt(countChildren)
      } else {
        totalGuess = countAdult === '' ? parseInt(countChildren) : parseInt(countAdult)
      }
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
    $(this).val(startDate.format('MMM D') + "-" + endDate.format('MMM D'));
    getParam()
  });

  $('input[name="daterange"]').on('cancel.daterangepicker', function (ev, picker) {
    $(this).val("Ngày");
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
    param += `&countAdult=${countAdult}`
  }
  if (countChildren !== ''){
    param += `&countChildren=${countChildren}`
  }
  return param;
}