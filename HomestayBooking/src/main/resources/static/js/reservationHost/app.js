var url = new URL(window.location.href);
var hostId = url.searchParams.get("hostId");
window.addEventListener('DOMContentLoaded', async (event) => {
  const api = new API();
  let typeName = {
    1: 'Khách sạn',
    2: 'Căn hộ',
    3: 'Homestay'
  }
  let user = await fetch('http://localhost:8080/api/auth/user', {
    credentials: 'include'
  });
  user = await user.json();
  document.querySelector("#name").textContent = user.last_name + ' ' + user.first_name;
  const data = await api.getData('http://localhost:8080/api/reservation/host/' + hostId);
  let temp = "";
  for (let i = 0; i < data.length; i++) {
    let stt = i + 1;
    let reservation = data[i];
    let room = reservation.roomId;
    let guest = reservation.guestId;
    let payment = reservation.paymentMethod.name;
    let checkinDate = new Date(reservation.checkinDate);
    checkinDate = checkinDate.toLocaleDateString();
    let checkoutDate = new Date(reservation.checkoutDate);
    checkoutDate = checkoutDate.toLocaleDateString();
    temp += "<tr>";
    temp += "<td class='stt'>" + stt + "</td>";
    temp += "<td class='name'>" + room.name + "</td>";
    temp += "<td class='type'>" + typeName[room.type] + "</td>";
    temp += "<td class='address'>" + room.location.name + ", " + room.location.district.name + ", " + room.location.province.name + "</td>";
    temp += "<td class='guestName'>" + guest.last_name + ' ' + guest.first_name + "</td>";
    temp += "<td class='phone'>" + guest.phone + "</td>";
    temp += "<td class='phone'>" + reservation.guestCount + "</td>";
    temp += "<td class='checkinDate'>" + checkinDate + "</td>";
    temp += "<td class='checkoutDate'>" + checkoutDate + "</td>";
    temp += "<td class='price'>" + reservation.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "</td>";
    temp += "<td class='paymentMethod'>" + payment + "</td>";
  }
  document.getElementById("reservation_list").addEventListener('click', function() {
    window.location.href = "./reservationHost.html?hostId=" + hostId;
  })
  document.getElementById("data").innerHTML = temp;
});
