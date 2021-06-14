var pageNumber = 0;
var defaultApi;
var totalItems;
const room = new Room;
window.addEventListener('DOMContentLoaded', async (event) => {
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

  function parse_query_string(query) {
    var vars = query.split("&");
    var query_string = {};
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      var key = decodeURIComponent(pair[0]);
      var value = decodeURIComponent(pair[1]);
      // If first entry with this name
      if (typeof query_string[key] === "undefined") {
        query_string[key] = decodeURIComponent(value);
        // If second entry with this name
      } else if (typeof query_string[key] === "string") {
        var arr = [query_string[key], decodeURIComponent(value)];
        query_string[key] = arr;
        // If third or later entry with this name
      } else {
        query_string[key].push(decodeURIComponent(value));
      }
    }
    return query_string;
  }

  var query = window.location.search.substring(1);
  var qs = parse_query_string(query);
  let provinceID = qs.provinceId

  const api = new API;

  let provinceName;
  const provinces = await api.getProvince();
  provinces.forEach(province => {
    if (province.id == provinceID) {
      provinceName = province.name
    }
  })
  document.getElementById("location").textContent = provinceName;
  document.getElementById("countRoom").textContent = await api.getCountRoom(provinceID);

  defaultApi = `http://localhost:8080/search?provinceId=${provinceID}`


  let data = await room.getRoomAPI(defaultApi)
  room.showRoom(data)

  districts = await api.getDistrict(provinceID);
  showDistrict(districts)

  filterByRoomType(defaultApi, room)
  filterByDistrict(defaultApi, room)
  filterByPrice(defaultApi, room)
  filterByMore(defaultApi, room)
  filterByNumberGuess(defaultApi, room)
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

function filterByNumberGuess(defaultApi, room){
  // filter price
  document.getElementById('delete-nbGuess').addEventListener('click', async(e) => {
    pageNumber = 0;
    document.getElementById('count-adult').value = ''
    document.getElementById('count-children').value = ''
    let newApi = writeApi(defaultApi)
    let data = await room.getRoomAPI(newApi);
    room.showRoom(data)
    document.getElementById("countRoom").textContent = totalItems
  })
  document.getElementById('apply-nbGuess').addEventListener('click', async (e) => {
    pageNumber = 0;
    let newApi = writeApi(defaultApi)
    console.log(newApi)
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