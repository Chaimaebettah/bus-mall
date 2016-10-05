'use strict';
var imagesData = [
  {imgName:'bag' , filePath:'./images/bag.jpg'},
  {imgName:'banana' , filePath:'./images/banana.jpg'},
  {imgName:'bathroom' , filePath:'./images/bathroom.jpg'},
  {imgName:'breakfast' , filePath:'./images/breakfast.jpg'},
  {imgName:'boots' , filePath:'./images/boots.jpg'},
  {imgName:'bubblegum' , filePath:'./images/bubblegum.jpg'},
  {imgName:'chair' , filePath:'./images/chair.jpg'},
  {imgName:'cthulhu' , filePath:'./images/cthulhu.jpg'},
  {imgName:'dog-duck' , filePath:'./images/dog_duck.jpg'},
  {imgName:'dragon' , filePath:'./images/dragon.jpg'},
  {imgName:'pen' , filePath:'./images/pen.jpg'},
  {imgName:'pet-sweep' , filePath:'./images/pet-sweep.jpg'},
  {imgName:'scissors' , filePath:'./images/scissors.jpg'},
  {imgName:'shark' , filePath:'./images/shark.jpg'},
  {imgName:'sweep' , filePath:'./images/sweep.jpg'},
  {imgName:'tauntaun' , filePath:'./images/tauntaun.jpg'},
  {imgName:'unicorn' , filePath:'./images/unicorn.jpg'},
  {imgName:'usb' , filePath:'./images/usb.jpg'},
  {imgName:'water-can' , filePath:'./images/water_can.jpg'},
  {imgName:'wine-glass' , filePath:'./images/wine_glass.jpg'},
];

var images = [];
var previouslyDisplayedImages = [];
var totalImagesClicks = 0;

function BusMall(imgName,filePath, imgId){
  this.imgId = imgId;
  this.imgName = imgName;
  this.filePath = filePath;
  this.displayed = 0;
  this.clicked = 0;
}


// create image instances and push them into the images array;
function createImageInstances() {
  for (var i = 0; i < imagesData.length; i++) {
    console.log('creating BusMall instance and pushing into images array');
    images.push(new BusMall(imagesData[i].imgName, imagesData[i].filePath, i));
  }
}


// helps create an image element
function createImageElement(id, filePath) {
  var imgElement = document.createElement('img');
  imgElement.id = 'image_' + id;
  imgElement.classList.add('image');
  imgElement.src = filePath;
  console.log('creating image element: ', imgElement);
  return imgElement;
}

// generate a random image index that's within the images array's indexes
function randomImageIndex(){
  var randomImage = Math.floor(Math.random() * images.length);
  console.log('generate random image index: ', randomImage);
  return randomImage;
}


// We need a way to keep track of the last set of displayed images
function getPreviouslyDisplayedImages() {
  previouslyDisplayedImages = [];
  for(var i = 0; i < images.length; i++) {
    // check if the image instance has been displayed
    if(images[i].displayed === 1) {
      previouslyDisplayedImages.push(images[i].imgId);
    }
  }

  console.log('previously displayed images: ', previouslyDisplayedImages);

  return previouslyDisplayedImages;
}


// get three unique image Ids by using randomImageIndex and stopping the last
// previously displayed images from showing up in the threeUniqueImageIds array
function getThreeUniqueImageIds(){
  console.log('get three unique images');
  var threeUniqueImageIds = [];
  var previouslyDisplayedImages = getPreviouslyDisplayedImages();
  // we only want three unique ids
  while(threeUniqueImageIds.length < 3) {
    var randomIndex = randomImageIndex();
    // get the image that is at this randomIndex
    var image = images[randomIndex];
    // make sure that this randomIndex is not in threeUniqueImageIds and not in previouslyDisplayedImages
    // before pushing it into the threeUniqueImageIds array
    if(threeUniqueImageIds.indexOf(randomIndex) === -1 && previouslyDisplayedImages.indexOf(randomIndex) === -1) {
      // set this image as displayed
      image.displayed = 1;
      threeUniqueImageIds.push(randomIndex);
    }
  }

  console.log('getting three unique image ids: ', threeUniqueImageIds);

  // we want to reset the previously displayed image instances. So that the three unique images
  // can be used as the only 'previouslyDisplayedImages' the next time the user clicks on an image
  resetPreviouslyDisplayedImages(previouslyDisplayedImages);
  return threeUniqueImageIds;
}


