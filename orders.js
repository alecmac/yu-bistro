var pastOrders = JSON.parse(localStorage["orders"]);

document.querySelector("#orders").innerHTML = "No orders placed! Visit our <a href='menu.html'>menu</a> to place an order.";
if (pastOrders[0]) {
  var output = "";
  for (var i = 0; i < pastOrders.length; i++) {
    output += "<div class='order'>";
    var currentOrder = pastOrders[i];
    var orderPaths = Object.keys(currentOrder);
    var currentOutput = "<h2>Order Number " + currentOrder["number"] + "</h2>" +
    "<table><tr><td><h3>Item</h3></td><td><h3>Quantity</h3></td></tr>";
    for (var j = 1; j < orderPaths.length - 1; j++) {
      currentOutput += "<tr><td>" + menuItems[orderPaths[j]].name + "</td>";
      currentOutput += "<td>" + currentOrder[orderPaths[j]]; + "</td></tr>";
      if (j === orderPaths.length - 2) {
        currentOutput += "</tr><tr></tr><tr id='total'><td><h3>Total:</h3></td><td>" + currentOrder[orderPaths[j+1]] + "</td></tr>";
      }
    }
    output += currentOutput;
    output += "</table></div>"

  }
  document.querySelector("#orders").innerHTML = output;
}
