// add url
const url = new URL();
url.loadListener();

// show provinces
const api = new API();
api.getProvince()
.then(data => {
  console.log(data);
})