// resets image instances so that their display property is 0
function resetPreviouslyDisplayedImages(previouslyDisplayedImages) {
  for(var i = 0; i < previouslyDisplayedImages.length; i++) {
    images[previouslyDisplayedImages[i]].displayed = 0;
    console.log('resetting previously displayed images');
  }
}


// displays images on the screen using three unique image ids/indexes
function displayImages() {
  console.log('images are being displayed');
  var imagesElement = document.getElementById('images');
  var threeUniqueImageIds = getThreeUniqueImageIds();
  imagesElement.textContent = '';
  for(var i = 0; i < threeUniqueImageIds.length; i++) {
    var image = images[threeUniqueImageIds[i]];
    console.log('get image instance from images array: ', image);
    var imageElement = createImageElement(image.imgId, image.filePath);
    imagesElement.appendChild(imageElement);
    console.log('add image instances to the imagesElement: ', imagesElement);
  }
  addClickEvents();
}


// display a list of clicked images
// function displayClickedSelectionsList(){
//   var listElement = document.getElementById('selected-images-list');
//   for(var i = 0; i < images.length; i++) {
//     var listItemElement = document.createElement('li');
//     listItemElement.textContent = images[i].clicked + ' votes for ' + images[i].imgName;
//     listElement.appendChild(listItemElement);
//   }
//   console.log('displaying clicked images list: ', listElement);
// }


// handle image clicks
function handleClick(){

  var id = this.id.split('image_')[1];
  console.log('image ' + id + ' is being clicked');
  var image = images[id];
  displayImages();
  image.clicked++;
  totalImagesClicks++;
  if(totalImagesClicks === 25) {
    console.log('clicked 25 times');
    removeClickEvents();
    // displayClickedSelectionsList();
    // displayChart();
    button.addEventListener('click',displayChart);

    function saveMydata() {
      var stringifyData = JSON.stringify(images);
      localStorage.setItem('stringifyData', stringifyData);
    }


    saveMydata();
  }
}


// add click events to images
function addClickEvents() {
  console.log('adding click events');
  var displayedImageElements = document.getElementsByClassName('image');
  for(var i = 0; i < displayedImageElements.length; i++){
    var imageElement = displayedImageElements[i];
    imageElement.addEventListener('click', handleClick);
  }
}


// remove click events from images
function removeClickEvents(){
  console.log('removing click events');
  var displayedImageElements = document.getElementsByClassName('image');
  for(var i = 0; i < displayedImageElements.length; i++){
    var imageElement = displayedImageElements[i];
    imageElement.removeEventListener('click', handleClick);
  }
}

if (localStorage.getItem('stringifyData')) {
  var stringifiedDataFromLocalStorage = localStorage.getItem('stringifyData');
  images = JSON.parse(stringifiedDataFromLocalStorage);
} else {
  createImageInstances();
}

displayImages();

function displayChart(){
  document.getElementById('myChart').style.display = 'block';
  document.getElementById('button').style.display = 'none';

  var myImg = [];
  var votes = [];
  for(var i = 0; i < images.length; i++) {
    myImg.push(images[i].imgName);
    votes.push(images[i].clicked);
    console.log(myImg);
  }

  var ctx = document.getElementById('myChart');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: myImg,
      datasets: [{
        label: '# of Votes',
        data: votes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(2, 159, 64, 79)',
          'rgba(255, 159, 622, 0.5)',
          'rgba(5, 1, 64, 5)',
          'rgba(255, 100, 64, 0.5)',
          'rgba(100, 159, 64, 0.5)',
          'rgba(255, 159, 64, 30)',
          'rgba(255, 0, 0, 0.5)',
          'rgba(255, 1, 64, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgba(255, 300, 64, 0.5)',
          'rgba(255, 119, 114, 0.5)',
          'rgba(2, 15, 64, 0.5)',
          'rgba(2, 1, 0, 50)',

        ],
      }]
    },
    options: {
      responsive: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true,
            stepSize:1,
            max: 8,
            min: 0
          }
        }]
      }
    }
  });
}
