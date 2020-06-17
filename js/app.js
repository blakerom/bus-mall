`use strict`;
//=================Globals===================//
Product.collection = [];
var totalClicks = 0;
var maxClicks = 25;

//=================Objects==================//
var bathProduct = new Product('images/bathroom.jpg', 'iPad while you iPoo', 'Bathroom iPad Multitool');
var petSweeperProduct = new Product('images/pet-sweep.jpg', 'Put your pets to work as they run around your house with snap on sweepers.', 'Pet Sweeper');
var pizzaScizzorsProduct = new Product('images/scissors.jpg', 'Cut your pizza and plate it in half the time!', 'Pizza Scissors');
var tauntaunProduct = new Product('images/tauntaun.jpg', 'Always wanted to survive the cold perils of Hoth? Now you can!', 'Tauntaun Sleeper');
var bagR2Product = new Product('images/bag.jpg','R2D2 is your personal suitcase', 'R2 Rollcase');
var bananaProduct = new Product('images/banana.jpg', 'Cut your bananas perfectly!', 'Banana cut');
var bootsProduct = new Product('images/boots.jpg', 'Rain boots too sweaty? Try Rain Boats!', 'Rain Boats');
var breakfastProduct = new Product('images/breakfast.jpg', 'Make your entire breakfast with just one handy tool', 'Breakfast Machine');
var bubblegumProduct = new Product('images/bubblegum.jpg', 'Meatball flavored bubble gum! It\'s protein!', 'MeatGum');
var chairProduct = new Product('images/chair.jpg', 'Take a seat, it\'s relaxing!', 'Cozy Chair');
var cthulhuProduct = new Product('images/cthulhu.jpg', 'This toy is only for the brave.', 'Cthulu Toy');
var dogDuckProduct = new Product('images/dog-duck.jpg', 'Loud, yappy dog? This device turns the annoy into, oh boy!', 'Duck Dog Device');
var dragonProduct = new Product('images/dragon.jpg', 'Dragon meat. It is also protein!', 'Dragon Meat');
var penProduct = new Product('images/pen.jpg', 'Work during lunch? Be efficient.', 'Pen plastic ware');
var sharkProduct = new Product('images/shark.jpg', 'This cute sleeping bag is sure to impress.', 'Shark Sleeper');
var sweepProduct = new Product('images/sweep.png', 'Baby can\'t wait to work? Let them sweep.', 'Baby Sweeper');
var unicornProduct = new Product('images/unicorn.jpg', 'Unicorn meat...It\'s protein.', 'Unicorn Meat');
var usbProduct = new Product('images/usb.gif', 'Tentacle usb moves when in use.', 'Tentacle USB');
var watercanProduct = new Product('images/water-can.jpg', 'Never run out of water with this can,', 'Watercan');
var wineglassProduct = new Product('images/wine-glass.jpg', 'Perfect oxygenation in every glass.', 'Wineglass');

//=================Functions=================//

function Product(source, description, name){
  this.clicked = 0;
  this.shown = 0;
  this.productName = name;
  this.productSource = source;
  this.productDescription = description;

  Product.collection.push(this);
}

var productImageSelection = document.getElementById('productImages');
productImageSelection.addEventListener('click', handleImageClick);

function handleImageClick(event){
  if(event.target.tagName === 'IMG') {
    totalClicks++;
    console.log('image clicked', totalClicks);
    //Click counter
    var targetSrc = event.target.getAttribute('src');
    for(var i = 0; i < Product.collection.length; i++){
      if (Product.collection[i].productSource === targetSrc){//if targeted add a click
        Product.collection[i].clicked++;
        console.log('clicked from function',this.clicked);
        console.log(Product.collection[i]);
      }
    }
    rerenderProductSelection();
    // Render
    if (totalClicks === maxClicks){
      productImageSelection.removeEventListener('click', handleImageClick);
      getSummary();
      createChart();
    }

  }
  else
  alert('click on an image to make a selection.');
}

function getSummary(){
  var totals = document.getElementById('totals');
  for (var i in Product.collection){
    var listItem = document.createElement('li');
    listItem.textContent = Product.collection[i].productDescription + ' was shown ' + Product.collection[i].shown + ' and had ' + Product.collection[i].clicked + ' votes.';
    totals.appendChild(listItem);
  }
}

function rerenderProductSelection(){
  var firstRandom = randomProduct(0, Product.collection.length);
  var secondRandom = randomProduct(0, Product.collection.length);
  var thirdRandom = randomProduct(0, Product.collection.length);

  while(secondRandom === firstRandom || secondRandom === thirdRandom){
    secondRandom = randomProduct(0, Product.collection.length);
    // console.log('second image ', Product.collection[secondRandom]);
  }
  while(thirdRandom === firstRandom || secondRandom === thirdRandom){
    thirdRandom = randomProduct(0, Product.collection.length);
    // console.log('third image ', Product.collection[thirdRandom]);
  }

  var firstImage = document.getElementById('image1');
  var firstText = document.getElementById('text1');
  var secondImage = document.getElementById('image2');
  var secondText = document.getElementById('text2');
  var thirdImage = document.getElementById('image3');
  var thirdText = document.getElementById('text3');

  firstImage.src = Product.collection[firstRandom].productSource;
  firstText.textContent = Product.collection[firstRandom].productDescription;
  Product.collection[firstRandom].shown++;

  var secondProduct = Product.collection[secondRandom];
  secondImage.src = secondProduct.productSource;
  secondText.textContent = secondProduct.productDescription;
  secondProduct.shown++;

  var thirdProduct = Product.collection[thirdRandom];
  thirdImage.src = thirdProduct.productSource;
  thirdText.textContent = thirdProduct.productDescription;
  thirdProduct.shown++;
}

function randomProduct(min, max){
  return Math.floor(Math.random() * (max - min) + min);
}

//===================Chart===================//

function createChart(){
  var chartNames = [];
  for(var i = 0; i < Product.collection.length; i++){
    chartNames.push(Product.collection[i].productName);
    console.log('chart names :', chartNames);
  }

  var chartProductClicks = [];
  for(var i = 0; i < Product.collection.length; i++){
    chartProductClicks.push(Product.collection[i].clicked);
    console.log('chart clicks :',chartProductClicks);
  }

  var chartProductShown = [];
  for(var i = 0; i < Product.collection.length; i++){
    chartProductShown.push(Product.collection[i].shown);
    console.log('chart shown :', chartProductShown);
  }

  var ctx = document.getElementById('productChart').getContext('2d');
  var productChart = new Chart(ctx, {
    type: 'bar',

    // The data for our dataset
    data: {
        labels: chartNames,
        datasets: [{
            label: 'Votes',
            data: chartProductClicks,
            backgroundColor: 'blue',
            borderColor: 'blue'
        }, {
            label: 'Times Shown',
            data: chartProductShown,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)'
        }]
    },

    // Configuration options go here
    options: {}
  });
}
