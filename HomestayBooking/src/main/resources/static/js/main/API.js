class API {
  async getProvince(){
    const provinceResponse = await fetch(`http://localhost:8080/api/location/provinces`);
    const provinces = await provinceResponse.json();
    return provinces
  }

  async getDistrict(provinceID){
    const districtResponse = await fetch(`http://localhost:8080/api/location/districts/${provinceID}`);
    const districts = await districtResponse.json();
    return districts
  }

  async getWard(districtID){
    const wardResponse = await fetch(`http://localhost:8080/api/location/wards/${districtID}`)
    const wards = await wardResponse.json();
    return wards
  }

  async postData(url, data) {
    // console.log(data);
    const response = await fetch(url, {
      method: 'POST',
      body: data
    })
  }

  async getFavoritePlace(){
    const response = await fetch('../static/js/main/data.json')
    const res = await response.json()
    return res
  }

  async getCountRoom(provinceID) {
    const countRoomResponse = await fetch(`http://localhost:8080/search/countRoom/${provinceID}`);
    const countRoom = await countRoomResponse.json();
    return countRoom
  }

  async getCountRoomDistrict(districtID) {
    const countRoomResponse = await fetch(`http://localhost:8080/search/countRoom/district/${districtID}`);
    const countRoom = await countRoomResponse.json();
    return countRoom
  }

  async getData(url) {
    // console.log(data);
    const response = await fetch(url, {
      method: 'GET'
    })
    const roomDetail = await response.json();
    return roomDetail;
  }
}