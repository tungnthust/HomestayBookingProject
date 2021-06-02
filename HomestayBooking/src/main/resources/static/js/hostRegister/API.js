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
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const resData = await response.json();
    return resData;
  }
}