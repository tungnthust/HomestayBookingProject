var pageNumber = 0;
var defaultApi;
var totalItems = 0;
var sortType = "";
var url = new URL(window.location.href)
var params = url.searchParams
const api = new API();  
const room = new Room;
const result = document.getElementById('result');
var start = '';
var end = '';
var openFilter = '';
var hostId = '';
window.addEventListener('DOMContentLoaded', async (event) => {
  loadCountGuess()
  checkReservation()
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
  const api = new API;  
  let name;
  let idCount;

  if (params.has('provinceId')){
    idCount = params.get('provinceId')
    let province = await api.getProvinceName(idCount);
    name = province.name
    defaultApi = `http://localhost:8080/search?provinceId=${idCount}`
    districts = await api.getDistrict(idCount);
    showDistrict(districts)

  } else if (params.has('districtId')){
    idCount = params.get('districtId')
    let district = await api.getDistrictName(idCount);
    name = district.name

    defaultApi = `http://localhost:8080/search?districtId=${idCount}`
    wards = await api.getWard(idCount);
    showWard(wards)
    
  } else if (params.has('location')){
    idCount = params.get('location')
    let ward = await api.getWardName(idCount);
    console.log(ward.name)
    name = ward.name
    defaultApi = `http://localhost:8080/search?location=${idCount}`
    document.getElementById("region").style.display = 'none'
  }

  if (params.has('checkinDate')){
    let checkinDate = params.get('checkinDate')
    let chechoutDate = params.get('checkoutDate')
    defaultApi += `&checkinDate=${checkinDate}&checkoutDate=${chechoutDate}`
  } 
  if (params.has('adultCount')){
    let adultCount = params.get('adultCount');
    defaultApi += `&adultCount=${adultCount}`
  }
  if (params.has('childrenCount')){
    let childrenCount = params.get('childrenCount');
    defaultApi += `&childrenCount=${childrenCount}`
  }

  document.getElementById("location").textContent = name;
  let data = await room.getRoomAPI(defaultApi)
  document.getElementById("countRoom").textContent = totalItems;
  if (totalItems > 0) {
    room.showRoom(data)
  }
  document.title = `${totalItems} Homestay t???i ${name}`


  filterByRoomType(defaultApi, room)
  filterByDistrict(defaultApi, room)
  filterByPrice(defaultApi, room)
  filterByMore(defaultApi, room)
  filterByNumberGuess(defaultApi, room)

  document.getElementById('search-submit').addEventListener('submit', (e) => {
    e.preventDefault()
    if (openFilter !== ''){
      window.location.href = "./filter.html?" + params.toString()
    } else {
      window.location.reload();
    }
  })
});

function showDistrict(districts) {
  let output = ``
  districts.forEach(district => {
    output += `
        <li>
          <input type="checkbox" style="margin-left: 2rem" class="checkbox-location checkbox-input" name="districts" value="${district.id}">
          <label class="checkbox">${district.prefix} ${district.name}</label>
        </li>
      `
  })
  document.getElementById('region-list').innerHTML = output
}

function showWard(wards) {
  let output = ``
  wards.forEach(ward => {
    output += `
        <li>
          <input type="checkbox" style="margin-left: 2rem" class="checkbox-location checkbox-input" name="districts" value="${ward.id}">
          <label class="checkbox">${ward.prefix} ${ward.name}</label>
        </li>
      `
  })
  document.getElementById('region-list').innerHTML = output
}

function filterByNumberGuess(defaultApi, room){
  // filter price
  document.getElementById('delete-nbGuess').addEventListener('click', async(e) => {
    pageNumber = 0;
    document.getElementById('count-adult').value = ''
    document.getElementById('count-children').value = ''
    params.delete('childrenCount')
    params.delete('adultCount')
    url.search = params.toString()
    window.history.pushState({}, '', url);
    let newApi = writeApi(defaultApi)
    let data = await room.getRoomAPI(newApi);
    room.showRoom(data)
    document.getElementById("countRoom").textContent = totalItems
  })
  document.getElementById('apply-nbGuess').addEventListener('click', async (e) => {
    pageNumber = 0;
    let countAdult = document.getElementById('count-adult').value
    let countChildren = document.getElementById('count-children').value
    if (countAdult !== '' || countChildren !== ''){
      if (countChildren > 0){
        params.set('childrenCount', countChildren)
        // totalGuess += parseInt(countChildren)
      }
      if (countAdult > 0){
        params.set('adultCount', countAdult)
        // totalGuess += parseInt(countAdult)
      }
      url.search = params.toString()
      window.history.pushState({}, '', url);
      // document.getElementById('showGuess').textContent = `${totalGuess} kh??ch`
    }
    url.search = params.toString()
    window.history.pushState({}, '', url)    
    let newApi = writeApi(defaultApi)
    data = await room.getRoomAPI(newApi);
    room.showRoom(data)
    document.getElementById("countRoom").textContent = totalItems
  })
}

