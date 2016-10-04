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

function BusMall(imgName,filePath, imgId){
  this.imgId = imgId;
  this.imgName = imgName;
  this.filePath = filePath;
  this.displayed = 0;
  this.clicked = 0;
}

function createImageInstances() {
  for (var i = 0; i < imagesData.length; i++) {
    images.push(new BusMall(imagesData[i].imgName, imagesData[i].filePath, i));
  }
}

function createImageElement(id, filePath) {
  var imgElement = document.createElement('img');
  imgElement.id = "image_" + id;
  imgElement.src = filePath;
  return imgElement;
}

function randomImageIndex(){
  var randomImage = Math.floor(Math.random() * images.length);
  return randomImage;
}

function displayImages(){
  var imagesElement = document.getElementById('images');
  for(var i = 0; i < 3; i++) {
    var randomIndex = randomImageIndex();
    var image = images[randomIndex];
    var imageElement = createImageElement(image.imgId, image.filePath);
    imagesElement.appendChild(imageElement);
  }
}


createImageInstances();
displayImages();
// console.log(images);
