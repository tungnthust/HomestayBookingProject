class UI {
  constructor(){
    this.provinceElement = document.querySelector('#province')
    this.districtElement = document.querySelector('#district')
    this.wardElement = document.querySelector('#ward')
  }

  showProvince(provinces){
    let output = `<option selected>Tỉnh, thành phố</option>`
    provinces.forEach(function(province){
      output += `
      <option value="${province.id}">${province.name}</option>
      `
    })
    this.provinceElement.innerHTML = output
  }

  showDistrict(districts){
    let output = `<option selected>Quận, huyện</option>`
    districts.forEach(function(district){
      output += `
      <option value="${district.id}">${district.prefix} ${district.name}</option>
      `
    })
    this.districtElement.innerHTML = output
  }

  showWard(wards){
    let output = `<option selected>Quận, huyện</option>`
    wards.forEach(function(ward){
      output += `
      <option value="${ward.id}">${ward.prefix} ${ward.name}</option>
      `
    })
    this.wardElement.innerHTML = output
  }
}