function filterByRoomType(defaultApi, room){
    // filter roomType
    document.getElementById('delete-roomType').addEventListener('click', async(e) => {
      pageNumber = 0;
      let checkRoomType = document.getElementsByName('roomType')
      checkRoomType.forEach(box => {
        if(box.checked){
          box.checked = false;
        }
      })
      let newApi = writeApi(defaultApi)
      let data = await room.getRoomAPI(newApi);
      room.showRoom(data)
      document.getElementById("countRoom").textContent = totalItems
    })
    document.getElementById('apply-roomType').addEventListener('click', async (e) => {
      pageNumber = 0;
      let newApi = writeApi(defaultApi)
      console.log(newApi)
      data = await room.getRoomAPI(newApi);
      room.showRoom(data)
      console.log(data)
      document.getElementById("countRoom").textContent = totalItems
    })
}

function filterByPrice(defaultApi, room){
    // filter price
    document.getElementById('delete-price').addEventListener('click', async(e) => {
      pageNumber = 0;
      document.getElementById('max-price').value = ''
      document.getElementById('min-price').value = ''
      let newApi = writeApi(defaultApi)
      let data = await room.getRoomAPI(newApi);
      room.showRoom(data)
      document.getElementById("countRoom").textContent = totalItems
    })
    document.getElementById('apply-price').addEventListener('click', async (e) => {
      pageNumber = 0;
      let newApi = writeApi(defaultApi)
      console.log(newApi)
      data = await room.getRoomAPI(newApi);
      room.showRoom(data)
      document.getElementById("countRoom").textContent = totalItems
    })
}

function filterByDistrict(defaultApi, room){
    // filter districts
    document.getElementById('delete-region').addEventListener('click', async(e) => {
      pageNumber = 0;
      let checkDistrict = document.getElementsByName('districts')
      checkDistrict.forEach(box => {
        if(box.checked){
          box.checked = false;
        }
      })
      let newApi = writeApi(defaultApi)
      let data = await room.getRoomAPI(newApi);
      room.showRoom(data)
      document.getElementById("countRoom").textContent = totalItems
    })
    document.getElementById('apply-region').addEventListener('click', async (e) => {
      pageNumber = 0;
      let newApi = writeApi(defaultApi)
      console.log(newApi)
      data = await room.getRoomAPI(newApi);
      room.showRoom(data)
      document.getElementById("countRoom").textContent = totalItems
    })
}

function filterByMore(defaultApi, room){
  // filter price
  document.getElementById('delete-more').addEventListener('click', async(e) => {
    pageNumber = 0;
    document.getElementById('count-bed').value = ''
    document.getElementById('count-bedroom').value = ''
    document.getElementById('count-bathroom').value = ''
    let boxes = document.getElementsByName('facility')
    boxes.forEach(box => {
      if (box.checked){
        box.checked = false
        console.log(box.checked)
      }
    })
    let newApi = writeApi(defaultApi)
    let data = await room.getRoomAPI(newApi);
    room.showRoom(data)
    document.getElementById("countRoom").textContent = totalItems
  })
  document.getElementById('apply-more').addEventListener('click', async (e) => {
    pageNumber = 0;
    let newApi = writeApi(defaultApi)
    console.log(newApi)
    data = await room.getRoomAPI(newApi);
    room.showRoom(data)
    document.getElementById("countRoom").textContent = totalItems
  })
}

function writeApi(defaultApi){
  let newApi = defaultApi

  if (pageNumber > 0) {
    newApi += `&page=${pageNumber}`
  }

  if (sortType != "") {
    newApi += `&sort=${sortType}`;
  }
  // filter by number of guest
  let countAdult = document.getElementById('count-adult').value
  let countChildren = document.getElementById('count-children').value
  if (countAdult > 0){
    newApi += `&adultCount=${countAdult}`
  }
  if (countChildren > 0){
    newApi += `&childrenCount=${countChildren}`
  }
  let checkRoomType = document.getElementsByName('roomType')
  let arr = new Array()
  checkRoomType.forEach(box => {
    if(box.checked){
      arr.push(box.value)
    }
  })
  for(let i = 0; i < arr.length; i++){
    if (i == 0){
      newApi += `&type=${arr[i]}`
    } else {
      newApi += `,${arr[i]}`
    }
  }

  // filter by price
  let minPrice = document.getElementById('min-price').value
  let maxPrice = document.getElementById('max-price').value
  if (minPrice > 0){
    newApi += `&min_price=${minPrice}`
  }
  if (maxPrice > 0){
    newApi += `&max_price=${maxPrice}`
  }

  // filter by district
  let checkDistrict = document.getElementsByName('districts')
  arr = new Array()
  checkDistrict.forEach(box => {
    if(box.checked){
      arr.push(box.value)
    }
  })
  for(let i = 0; i < arr.length; i++){
    if (i == 0){
      newApi += `&districtId=${arr[i]}`
    } else {
      newApi += `,${arr[i]}`
    }
  }

  // filter by more
  let countBed = document.getElementById('count-bed').value
  let countBedroom = document.getElementById('count-bedroom').value
  let countBathroom = document.getElementById('count-bathroom').value
  if (countBed > 0){
    newApi += `&bedCount=${countBed}`
  }
  if (countBedroom > 0){
    newApi += `&bedroomCount=${countBedroom}`
  }
  if (countBathroom > 0){
    newApi += `&bathroomCount=${countBathroom}`
  }

  
  
  let checkFacility = document.getElementsByName('facility')
  arr = new Array()
  checkFacility.forEach(box => {
    if(box.checked){
      arr.push(box.value)
    }
  })
  for(let i = 0; i < arr.length; i++){
    if (i == 0){
      newApi += `&facilities=${arr[i]}`
    } else {
      newApi += `,${arr[i]}`
    }
  }
  return newApi
}



