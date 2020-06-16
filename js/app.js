//Display 3 unique products to choose from
//1. Construnctor associated with each product properties of name and path to imageDDDDDDDD
//2. randomly gen 3 unique prod and display side by sideDDDDDDD
//3.event listener for each productDDDDDDDD
//4. on click geneeratre 3 new productsDDDDDDDDD

//track selections made by users
//1. define a property to hold # of times clickedDDDD
//2. update clicks after selectionDDDDDD

//Control number of rounds
//1. 25 rounds before ending voting
//2. variable for # of rounds

//report results after 25 rounds
//1. property that keeps track of all products considered
//2. after rounds remove event listenersDDDDDD
//3. display list of products by votes received and # of times seen 'Banna slicer had 3 votes and was hsown 5 times'.
var productCollection = [];
var totalClicks = 0;
var maxClicks = 5;

function Product(source, description, name){
  this.clicked = 0;
  this.shown = 0;
  this.productName = name;
  this.productSource = source;
  this.productDescription = description;

  productCollection.push(this);
}

var bathProduct = new Product('images/bathroom.jpg', 'iPad while you iPoo', 'Bathroom iPad Multitool');
var petSweeperProduct = new Product('images/pet-sweep.jpg', 'Put your pets to work as they run around your house with snap on sweepers.', 'Pet Sweeper');
var pizzaScizzorsProduct = new Product('images/scissors.jpg', 'Cut your pizza and plate it in half the time!', 'Pizza Scissors');
var tauntaunProduct = new Product('images/tauntaun.jpg', 'Always wanted to survive the cold perils of Hoth? Now you can!', 'Tauntaun Sleeper');

var productImageSelection = document.getElementById('productImages');
productImageSelection.addEventListener('click', handleImageClick);

function handleImageClick(event){
  if(event.target.tagName === 'IMG') {
    totalClicks++;
    console.log('image clicked', totalClicks);
    if (totalClicks === maxClicks){
      productImageSelection.removeEventListener('click', handleImageClick);
      getSummary();
    }
    var targetSrc = event.target.getAttribute('src');
    for(var i = 0; i < productCollection.length; i++){
      if (productCollection[i].productSource === targetSrc){
        productCollection[i].clicked++;
        console.log('clicked from function',this.clicked);
        console.log(productCollection[i]);
      }
    }
    rerenderProductSelection();
  }
  else
  alert('click on an image to make a selection.');
}
//3. display list of products by votes received and # of times seen 'Banna slicer had 3 votes and was shown 5 times'.
function getSummary(){
  var totals = document.getElementById('totals');
  for (var i in productCollection){
    var listItem = document.createElement('li');
    listItem.textContent = productCollection[i].productDescription + ' was shown ' + productCollection[i].shown + ' and had ' + productCollection[i].clicked + ' votes.';
    totals.appendChild(listItem);
  }
  // var tableRow = document.createElement('tr');
  // var headerRow = document.createElement('tr');
  // var headerCell = document.createElement('th');
  // var tableCell = document.createElement('td');
  // tableCell.textContent = this.name;
  // tableRow.appendChild(tableCell);
  // for (var i = 0; i < productCollection.length; i++){
  //   headerCell.textContent = productCollection[i].name;
  //   tableCell = document.createElement('td');
  //   tableCell.textContent = productCollection[i].clicked;
  //   headerRow.appendChild(headerCell);
  //   tableRow.appendChild(tableCell);
  //   // var totalClicks = document.getElementById('totals');
  //   // var displayClicks = document.createElement('li');
  //   // displayClicks.textContent = productCollection[i].clicked;
  //   // totalClicks.appendChild(displayClicks);
  // }
  // var headerCell = document.createElement('th');
  // headerCell.textContent = this.name;
  // tableRow.appendChild(tableCell);
  // table.appendChild(tableRow);
}

function rerenderProductSelection(){
  var firstRandom = randomProduct(0, productCollection.length);
  var secondRandom = randomProduct(0, productCollection.length);
  var thirdRandom = randomProduct(0, productCollection.length);

  while(secondRandom === firstRandom || secondRandom === thirdRandom){
    secondRandom = randomProduct(0, productCollection.length);
    // console.log('second image ', productCollection[secondRandom]);
  }
  while(thirdRandom === firstRandom || secondRandom === thirdRandom){
    thirdRandom = randomProduct(0, productCollection.length);
    // console.log('third image ', productCollection[thirdRandom]);
  }

  var firstImage = document.getElementById('image1');
  var firstText = document.getElementById('text1');
  var secondImage = document.getElementById('image2');
  var secondText = document.getElementById('text2');
  var thirdImage = document.getElementById('image3');
  var thirdText = document.getElementById('text3');

  firstImage.src = productCollection[firstRandom].productSource;
  firstText.textContent = productCollection[firstRandom].productDescription;
  productCollection[firstRandom].shown++;

  var secondProduct = productCollection[secondRandom];
  secondImage.src = secondProduct.productSource;
  secondText.textContent = secondProduct.productDescription;
  secondProduct.shown++;

  var thirdProduct = productCollection[thirdRandom];
  thirdImage.src = thirdProduct.productSource;
  thirdText.textContent = thirdProduct.productDescription;
  thirdProduct.shown++;
}

function randomProduct(min, max){
  return Math.floor(Math.random() * (max - min) + min);
}
