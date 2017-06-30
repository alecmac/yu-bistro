
var menuItems = {};

// var fileText = 'bakedhumbao,Baked Hum Bow,2.50,BBQ pork wrapped in sweet dough and baked.,焗叉燒包,'+
// 'bbqporkpuff,Barbecue Pork Puff,2.50,BBQ pork wrapped in puff pastry.,叉燒酥,'+
// 'beeftripe,Beef Tripe,3.50,Springy tripe with chopped garlic and black bean paste.,牛肚,'+
// 'chickenfeet,Chicken Feet,2.75,Chewy chicken feet that are marinated and steamed.,鳳爪,'+
// 'eggtart,Egg Tart,2.75,A flaky pastry crust filled with creamy egg custard.,蛋撻,'+
// 'football,Deep Fried Dumpling,2.50,Savory pork and shrimp in a sweet glutinous rice shell.,鹹水角,'+
// 'friedtaro,Beehive Taro,3.50,Crunchy mashed taro filled with ground pork and shrimp.,芋角,'+
// 'peavine,Garlic Peavine,5.50,Tender pea greens steamed in chicken stock.,蒜蓉豆苗,'+
// 'sesameball,Sesame Ball,2.50,Fried dough covered with sesame seeds and filled with a sweet red bean paste.,煎堆,'+
// 'shanghaidumpling,Shanghai Dumpling,3.50,Dumplings filled with pork and broth.,小籠包,'+
// 'shrimpball,Shrimp Ball,3.50,Whole shrimp in a translucent wrapper.,蝦餃,'+
// 'shrimpricenoodleroll,Shrimp Rice Noodle Roll,3.50,Shrimp wrapped in a rice noodle sheet with soy sauce.,蝦腸,'+
// 'shumy,Shu My,2.75,Open-topped dumplings filled with ground pork and shrimp.,燒賣,'+
// 'spareribs,Spareribs,3.50,Pork rib tips steamed with whole black beans and oil.,蒸排骨,'+
// 'steamedhumbao,Steamed Hum Bow,2.50,BBQ pork wrapped in sweet dough and steamed.,蒸叉燒包,'+
// 'stickyrice,Sticky Rice Package,3.50,Chicken and sausage wrapped in a lotus leaf.,糯米雞,'+
// 'turnippie,Turnip Pie,2.75,Grated turnip with dried shrimp and Chinese sausage.,蘿蔔糕,'+
// 'stuffedeggplant,Stuffed Eggplant,3.50,Chinese eggplant filled with ground shrimp in XO sauce.,煎釀茄子,'+
// 'honeywalnutprawns,Honey Walnut Prawns,5.50,Crispy battered shrimp tossed in creamy sauce topped with sugar coated walnuts.,核桃蝦';

// Read file to be interpreted.
var fileText = "";
var httpRequest= new XMLHttpRequest();
httpRequest.open('GET', 'menu.csv');
httpRequest.onreadystatechange = function() {
  fileText = httpRequest.responseText;
}
httpRequest.send();


// Parses menu CSV file and creates objects for each menu item.
var propertyArr = ["filePath","name","price","desc","chinese"];
var fileArr = fileText.split(',');
var currentItem = {};
for (var i = 0; i < fileArr.length; i++) {
    currentItem[propertyArr[i % 5]] = fileArr[i];
    if (i % 5 === 4) {
      menuItems[currentItem["filePath"]] = currentItem;
      currentItem = {};
    }
}
