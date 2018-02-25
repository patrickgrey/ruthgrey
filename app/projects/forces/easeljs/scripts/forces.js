var stage;
// var container;

function init() {
//   console.log("hi there");
  stage = new createjs.Stage("forcesCanvas");
  createjs.Ticker.addEventListener("tick", stage);
  createjs.Touch.enable(stage);
  
  var acft = new createjs.Bitmap("../images/acft01.png");
  acft.image.onload = function() {
    stage.addChild(acft);
    acft.regY = 100;
    acft.scaleY = 0.35;
    acft.scaleX = -0.35;
    acft.x = (stage.canvas.width - acft.image.width * acft.scaleX) / 2;
    acft.y = (stage.canvas.height - acft.image.height * acft.scaleY) / 2;
  };
  // container = new createjs.Shape();
  stage.enableMouseOver(10);
  // container.graphics.beginFill("DeepSkyBlue").drawCircle(200, 150, 200);
  // container.x = 100;
  // container.y = 100;
  // stage.update();
  window.addEventListener("resize", handleResize);
  handleResize(); // First draw
  
}





function handleResize() {
    // var w = window.innerWidth-2; // -2 accounts for the border
    // var h = window.innerHeight-2;
    // stage.canvas.width = w;
    // stage.canvas.height = h;
    // //
    // var ratio = 100/100; // 100 is the width and height of the circle content.
    // var windowRatio = w/h;
    // var scale = w/100;
    // if (windowRatio > ratio) {
    //     scale = h/100;
    // }
    // var c = container;
    // // Scale up to fit width or height
    // c.scaleX= c.scaleY = scale; 
    
    // // Center the shape
    // c.x = w / 2;
    // c.y = h / 2;
        
    stage.update();
}
       
