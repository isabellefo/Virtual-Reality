cont = 1;
const horizontal = 0.25;
const vertical = 0.1;
var el = document.querySelector("#peça1");

document.querySelector("#btn1").addEventListener("click", function () {
  let btns = document.getElementsByClassName("move");
  for(let item of btns){
    item.object3D.visible = true;
  }
  var btn1 = document.querySelector("#btn1");
  var text = document.querySelector("#text");

  el.object3D.visible = true;
  btn1.object3D.visible = false;
  text.object3D.visible = false;
 
});

function move(el,movement) {
  let position = el.getAttribute("position");
  for(let[ cord , value] of Object.entries(position)){
    position[cord] = value + movement[cord];
  }
  
  el.setAttribute("position", position);
}
function moveUp(item){
  move(item, {x:0.0, y:vertical, z:0.0});
}

function moveDown(item){
  move(item, {x:0.0, y:-vertical, z:0.0});
}

function moveLeft(item){
  move(item, {x:-horizontal, y:0.0, z:0.0});
}

function moveRight(item){
  move(item, {x:horizontal, y:0.0, z:0.0});
}

document.querySelector("#leftBtn").addEventListener("click", function(){moveLeft(el)});
document.querySelector("#leftText").addEventListener("click", function(){moveLeft(el)});
document.querySelector("#rightBtn").addEventListener("click", function(){moveRight(el)});
document.querySelector("#rightText").addEventListener("click", function(){moveRight(el)});
document.querySelector("#upBtn").addEventListener("click", function(){moveUp(el)});
document.querySelector("#upText").addEventListener("click", function(){moveUp(el)});
document.querySelector("#downBtn").addEventListener("click", function(){moveDown(el)});
document.querySelector("#downText").addEventListener("click", function(){moveDown(el)});
