class API {
  async getProvince(){
    const provinceResponse = await fetch(`http://localhost:8080/api/location/provinces`);
    const provinces = await provinceResponse.json();
    return provinces
  }

  async getProvinceName(proID){
    const provinceResponse = await fetch(`http://localhost:8080/api/location/province/${proID}`);
    const provinces = await provinceResponse.json();
    return provinces
  }

  async getCountRoom(provinceID) {
    const countRoomResponse = await fetch(`http://localhost:8080/search/countRoom/${provinceID}`);
    const countRoom = await countRoomResponse.json();
    return countRoom
  }

  async getDistrict(provinceID){
    const districtResponse = await fetch(`http://localhost:8080/api/location/districts/${provinceID}`);
    const districts = await districtResponse.json();
    return districts
  }

  async getDistrictName(disID){
    const districtResponse = await fetch(`http://localhost:8080/api/location/district/${disID}`);
    const district = await districtResponse.json();
    return district
  }

  async getCountRoomDistrict(districtID) {
    const countRoomResponse = await fetch(`http://localhost:8080/search/countRoom/district/${districtID}`);
    const countRoom = await countRoomResponse.json();
    return countRoom
  }

  async postData(url, data) {
    // console.log(data);
    const response = await fetch(url, {
      method: 'POST',
      body: data
    })
    console.log(response);
  }
}