function logout() {
  fetch("http://localhost:8080/api/auth/logout", {
    credentials: 'include'
  });
  window.location.reload();
}

async function paginate(id) {
  pageNumber = parseInt(id.split('-')[1]);
  let newApi = writeApi(defaultApi);
  data = await room.getRoomAPI(newApi);
  room.showRoom(data)
  document.getElementById("countRoom").textContent = totalItems
}

async function prevPage() {
  pageNumber--;
  let newApi = writeApi(defaultApi);
  data = await room.getRoomAPI(newApi);
  room.showRoom(data)
  document.getElementById("countRoom").textContent = totalItems
}

async function nextPage() {
  pageNumber++;
  let newApi = writeApi(defaultApi);
  data = await room.getRoomAPI(newApi);
  room.showRoom(data)
  document.getElementById("countRoom").textContent = totalItems
}

async function sort(idType) {
  sortType = idType;
  let newApi = writeApi(defaultApi);
  data = await room.getRoomAPI(newApi);
  room.showRoom(data)
  document.getElementById("countRoom").textContent = totalItems
  document.getElementById("sortType").innerHTML = document.getElementById(idType).innerHTML;
  document.getElementById("sortDropdown").style.width = "25rem";
  document.getElementById("dropdown-menu").style.width = "25rem";
  document.getElementById("dropdown-menu").style.paddingLeft = "8rem";
}
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
            <span class="text-muted" style="font-size: 12px">${countRoom} Ch??? ???</span>
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

        inner_html += `
        <li onclick ="getId(this.id)" style="cursor: pointer" class="list-group-item link-class d-flex" id="districtId-${data.districts[j]}">
          <div class="d-flex justify-content-center align-items-center mr-4" style="height:40px; width:40px">
            <i class="fa fa-map-marker fa-lg" aria-hidden="true" font-size="150px"></i>
          </div>
          <div>
            <p class="mb-2">${district.name}, ${province.name}</p>
            <span class="text-muted" style="font-size: 12px">${countRoom} Ch??? ???</span>
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
        inner_html += `
        <li onclick ="getId(this.id)" style="cursor: pointer" class="list-group-item link-class d-flex" id="location-${data.wards[j]}">
          <div class="d-flex justify-content-center align-items-center mr-4" style="height:40px; width:40px">
            <i class="fa fa-map-marker fa-lg" aria-hidden="true" font-size="150px"></i>
          </div>
          <div>
            <p class="mb-2">${ward.name}, ${district}, ${province}</p>
            <span class="text-muted" style="font-size: 12px">${countRoom} Ch??? ???</span>
          </div>
        </li>
        `
        i++;
      }

    result.innerHTML = inner_html;
    } else {
      result.innerHTML = '';
    }

  });  

  document.getElementById('search-submit').addEventListener('submit', (e) => {
    console.log(openFilter);
    e.preventDefault()
    if (openFilter !== ''){
      window.location.href = "./filter.html?" + openFilter + getParam();
    } else {
      window.location.reload();
    }
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
    document.getElementById('showGuess').textContent = 'S??? kh??ch'
    params.delete('childrenCount')
    params.delete('adultCount')
    url.search = params.toString()
    window.history.pushState({}, '', url);
  })
  document.getElementById('apply-nbGuess').addEventListener('click', () => {
    let countAdult = document.getElementById('count-adult').value
    let countChildren = document.getElementById('count-children').value
    if (countAdult == '' && countChildren == '') {
      alert("Vui l??ng ch???n s??? l?????ng kh??ch.");
      return;
    }
    
    if (countAdult == '') {
      countAdult = 0;
      alert("Vui l??ng ch???n ??t nh???t 1 ng?????i l???n.");
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
      document.getElementById('showGuess').textContent = `${totalGuess} kh??ch`
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
      cancelLabel: 'X??a',
      applyLabel: '??p d???ng'
    }
  });

  $('input[name="daterange"]').on("apply.daterangepicker", function (e, picker) {

    // Get the selected bound dates.
    let startDate = picker.startDate
    let endDate = picker.endDate
    start = startDate.format("YYYY-MM-DD");
    end = endDate.format("YYYY-MM-DD");
    if (start == end) {
      alert("Ng??y nh???n ph??ng v?? tr??? ph??ng kh??ng th??? tr??ng nhau.");
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
    $(this).val("Ng??y");
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