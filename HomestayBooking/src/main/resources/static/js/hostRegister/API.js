class API {
  constructor(provinceID, districtID) {
    this.provinceID = provinceID;
    this.districtID = districtID;
  }

  async getProvince(){
    const provinceResponse = await fetch(`http://localhost:8080/api/location/provinces`);
    console.log(provinceResponse)
    const provinces = await provinceResponse.json();
    return provinces
  }
}