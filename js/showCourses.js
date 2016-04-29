// This will output to an element with the class name of 'courseOutput'.
// The syllabus files need to be saved to /syllabus as the course names will
// become clickable links to those files 

$(document).ready(function() {
  $.get({
    url: 'db.php',
    data: "q=showAll",
    success: function(response) {
      if (response.length == 0) {
        $('.courseOutput').html("No results to show...");
      } else {
        $('.courseOutput').html(showCurrent(JSON.parse(response)));
      }
    }
  })
});


function showCurrent(response) {
  var html = "<table><th>Class Code</th><th>Class Name</th><th>Semester</th>";
  for (row in response) {
    html += "<tr><td class='codeWidth'>" + response[row]['short_name'] +
    "</td><td class='nameWidth'><a href='/syllabus/" + response[row]['syllabus_link'] +
    "'>" + response[row]['long_name'] + "</a>" +
    "</td><td class='semesterWidth'>" + response[row]['semester'] + "</td>" +
    "</tr>";
  }
  html += "</table>"
  return html;
}
