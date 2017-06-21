

document.querySelector("button").addEventListener("click", function(){
  toggleDetail();
})

var thumbnails = document.querySelectorAll(".thumbnail");
for (var i = 0; i < thumbnails.length; i++) {
  thumbnails[i].addEventListener("click", function(){
    toggleDetail();
  });
}
document.querySelector("#close").addEventListener("click",closeDetail);

document.querySelector(".thumbnail").addEventListener("click", function(){
  toggleDetail();
});

var menuItems = {};
var fileRequest = new XMLHttpRequest();
fileRequest.open("GET",'menu.csv', true);
fileRequest.onload = function(e) {
  var fileText = fileRequest.responseText;
  document.querySelector("#menu").innerHTML = fileText;
  var currentItemElement = "";
  var inQuote = false;
  var currentItem = {};
  var propertyArr = ["filePath","name","price","desc","chinese"];
  for (var i = 0; i < fileText.length; i++) {
    var ch = fileText[i];
    if (ch === '"') {
      inQuote = !inQuote;
    } else if (ch ===',' && !inQuote) {
      currentItem[propertyArr[currentItem.length]] = currentItemElement;
      currentItemElement = "";
      if (currentItem.length === 5) {
        menuItems[currentItem[filePath]] = currentItem;
        currentItem = {};
      }
    } else {
      currentItemElement += ch;
    }
  }
}
fileRequest.send();

var allText = "";
for (var item in menuItems) {
  allText += item["filePath"];
}
document.querySelector("#menu").innerHTML = allText;

function toggleDetail(){
  var menuViewBool = window.getComputedStyle(document.querySelector("#menu")).display !== "none";
  if (menuViewBool) {
    var detailView = document.querySelector("#detail");
    detailView.style.display = "block";
    document.querySelector("#menu").style.display = "none";
  } else {
    closeDetail();
  }
}

function closeDetail() {
  document.querySelector("#detail").style.display = "none";
  document.querySelector("#menu").style.display = "block";
}
