var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
// variables for height and width
var W;
var H;
var size;
var pi;
var answ;
var sumrad;

  ctx.lineWidth = 2;

//settings for circledrawing
var circles = [];
var minRadius = 20;
var maxRadius = 60;
var total = 500;
var circleattempt = 500;

function changecanvas(){
   H = document.getElementById("HTMH").value;
   W = document.getElementById("HTMW").value;


   document.getElementById("canvas").style.height = H + "px";
   document.getElementById("canvas").style.width = W + "px";



   var mesures = H, W;
    size = mesures;

   sumrad = (W * H);
   answ = 0;
   pi = 0;





 for (var i = 0; i < total; i++){

drawcircle();
 }

}

function changetext(){
  document.getElementById('percent').innerHTML = (Math.round(answ * 100) / 100).toFixed(1) + "% Used";
}


// Drawing function
function drawcircle()
{

var newcircle;
var safetodraw = false;
for(var tries = 0; tries < circleattempt; tries++ ){

    newcircle = {
       x: Math.floor(Math.random() * size),
       y: Math.floor(Math.random() * size),
      radius: minRadius
    }

  if(doeshavecollision(newcircle)){
    continue;

  }
    else {
      safetodraw = true;
      break;
    }
  }

  if (!safetodraw) {
  return;
  }
  for(var radiusSize = minRadius; radiusSize < maxRadius; radiusSize++){
  newcircle.radius = radiusSize;
    if (doeshavecollision(newcircle)) {
      newcircle.radius--;
      break;
    }
  }
  //if circle has space then displayed
  pi += Math.PI *(newcircle.radius * newcircle.radius);
  answ = (pi / sumrad) * 100;
  changetext();

  circles.push(newcircle);
  ctx.beginPath();
  ctx.arc(newcircle.x, newcircle.y, newcircle.radius,  0, 2*Math.PI);
  ctx.stroke();
}
//checks if ricle collides with anything
function doeshavecollision(circle)
{
  for(var i = 0; i < circles.length; i++){
  var othercircle = circles[i];
  var a = circle.radius + othercircle.radius;
      x = circle.x - othercircle.x;
      y = circle.y - othercircle.y;

    if (a >= Math.sqrt((x*x) + (y*y))) {
    return true;

    }
  }
  if(circle.x + circle.radius >= size ||
    circle.x - circle.radius <= 0) {
   return true;
 }

 if(circle.y + circle.radius >= size ||
     circle.y - circle.radius <= 0) {
   return true;
 }

//circle removed
        return false;
}
//circle drawn
  for(var i = 0; i < total; i++) {
  drawcircle();
  }
