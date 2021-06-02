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
  let provinceID = qs.sid
  document.getElementById("location").textContent = qs.location;  
  document.getElementById("countRoom").textContent = await getCountRoom(provinceID)

  let defaultApi = `http://localhost:8080/search?provinceId=1`

  const room = new Room;
  const data = await room.getRoomAPI(defaultApi)
  data.forEach(function(dat){
    console.log(dat)
  })
});

async function getCountRoom(provinceID) {
  const countRoomResponse = await fetch(`http://localhost:8080/search/countRoom/${provinceID}`);
  const countRoom = await countRoomResponse.json();
  return countRoom
}