

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

function readMenu(txt){

}
var fileRequest = new XMLHttpRequest();
fileRequest.open("GET",'menu.csv', true);
fileRequest.onload = function(e) {
  var fileText = fileRequest.responseText;
  document.querySelector("#menu").innerHTML = fileText;
}
fileRequest.send();

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
