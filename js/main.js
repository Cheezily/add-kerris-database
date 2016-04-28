$(document).ready(function() {
  $.get({
    url: 'db.php',
    data: "q=showAll",
    success: function(response) {
      $('.currentInfo').html(showCurrent(JSON.parse(response)));
    }
  })

});


function showCurrent(response) {
  var html = "<table><th>Class Code</th>\
  <th>Class Name</th><th>Semester</th>";
  for (row in response) {
    html += "<tr><td>" + response[row]['short_name'] + "</td><td>" + response[row]['long_name'] + "</td><td>" + response[row]['semester'] + "</td></tr>";
  }

  html += "</table>"
  return html;
}


$('#sendLogin').click(function(event) {
  event.preventDefault();

  $('#warning').text('');

  var uname = $('#username').val();
  var pw = $('#password').val();

  var data = "userName=" + uname + "&PW=" + pw;

  $.post({
    url: 'db.php',
    data: data,
    success: function(response) {
      if (response == "Invalid") {
        $('#warning').text("Invalid username or password");
      } else {
        console.log("response: " + response);
        $('.output').append(response);
      }
      $('#username').val('');
      $('#password').val('');

    }
  })
})
