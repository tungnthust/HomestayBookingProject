hostId = 1;
window.addEventListener('DOMContentLoaded', async (event) => {
  const api = new API();
  let typeName = {
    1: 'Khách sạn',
    2: 'Căn hộ',
    3: 'Homestay'
  }
  const data = await api.getData('http://localhost:8080/api/room/host/' + hostId);
  let temp = "";
  for (let i = 0; i < data.length; i++) {
    let room = data[i];
    temp += "<tr>";
    temp += "<td>" + room.name + "</td>";
    temp += "<td>" + typeName[room.type] + "</td>";
    temp += "<td>" + room.area + "</td>";
    temp += "<td>" + room.bedroomCount + "</td>";
    temp += "<td>" + room.location.name + ", " + room.location.district.name + ", " + room.location.province.name + "</td>";
    temp += "<td>" + room.pricePerDay + "</td>";
    temp += '<td><button type="button" class="btn btn-success btn-update" data-id="'+ room.id + '">Update</button></td>';
    temp += '<td><button type="button" class="btn btn-danger btn-delete-modal" data-id="'+ room.id + '" data-toggle="modal" data-target="#confirm">Delete</button></td>';
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
  })
  document.getElementById("delete-success-close").addEventListener("click", function() {
    deleteRoom();
  })
});

