// On first visit to menu, start tracking orders.
if (!localStorage["orders"]) {
  localStorage.setItem("orders", JSON.stringify([]));
}


// Organize menu into price categories.
var itemText = "";
var itemsBySize =[['<div class="item">Small<br>$2.50</div>'],['<div class="item">Medium<br>$2.75</div>'],['<div class="item">Large<br>$3.50</div>'],['<div class="item">Special<br>$5.50</div>']];
for (var item in menuItems) {
  if (menuItems.hasOwnProperty(item)) {
    var currentItem = menuItems[item];
    switch(currentItem.price) {
      case "2.50":
        itemsBySize[0].push(currentItem);
        break;
      case "2.75":
        itemsBySize[1].push(currentItem);
        break;
      case "3.50":
        itemsBySize[2].push(currentItem);
        break;
      case "5.50":
        itemsBySize[3].push(currentItem);
    }
  }
}

// Prepare to populate menu with thumbnails of menu items in order of price.
var htmlLine = "";
for (var i = 0; i < itemsBySize.length; i++) {
  htmlLine += itemsBySize[i][0];
  for (var j = 1; j < itemsBySize[i].length; j++) {
    var currentItem = itemsBySize[i][j];
    htmlLine += '<div class="item"><img class="thumbnail" src="images/menu/' + currentItem.filePath + '.jpg">'+
    '<div class="itemName"><a href="#" src="menu/' + currentItem.filePath + '.jpg">' + currentItem.name + '</a></div></div>';
  }
}

