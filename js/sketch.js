//https://www.cryptocompare.com/coins/guides/how-to-use-our-api/
var price;
var price1=0;
var price2=6500;
var priceDiff;
var url ='https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=BTC,USD&api_key=d92c68c3e5470661186d2adac26fe95e605b722d3646ad563cbc3a0b2a9410ff';

//rect parameters
var rectX=0;
var rectY=0;
var n=2.70;

//create Canvas full screen mode
var canvasX = 1440;
var canvasY = 900;

let img;

var maxChange = 5;


function setup() {
  img = createCanvas(canvasX ,canvasY);
  img.id('my-canvas');
  background(0);
  setInterval(getPrice,30000); //API run every 30 s
  setInterval(savePic,3600000); //save image every hour, every 120 cube

  //savePic();
 // setInterval(savePic,3000);

}
function getPrice(){
    loadJSON(url, gotData);
}

function savePic(){
 // save(img, 'canvas.png');
var canvas = document.getElementById("my-canvas");
// draw to canvas...
canvas.toBlob(function(blob) {
    saveAs(blob, "canvas.png");
});
}

// function savePic(){
// save(img, 'canvas.png');
// }
function gotData(data){
  price1 = price2;
  var priceRaw = data.BTC.USD;
  price2= priceRaw;
  price = map(priceRaw,300);
  console.log("price1="+price1+"price2="+price2);
  priceDiff = price2-price1;
  console.log("priceDiff="+priceDiff);
  drawRect();
}
function drawRect(){
  //map the transparency
  var rectColor = map(abs(priceDiff),0,maxChange,150,0);
  if (priceDiff >= maxChange){
    rectColor ==0;
  }
    console.log("rectColor="+rectColor);

if(priceDiff>0){ //green
fill(rectColor,255,rectColor);
}
  if(priceDiff==0){
  fill(50);
  }
  if(priceDiff<0){
  fill(255,rectColor,rectColor);
  }
strokeWeight(0);
   rect(rectX, rectY,n,n);
if(rectY<height){
  rectY=rectY+n;
   }else{
     rectX=rectX+n;
     rectY=0;
   }
}
