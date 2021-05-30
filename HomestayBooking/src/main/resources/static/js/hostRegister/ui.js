class ui {
  constructor(){
    this.provinceElement = document.querySelector('#province')
  }

  async getProvince(){
    const provinceResponse = await fetch(`http://localhost:8080/api/location/provinces`);
    const provinces = await provinceResponse.json();
    return provinces;
  }

  showProvince(getProvince){
    let output = `<option selected>Tỉnh, thành phố</option>`
    provinces.forEach(function(province){
      output += `
      <option value="${province.id}">${province.name}</option>
      `
    })
    this.provinceElement.innerHTML = output
  }
}