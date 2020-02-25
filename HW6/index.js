var fields = {
    'firstname': '',
    'lastname': '',
    'age': '',
    'attempts': 0
}

function getInfo() {
    document.getElementById('info').innerHTML =
        "<label for=\"firstname\"></label>" +
        "<input class=\"w3-input\" type=\"text\" name=\"firstname\" placeholder=\"First name\"><br>" +
        "<label for=\"lastname\"></label>" +
        "<input class=\"w3-input\" type=\"text\" name=\"lastname\" placeholder=\"Last name\"><br>" +
        "<label for=\"age\"></label>" +
        "<input class=\"w3-input\" type=\"text\" name=\"age\" placeholder=\"Age\"><br>" +
        "<div class=\"w3-btn w3-green\" onclick=\"gotoPage(\'./Game/\');\">Goto Game</div>";
}

function setInfo() {
    fields['firstname'] = document.getElementsByName('firstname')[0].value;
    fields['lastname'] = document.getElementsByName('lastname')[0].value;
    fields['age'] = document.getElementsByName('age')[0].value;

    localStorage.setItem('information', JSON.stringify(fields));
}

function gotoPage(page) {
    setInfo()
    window.location = page;
}
