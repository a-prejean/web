// Loading content


function openTab(tabName, evt) {
  var i, x, tablinks;
  x = document.getElementsByClassName("tab");

  // Hide elements
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }

  // Turn on visibility of defined element
  document.getElementById(tabName).style.display = "block";

  // Change tab color when de-selected
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(
      " row-item-selected",
      ""
    );
  }

  // Change tab color when selected
  evt.currentTarget.firstElementChild.className += " row-item-selected";

}





// Load navigation bar from nav.html
// Usage:
// <body onload="loadNavBar()">
//   <header>
//     <div id="nav-placeholder"></div>
//   </header>

function loadNavBar() {
  $.get("dist/nav.html", function(data){
    $("#nav-placeholder").replaceWith(data);
  });
}

// Open page from link
function openPage(pageName,elmnt) {
  // For opening html files
  $(document).ready(function(){
    $('#content').load("dist/pages/"+pageName+".html");
  });

  elmnt.style.backgroundColor = '#434556';
}

function loadTab(pageName,elmnt) {
  var i, tablinks;

  // Open html file
  $(document).ready(function(){
    $('#content').load("dist/pages/"+pageName+".html");
  });

  // Change tab color
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }
  elmnt.style.backgroundColor = '#434556';

}


// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();




// Load page content
// Usage:
// <body onload="loadPageContent()">
//   <div id="divName"></div>

function loadPageContent() {
  $.get("dist/pages/charts.html", function(data){
    $("#charts").replaceWith(data);
  });
}