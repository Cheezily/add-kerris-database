var username = '';
var password = '';


$(document).ready(function() {
  $.get({
    url: 'db.php',
    data: "q=showAll",
    success: function(response) {
      if (response.length == 0) {
        $('.output').html("No results to show...");
      } else {
        $('.output').html(showCurrent(JSON.parse(response)));
      }
    }
  })
});


function showCurrent(response) {
  var html = "<table><th>Class Code</th>\
  <th>Class Name</th><th>Semester</th><th>Action</th>";
  for (row in response) {
    html += "<tr><td>" + response[row]['short_name'] +
    "</td><td>" + response[row]['long_name'] +
    "</td><td>" + response[row]['semester'] + "</td>" +
    "<td><span class='remove' onClick=removeItem(" + response[row]['id'] + ")>Remove</span></td> "
    "</tr>";
  }
  html += "</table>"
  return html;
}


$('#sendLogin').click(function(event) {
  event.preventDefault();
  $('#warning').text('');
  username = $('#username').val();
  password = $('#password').val();
  if (username && password) {
    var data = "userName=" + username + "&PW=" + password + "&Action=Check";
    $.post({
      url: 'db.php',
      data: data,
      success: function(response) {
        if (response == "Invalid") {
          $('.warning').text("Invalid username or password");
          username = '';
          password = '';
        } else if (response == 'Correct'){
          $('.warning').text("Login Successful");
          console.log('uname: ' + username);
          console.log('pw: ' + password);
        }
        $('#username').val('');
        $('#password').val('');
      }
    })
  } else {
    $('.warning').text("Please enter a username and password");
  }
});


function removeItem(item) {
  console.log('remove');
  if (!username || !password) {
    $('.warning').text('Please log in first');
  } else {
    console.log('hit');
    var data = "userName=" + username + "&PW=" + password +
      "&Action=Remove&id=" + item.toString();
    $.post({
      url: 'db.php',
      data: data,
      success: function(response) {
        if (response.length == 0) {
          $('.output').html("No results to show...");
        } else {
          $('.output').html(showCurrent(JSON.parse(response)));
        }
      }
    })
  }
}

$('.submitNew').click(function() {
  if (!username || !password) {
    $('.warning').text('Please log in first');
  } else {
      if ($('#cCode').val() && $('#cName').val() && $('#cSemester').val()) {
        $('.newCourseInfo').slideUp(400);
        $('.addNew').slideDown(400);

        var data = "userName=" + username + "&PW=" + password + "&Action=Insert" +
          "&short=" + $('#cCode').val() + "&long=" + $('#cName').val() + "&semester=" + $('#cSemester').val();

        $.post({
          url: 'db.php',
          data: data,
          success: function(response) {
            $('#cCode').val('');
            $('#cName').val('');
            $('#cSemester').val('');
            if (response.length == 0) {
              $('.output').html("No results to show...");
            } else {
              $('.output').html(showCurrent(JSON.parse(response)));
            }
          }
        })
      } else {
        $('.warning').text('Please Fill in Course Info');
      }

  }
})

$('.addNew').click(function() {
  if (!username || !password) {
    $('#warning').text('Please log in first');
  } else {
  $('.newCourseInfo').slideDown(400);
  $('.addNew').slideUp(400);
  }
})
