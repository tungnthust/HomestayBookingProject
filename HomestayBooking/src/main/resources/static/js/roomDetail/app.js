var setDate = false;
var start;
var end;
var hostId = '';
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
    hostId = await fetch("http://localhost:8080/api/user/host/" + user.id);
    hostId = await hostId.text();
    document.getElementById("new-user").style.display = "none";
    document.getElementById("username").style.display = "inline";
    document.querySelector("#name").textContent = user.last_name + ' ' + user.first_name;
  } else {
    document.getElementById("new-user").style.display = "inline";
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
  let roomId = qs.roomId

  const ui = new UI
  const data = await ui.getRoomDetail(roomId)
  console.log(data)
  ui.showDetail(data)
  const roomArr = await getReservation(roomId)

  checkReservation(roomArr);
  checkNumberGuess()

  document.getElementById('place-order').addEventListener('click', (e) => {
    if (login == true) {
    let arrDate = $('input[name="daterange"]').val().split(' - ')
    let startDate = arrDate[0].replace( /(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3");
    let endDate = arrDate[1].replace( /(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3");
    let dayLength = difference(new Date(startDate), new Date(endDate));
    let countAdult = document.getElementById('count-adult').value
    let countChildren = document.getElementById('count-children').value
    if (start == null) {
      alert("Vui l??ng ch???n ng??y nh???n ph??ng v?? tr??? ph??ng.");
      return;
    }
    if (countAdult == '' && countChildren == '') {
      alert("Vui l??ng ch???n s??? l?????ng kh??ch.");
      return;
    }
    if (countChildren == '') {
      countChildren = 0;
    } else {
      countChildren = parseInt(countChildren);
    }
    if (countAdult == '') {
      countAdult = 0;
      alert("Vui l??ng ch???n ??t nh???t 1 ng?????i l???n.");
      return;
    } else {
      countAdult = parseInt(countAdult);
    }
    let nbGuess = countChildren + countAdult;
    console.log(nbGuess);
    if (dayLength == 0) {
      alert("Ng??y nh???n ph??ng v?? tr??? ph??ng kh??ng th??? tr??ng nhau.")
      return;
      $('#payment-modal').modal('hide')
    } else if (nbGuess <= 0) {
      alert("Please type number of guests")
      return;
      $('#payment-modal').modal('hide')
    } else {
      let div = document.querySelector('.modal')
      div.setAttribute("id", "payment-modal")
      let days = parseInt(dayLength)
      let totalPrice = days * parseInt(data.pricePerDay)
      let output = `
      <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Chi ti???t ?????t ph??ng v?? thanh to??n</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="d-flex justify-content-between">
            <div id="order-room">
              <p id="order-room-name"><strong>${data.name}</strong></p>
              <p id="order-location">${data.location.name}, ${data.location.district.name}, ${data.location.province.name}</p>
            </div>
            <div id="order-img" style="width: 140px; height:80px">
              <img style="width: 100%; height: 100%" src="${data.images[0].url}" alt="">
            </div>
          </div>
          <hr>
          <div class="d-flex flex-column">
            <div class="mb-2">
              <i class="fa fa-calendar mr-4" aria-hidden="true"></i>
              <span>${days} ????m ${$('input[name="daterange"]').val()}</span>
            </div>
            <div>
              <i class="fa fa-user mr-4" aria-hidden="true"></i>
              <span>${nbGuess} kh??ch</span>
            </div>
          </div>
          <hr>
          <div class="d-flex justify-content-between">
            <span><strong>T???ng ti???n</strong></span>
            <span><strong>${totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}/??</strong></span>
          </div>
          <hr>
          <label for="payment-method">Ph????ng th???c thanh to??n:</label>
          <select class="form-control" id="payment-method">
            <option value="1">Momo</option>
            <option value="2">Zalopay</option>
            <option value="3">Visa</option>
            <option value="4" selected>Master Card</option>
          </select>
        </div>
        <div class="modal-footer d-flex justify-content-between">
          <button type="button" class="btn btn-dark" data-dismiss="modal">H???y</button>
          <button type="button" id="order" class="btn btn-info" data-toggle="modal" data-target="#notify">Thanh to??n</button>
        </div>
      </div>
    </div>
      `
      div.innerHTML = output
    }
    document.getElementById('order').addEventListener('click', async () => {
      
      console.log(data)
      console.log(arrDate)
      // console.log(nbGuess);
      let checkinDate = formatDate(arrDate[0]);
      let checkoutDate = formatDate(arrDate[1]);
      let orderTime = new Date();
      let jsonData = {
        "roomId": data.id,
        "guestId": user.id,
        "checkinDate": checkinDate,
        "checkoutDate": checkoutDate,
        "guestCount": parseInt(nbGuess),
        "price": data.pricePerDay,
        "paymentMethodId": parseInt(document.getElementById('payment-method').value),
        "orderTime": orderTime
      }
      console.log(jsonData);

      fetch(`http://localhost:8080/api/reservation/addReservation`, {
        method: 'POST',
        headers: {"Content-type": "application/json;charset=UTF-8"},
        body: JSON.stringify(jsonData)
      })

    })

    e.preventDefault();
  } else {
    window.location.href = "./login.html";
  }
    
  })
})

function checkReservation(roomArr) {
  var disabledStarts = [];
  var disabledEnds = [];
  roomArr.forEach(room => {
    let checkinDate = formatDate(room.checkinDate.split('T')[0]);
    let checkoutDate = formatDate(room.checkoutDate.split('T')[0]);
    disabledStarts.push(checkinDate);
    disabledEnds.push(checkoutDate);
  })
  console.log(disabledStarts);
  $('input[name="daterange"]').daterangepicker({
    locale: {
      cancelLabel: 'X??a',
      applyLabel: '??p d???ng',
    }
  });

  
  $('input[name="daterange"]').daterangepicker({
    autoUpdateInput: false,
    opens: 'left',
    locale: {
      cancelLabel: 'X??a',
      applyLabel: '??p d???ng'
    },
    isInvalidDate: function (date) {
      let tempDate = date.format('YYYY-MM-DD');
      let today = new Date();
      today = today.toISOString().split('T')[0];
      if (tempDate < today) {
        return true;
      }
      for (let i = 0; i < disabledStarts.length; i++) {
        if (tempDate >= disabledStarts[i] && tempDate <= disabledEnds[i]) {
          return true;
        }
      }

    }
  }, function (start, end, label) {

    console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format(
      'YYYY-MM-DD'));
  });

  $('input[name="daterange"]').on("apply.daterangepicker", function (e, picker) {
    // Get the selected bound dates.
    var startDate = picker.startDate.format('YYYY-MM-DD')
    start = picker.startDate.format('DD/MM/YYYY');
    var endDate = picker.endDate.format('YYYY-MM-DD')
    end = picker.endDate.format('DD/MM/YYYY');
    if (start == end) {
      alert("Ng??y nh???n ph??ng v?? tr??? ph??ng kh??ng th??? tr??ng nhau.");
      start = null;
      end = null;
      return;
    }
    $(this).val(`${start} - ${end}`);
    console.log(startDate + " to " + endDate);
    setDate = true;
    // Compare the dates again.
    var clearInput = false;
    for (i = 0; i < disabledStarts.length; i++) {
      if (startDate < disabledStarts[i] && endDate > disabledEnds[i]) {
        console.log("Found a disabled Date in selection!");
        clearInput = true;
      }
    }

    // If a disabled date is in between the bounds, clear the range.
    if (clearInput) {

      // To clear selected range (on the calendar).
      var today = new Date();
      $(this).data('daterangepicker').setStartDate(today);
      $(this).data('daterangepicker').setEndDate(today);

      // To clear input field and keep calendar opened.
      document.getElementById('date').value = `${today.toLocaleDateString()} - ${today.toLocaleDateString()}`;
      console.log("Cleared the input field...");
      setDate = false;
      // Alert user!
      alert("Kho???ng th???i gian b???n ch???n ch???a ng??y ???? ???????c ?????t tr?????c.");
      start = null;
      end = null;
      return;
    }
  });
  
  $('input[name="daterange"]').on('cancel.daterangepicker', function (ev, picker) {
    let today = new Date();
    setDate = false;
    document.getElementById('date').value = `${today.toLocaleDateString()} - ${today.toLocaleDateString()}`;
  });

  let today = new Date();
  document.getElementById('date').value = `${today.toLocaleDateString()} - ${today.toLocaleDateString()}`;
};

document.getElementById("date").addEventListener('focusout', function() {
  if (setDate) {
    this.value = `${start} - ${end}`;
  }
  else {
    let today = new Date();
    this.value =  `${today.toLocaleDateString()} - ${today.toLocaleDateString()}`;
  }
})

async function getReservation(roomId) {
  const roomResponse = await fetch(`http://localhost:8080/api/reservation/room/${roomId}`);
  const rooms = await roomResponse.json();
  return rooms
}

function difference(date1, date2) {
  const date1utc = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const date2utc = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
  day = 1000 * 60 * 60 * 24;
  return (date2utc - date1utc) / day
}

function checkNumberGuess() {
  document.getElementById('delete-nbGuess').addEventListener('click', () => {
    document.getElementById('count-adult').value = ''
    document.getElementById('count-children').value = ''
  })
  document.getElementById('apply-nbGuess').addEventListener('click', () => {
    let countAdult = document.getElementById('count-adult').value
    let countChildren = document.getElementById('count-children').value
    if (countAdult == '' && countChildren == '') {
      alert("Vui l??ng ch???n s??? l?????ng kh??ch.");
      return;
    }
    if (countChildren == '') {
      countChildren = 0;
    } else {
      countChildren = parseInt(countChildren);
    }
    if (countAdult == '') {
      countAdult = 0;
      alert("Vui l??ng ch???n ??t nh???t 1 ng?????i l???n.");
      return;
    } else {
      countAdult = parseInt(countAdult);
    }
  })
}


function logout() {
  fetch("http://localhost:8080/api/auth/logout", {
    credentials: 'include'
  });
  window.location.reload();
}

function formatDate(date) {
  date = date.replace( /(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3");
  let newDate = new Date(date);
  newDate.setDate(newDate.getDate() + 1);
  return newDate.toISOString().slice(0,10);
}