class URL {
  constructor() {
    this.url = document.querySelector('#urlPhoto');
    this.form = document.querySelector('#url-form');
    this.list = document.querySelector('.urlList');
    this.array = new Array();
  }

  loadListener() {
    this.form.addEventListener('submit', (e) => {
      if (this.url.value ==  ''){
        alert('Please fill in an url');
      }
      this.array.push(this.url.value)
      // create, add class name and text node for li
      const li = document.createElement('li');
      li.className = 'url-item'
      li.appendChild(document.createTextNode(this.url.value));
      // create, add class name and icon for link
      const link = document.createElement('a');
      link.className = 'delete-url secondary-content';
      link.innerHTML = '<i class="fa fa-remove"></i>'
      // add link to li
      li.appendChild(link)
      this.list.appendChild(li);
      // clear input
      this.url.value = '';
  
      e.preventDefault();
    });

    this.list.addEventListener('click', (e) => {
      if (e.target.parentElement.classlist.contains('delete-url')){
        if (confirm('Are you sure')){
          e.target.parentElement.parentElement.remove();
        }
      }
    });
  }

  getList(){
    return this.array
  }
}