// Add behaviors to page elements once loaded.
window.addEventListener("load", function() {

  // Populate menu with prepared menu items and thumbnails.
  document.querySelector("#menu").innerHTML = htmlLine;

  // For each thumbnail, listen for a click to open detail for clicked item.
  var thumbnails = document.querySelectorAll(".thumbnail");
  for (var i = 0; i < thumbnails.length; i++) {
    var imgPath = "";
    thumbnails[i].addEventListener("click", function(){
      toggleDetail(menuItems[getImgPath(this.src)]);
    });
  }

  // For each item name label, listen for a click to open detail for clicked item.
  var itemNames = document.querySelectorAll(".itemName");
  for (var i = 0; i < itemNames.length; i++) {
    var imgPath = "";
    itemNames[i].addEventListener("click", function(){
      toggleDetail(menuItems[getImgPath(this.innerHTML)]);
    });
  }

  // Closes detail screen when any "close" elements are clicked.
  var closeElements = document.querySelectorAll(".close");
  for (var i = 0; i < closeElements.length; i++) {
    closeElements[i].addEventListener("click",closeDetail);
  }

  // Update menu screen with cart and its contents.
  reportToCart();

  // On details screen, click Add button to add current item to order.
  document.querySelector("#add").addEventListener("click", addToOrder);

  // On any screen, click Place Order button to move cart information to storage.
  document.querySelector("#placeOrder").addEventListener("click", function(){
    if (localStorage.length === 1) {
      alert("Cart is empty. Please add an item to the cart to place order.");
    } else {
      var pastOrders = JSON.parse(localStorage["orders"]);
      var currentOrder = {};
      currentOrder["number"] = (JSON.parse(localStorage["orders"]).length + 1);
      for (var i = 0; i < localStorage.length; i++) {
        var currentItem = localStorage.key(i);
        if (currentItem !== "orders") {
          currentOrder[currentItem] = localStorage[currentItem];
        }
      }
      currentOrder["total"] = document.querySelector("#total").innerHTML.substring(1);
      pastOrders.push(currentOrder);
      localStorage.clear();
      localStorage.setItem("orders", JSON.stringify(pastOrders));
      document.querySelector("#cartItems").innerHTML = "";
      reportTotals();
    }
  });

  // Reads an image path to return path excluding directories and extension.
  function getImgPath(txt) {
    return txt.split("menu/")[1].split(".jpg")[0];
  }

  // Opens and populates detail screen with item information; closes detail screen.
  function toggleDetail(clickedItem){
    document.querySelector("#pic").style["background-image"] = "url('images/menu/" + clickedItem.filePath + ".jpg')";
    document.querySelector("#top").innerHTML = clickedItem.name + "<br>" + clickedItem.chinese + "<hr>" +
    '<div id="itemDesc">' + clickedItem.desc + '</div>';
    document.querySelector("#add").name = clickedItem.filePath;
    document.querySelector("#price").innerHTML = "  $" + clickedItem.price;
    var menuViewBool = window.getComputedStyle(document.querySelector("#menu")).display !== "none";
    if (menuViewBool) {
      var detailView = document.querySelector("#detail");
      detailView.style.display = "block";
      document.querySelector("#menu").style.display = "none";
    } else {
      closeDetail();
    }
  }

  // Closes detail screen and returns to menu. Reset default qty to 1.
  function closeDetail() {
    document.querySelector("#detail").style.display = "none";
    document.querySelector("#menu").style.display = "block";
    document.getElementsByName("qty")[0].value = 1;
  }

  // On mouse hover, display item name across thumbnail.
  function toggleName(imgPath, mouseIn) {
    var allItemNames = document.querySelectorAll(".itemName");
    for (var i = 0; i < allItemNames.length; i++) {
        if (menuItems[imgPath].name === allItemNames[i].innerHTML) {
          if (mouseIn) {
            allItemNames[i].style.display="block";
          } else {
            allItemNames[i].style.display="none";
          }
        }
    }
  }

  // Add detailed item to cart with desired quantity.
  function addToOrder() {
    var itemName = document.querySelector("#pic").style["background-image"];
    itemName = itemName.substring(17).split('.')[0];
    var currentQty = document.getElementsByName("qty")[0].value;
    if (localStorage[itemName]){
      localStorage[itemName] = parseInt(localStorage[itemName]) + parseInt(currentQty);
    } else {
      localStorage.setItem(itemName,currentQty);
    }
    closeDetail();
    reportToCart();
  }

  // Display current contents of the cart, as stored in Local Storage.
  function reportToCart(){
    var cartOutput = "";
    document.querySelector("#cartItems").innerHTML = "";
    for (var i = 0; i < localStorage.length; i++) {
      var currentItem = localStorage.key(i);
      if (currentItem !== "orders") {
        cartOutput += '<div class="cartItem">' + menuItems[currentItem].name +
        ' × ' + localStorage[currentItem] + '</div>';
      }
    }
    document.querySelector("#cartItems").innerHTML = cartOutput;
    reportTotals();

    var allCartItems = document.querySelectorAll(".cartItem");
    for (var i = 0; i < allCartItems.length; i++) {
      var innerText = "";
      var width = "";
      // Remove item from cart on click.
      allCartItems[i].addEventListener("click", function(){
        removeItem(innerText);
      });
      // Display "Remove" on mouseover.
      allCartItems[i].addEventListener("mouseover", function(){
        innerText = this.innerText;
        width = window.getComputedStyle(this).getPropertyValue("width");
        this.innerHTML = "Remove";
        this.style.width = width;
      });
      // Display original text on mouseout.
      allCartItems[i].addEventListener("mouseout", function(){
        this.innerText = innerText;
      });
    }
  }

  // Update totals with cart information.
  function reportTotals(){
    var subtotal= 0;
    for (var i = 0; i < localStorage.length; i++) {
      var currentItem = localStorage.key(i);
      if (currentItem !== "orders") {
        subtotal += parseFloat(menuItems[currentItem].price) * parseInt(localStorage[currentItem]);
      }
    }
    var tax = subtotal * 0.101;
    var total = subtotal + tax;
    document.querySelector("#subtotal").innerHTML = subtotal.toFixed(2);
    document.querySelector("#tax").innerHTML = tax.toFixed(2);
    document.querySelector("#total").innerHTML = "$" + total.toFixed(2);
  }

  // Remove item from cart based on cart item text.
  function removeItem(text){
    var itemName = text.split(" ×")[0];
    var menuItemPaths = Object.keys(menuItems);
    for (var i = 0; i < menuItemPaths.length; i++) {
      if (menuItems[menuItemPaths[i]].name === itemName) {
        localStorage.removeItem(menuItems[menuItemPaths[i]].filePath);
        reportToCart();
        reportTotals();
      }
    }
  }
});
