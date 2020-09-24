function openTab(pageName,elmnt) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }
  document.getElementById(pageName).style.display = "block";
  elmnt.style.backgroundColor = '#434556';

  // For opening new html files
  $(document).ready(function(){
    $('#'+pageName).load(pageName+".html");
  });

}


// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();
