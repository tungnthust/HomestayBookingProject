window.addEventListener('DOMContentLoaded', async (event) => {
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

  let defaultApi = `http://localhost:8080/search?provinceId=${provinceID}`

  const room = new Room;
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
    document.getElementById('count-adult').value = ''
    document.getElementById('count-children').value = ''
    let newApi = writeApi(defaultApi)
    let data = await room.getRoomAPI(newApi);
    room.showRoom(data)
    document.getElementById("countRoom").textContent = data.length
  })
  document.getElementById('apply-nbGuess').addEventListener('click', async (e) => {
    let newApi = writeApi(defaultApi)
    console.log(newApi)
    data = await room.getRoomAPI(newApi);
    room.showRoom(data)
    document.getElementById("countRoom").textContent = data.length
  })
}

function filterByRoomType(defaultApi, room){
    // filter roomType
    document.getElementById('delete-roomType').addEventListener('click', async(e) => {
      let checkRoomType = document.getElementsByName('roomType')
      checkRoomType.forEach(box => {
        if(box.checked){
          box.checked = false;
        }
      })
      let newApi = writeApi(defaultApi)
      let data = await room.getRoomAPI(newApi);
      room.showRoom(data)
      document.getElementById("countRoom").textContent = data.length
    })
    document.getElementById('apply-roomType').addEventListener('click', async (e) => {
      let newApi = writeApi(defaultApi)
      console.log(newApi)
      data = await room.getRoomAPI(newApi);
      room.showRoom(data)
      document.getElementById("countRoom").textContent = data.length
    })
}

function filterByPrice(defaultApi, room){
    // filter price
    document.getElementById('delete-price').addEventListener('click', async(e) => {
      document.getElementById('max-price').value = ''
      document.getElementById('min-price').value = ''
      let newApi = writeApi(defaultApi)
      let data = await room.getRoomAPI(newApi);
      room.showRoom(data)
      document.getElementById("countRoom").textContent = data.length
    })
    document.getElementById('apply-price').addEventListener('click', async (e) => {
      let newApi = writeApi(defaultApi)
      console.log(newApi)
      data = await room.getRoomAPI(newApi);
      room.showRoom(data)
      document.getElementById("countRoom").textContent = data.length
    })
}

function filterByDistrict(defaultApi, room){
    // filter districts
    document.getElementById('delete-region').addEventListener('click', async(e) => {
      let checkDistrict = document.getElementsByName('districts')
      checkDistrict.forEach(box => {
        if(box.checked){
          box.checked = false;
        }
      })
      let newApi = writeApi(defaultApi)
      let data = await room.getRoomAPI(newApi);
      room.showRoom(data)
      document.getElementById("countRoom").textContent = data.length
    })
    document.getElementById('apply-region').addEventListener('click', async (e) => {
      let newApi = writeApi(defaultApi)
      console.log(newApi)
      data = await room.getRoomAPI(newApi);
      room.showRoom(data)
      document.getElementById("countRoom").textContent = data.length
    })
}

function filterByMore(defaultApi, room){
  // filter price
  document.getElementById('delete-more').addEventListener('click', async(e) => {
    let newApi = writeApi(defaultApi)
    let data = await room.getRoomAPI(newApi);
    room.showRoom(data)
    document.getElementById("countRoom").textContent = data.length
  })
  document.getElementById('apply-more').addEventListener('click', async (e) => {
    let newApi = writeApi(defaultApi)
    console.log(newApi)
    data = await room.getRoomAPI(newApi);
    room.showRoom(data)
    document.getElementById("countRoom").textContent = data.length
  })
}

function writeApi(defaultApi){
  let newApi = defaultApi

  // filter by number of guest
  let countAdult = document.getElementById('count-adult').value
  let countChildren = document.getElementById('count-children').value
  // let countBaby = document.getElementById('count-baby').value
  if (countAdult > 0){
    newApi += `&adultCount=${countAdult}`
  }
  if (countChildren > 0){
    newApi += `&childrenCount=${countChildren}`
  }
  // if (countBaby > 0){
  //   newApi += `&max_price=${maxPrice}`
  // }

  // filter by room type
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