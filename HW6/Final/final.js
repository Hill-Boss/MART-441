function getInfo() {
  fields = JSON.parse(localStorage.getItem('information'));
  document.getElementById('stats').innerHTML += "<h3>" + fields.firstname + " " + fields.lastname + ", age " + fields.age + " took " + fields.attempts + " attempts</h3>"
  console.log(fields);
}

function gotoPage(page) {
  window.location = page;
}
