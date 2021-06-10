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
  let roomId = qs.roomId

  const ui = new UI
  const data = await ui.getRoomDetail(roomId)
  console.log(data)
  ui.showDetail(data)

  const roomArr = await getReservation(roomId)

  checkReservation(roomArr);
  checkNumberGuess()
  
  console.log(roomArr)
  document.getElementById('place-order').addEventListener('click', (e) => {
    let arrDate = $('input[name="daterange"]').val().split(' - ')
    let dayLength = difference(new Date(arrDate[0]), new Date(arrDate[1]))
    let countAdult = document.getElementById('count-adult').value
    let countChildren = document.getElementById('count-children').value
    let nbGuess = countChildren + countAdult
    console.log(nbGuess);
    if (dayLength == 0){
      alert("Please select days")
      $('#payment-modal').modal('hide')
    } else if(nbGuess <= 0) {
      alert("Please type number of guests")
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
          <h5 class="modal-title" id="exampleModalLabel">Chi tiết đặt phòng và thanh toán</h5>
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
              <span>${days} đêm ${$('input[name="daterange"]').val()}</span>
            </div>
            <div>
              <i class="fa fa-user mr-4" aria-hidden="true"></i>
              <span>${nbGuess} khách</span>
            </div>
          </div>
          <hr>
          <div class="d-flex justify-content-between">
            <span><strong>Tổng tiền</strong></span>
            <span><strong>${totalPrice}/đ</strong></span>
          </div>
          <hr>
          <label for="payment-method">Phương thức thanh toán:</label>
          <select class="form-control" id="payment-method">
            <option value="1">Momo</option>
            <option value="2">Zalopay</option>
            <option value="3">Visa</option>
            <option value="4" selected>Master Card</option>
          </select>
          <div class="form-group" id="payment-infor">
            <label for="payment-type">Số điện thoại/Số thẻ</label>
            <input type="number" id="payment-type" class="form-control">
          </div>
        </div>
        <div class="modal-footer d-flex justify-content-between">
          <button type="button" class="btn btn-dark" data-dismiss="modal">Hủy</button>
          <button type="button" class="btn btn-info">Thanh toán</button>
        </div>
      </div>
    </div>
      `
      div.innerHTML = output
    }

    e.preventDefault();
  })
})

function checkReservation(roomArr) {

  var disabledStarts = [];
  var disabledEnds = [];
  roomArr.forEach(room => {
    disabledStarts.push(room.checkInDate)
    disabledEnds.push(room.checkoutDate)
  })

  $('input[name="daterange"]').daterangepicker({
    opens: 'left',
    isInvalidDate: function (date) {
      let tempDate = date.format('YYYY-MM-DD');
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
    var endDate = picker.endDate.format('YYYY-MM-DD')
    console.log(startDate + " to " + endDate);

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
      $(this).val("dd/mm/yyyy đến dd/mm/yyyy");
      console.log("Cleared the input field...");

      // Alert user!
      alert("Your range selection includes ordered dates!");
    }
  });

  $('input[name="daterange"]').daterangepicker({
    // autoUpdateInput: false,
    locale: {
        cancelLabel: 'Xóa',
        applyLabel: 'Áp dụng'
    }
  });

  $('input[name="daterange"]').on('cancel.daterangepicker', function(ev, picker) {
    $(this).val("dd/mm/yyyy đến dd/mm/yyyy");
  });
};

async function getReservation(roomId) {
  const roomResponse = await fetch(`http://localhost:8080/api/reservation/room/${roomId}`);
  const rooms = await roomResponse.json();
  return rooms
}

function difference(date1, date2) {  
  const date1utc = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const date2utc = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
    day = 1000*60*60*24;
  return(date2utc - date1utc)/day
}

function checkNumberGuess(){
  document.getElementById('delete-nbGuess').addEventListener('click', () => {
    document.getElementById('count-adult').value = ''
    document.getElementById('count-children').value = ''
  })
  document.getElementById('apply-nbGuess').addEventListener('click', () => {
    // console.log(document.getElementById());
  })
}