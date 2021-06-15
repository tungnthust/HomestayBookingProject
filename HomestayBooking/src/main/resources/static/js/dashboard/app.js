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
  const data = await api.getData('http://localhost:8080/api/room/host/' + hostId);
  let temp = "";
  for (let i = 0; i < data.length; i++) {
    let stt = i + 1;
    let room = data[i];
    temp += "<tr>";
    temp += "<td class='stt'>" + stt + "</td>";
    temp += "<td class='name'>" + room.name + "</td>";
    temp += "<td class='type'>" + typeName[room.type] + "</td>";
    temp += "<td class='area'>" + room.area + "</td>";
    temp += "<td class='bedroomCount'>" + room.bedroomCount + "</td>";
    temp += "<td class='address'>" + room.location.name + ", " + room.location.district.name + ", " + room.location.province.name + "</td>";
    temp += "<td class='price'>" + room.pricePerDay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "</td>";
    temp += '<td><button type="button" class="btn btn-success btn-update" data-id="'+ room.id + '">Sửa</button></td>';
    temp += '<td><button type="button" class="btn btn-danger btn-delete-modal" data-id="'+ room.id + '" data-toggle="modal" data-target="#confirm">Xóa</button></td>';
    // temp += "<td>" + u. + "</td>";
  }

  document.getElementById("data").innerHTML = temp;

  $(document).on('click', '.btn-update', function() {
    let id = $(this).data('id');
    window.open("./updateRoom.html?id=" + id);
  });
  let id = -1;
  $(document).on('click', '.btn-delete-modal', function() {
    id = $(this).data('id');
  });
  async function deleteRoom() {
    await api.deleteData('http://localhost:8080/api/room/' + id);
  };

  document.getElementById("delete-success").addEventListener("click", function() {
    deleteRoom();
    window.location.reload();
  })
  document.getElementById("delete-success-close").addEventListener("click", function() {
    deleteRoom();
    window.location.reload();
  })
});


function logout() {
  fetch("http://localhost:8080/api/auth/logout", {
    credentials: 'include'
  });
  window.location.href = "./main.html";
}