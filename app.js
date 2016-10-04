'use strict';
var imagesData = [
  {imgName:'bag' , filePath:'./images/bag.jpg'},
  {imgName:'banana' , filePath:'./images/banana.jpg'},
  {imgName:'bathroom' , filePath:'./images/bathroom.jpg'},
  {imgName:'breakfast' , filePath:'./images/breakfast.jpg'},
  {imgName:'bubblegum' , filePath:'./images/bubblegum.jpg'},
  {imgName:'chair' , filePath:'./images/chair.jpg'},
  {imgName:'cthulhu' , filePath:'./images/cthulhu.jpg'},
  {imgName:'dog-duck' , filePath:'./images/dog-duck.jpg'},
  {imgName:'dragon' , filePath:'./images/dragon.jpg'},
  {imgName:'pen' , filePath:'./images/pen.jpg'},
  {imgName:'pet-sweep' , filePath:'./images/pet-sweep.jpg'},
  {imgName:'scissors' , filePath:'./images/scissors.jpg'},
  {imgName:'shark' , filePath:'./images/shark.jpg'},
  {imgName:'sweep' , filePath:'./images/sweep.png'},
  {imgName:'tauntaun' , filePath:'./images/tauntaun.jpg'},
  {imgName:'unicorn' , filePath:'./images/unicorn.jpg'},
  {imgName:'usb' , filePath:'./images/usb.gif'},
  {imgName:'water-can' , filePath:'./images/water-can.jpg'},
  {imgName:'wine-glass' , filePath:'./images/wine-glass.jpg'},
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
    images.push(new BusMall(imagesData[i].imgName, imagesData[i].filePath, i));
  }
}


// helps create an image element
function createImageElement(id, filePath) {
  var imgElement = document.createElement('img');
  imgElement.id = 'image_' + id;
  imgElement.classList.add('image');
  imgElement.src = filePath;
  return imgElement;
}


// generate a random image index that's within the images array's indexes
function randomImageIndex(){
  var randomImage = Math.floor(Math.random() * images.length);
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

  return previouslyDisplayedImages;
}


// get three unique image Ids by using randomImageIndex and stopping the last
// previously displayed images from showing up in the threeUniqueImageIds array
function getThreeUniqueImageIds(){
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

  // we want to reset the previously displayed image instances. So that the three unique images
  // can be used as the only "previouslyDisplayedImages" the next time the user clicks on an image
  resetPreviouslyDisplayedImages(previouslyDisplayedImages);
  return threeUniqueImageIds;
}


// resets image instances so that their display property is 0
function resetPreviouslyDisplayedImages(previouslyDisplayedImages) {
  for(var i = 0; i < previouslyDisplayedImages.length; i++) {
    images[previouslyDisplayedImages[i]].displayed = 0;
  }
}


// displays images on the screen using three unique image ids/indexes
function displayImages() {
  var imagesElement = document.getElementById('images');
  var threeUniqueImageIds = getThreeUniqueImageIds();
  imagesElement.textContent = '';
  for(var i = 0; i < threeUniqueImageIds.length; i++) {
    var image = images[threeUniqueImageIds[i]];
    var imageElement = createImageElement(image.imgId, image.filePath);
    imagesElement.appendChild(imageElement);
  }
  addClickEvents();
}


// display a list of clicked images
function displayClickedSelectionsList(){
  var listElement = document.getElementById('selected-images-list');
  for(var i = 0; i < images.length; i++) {
    var listItemElement = document.createElement('li');
    listItemElement.textContent = images[i].clicked + ' votes for ' + images[i].imgName;
    listElement.appendChild(listItemElement);
  }
}


// handle image clicks
function handleClick(){
  var id = this.id.split('image_')[1];
  var image = images[id];
  displayImages();
  image.clicked++;
  totalImagesClicks++;
  if(totalImagesClicks === 25) {
    console.log('clicked 25 times');
    removeClickEvents();
    displayClickedSelectionsList();
  }
}


// add click events to images
function addClickEvents() {
  var displayedImageElements = document.getElementsByClassName('image');
  for(var i = 0; i < displayedImageElements.length; i++){
    var imageElement = displayedImageElements[i];
    imageElement.addEventListener('click', handleClick);
  }
}


// remove click events from images
function removeClickEvents(){
  var displayedImageElements = document.getElementsByClassName('image');
  for(var i = 0; i < displayedImageElements.length; i++){
    var imageElement = displayedImageElements[i];
    imageElement.removeEventListener('click', handleClick);
  }
}


// create the image instances based on the data that is in the imagesData array
createImageInstances();
displayImages();
