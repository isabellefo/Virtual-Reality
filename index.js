cont = 1;
const horizontal = 0.2;
const vertical = 0.2;
var elName  = "#peça"
var el = document.querySelector(elName + cont);

document.querySelector("#startBtn").addEventListener("click", function(){start()});
document.querySelector("#startText").addEventListener("click", function(){start()});

function start() {
  let btns = document.getElementsByClassName("move");
  for(let item of btns){
    item.object3D.visible = true;
  }
  
  var btn1 = document.querySelector("#startBtn");
  var text = document.querySelector("#startText");

  el.object3D.visible = true;
  btn1.object3D.visible = false;
  text.object3D.visible = false;
}

function isInPlace(position){
  // posição da peça transparente
  let rightPlace = document.getElementById("caixaT-"+ cont).getAttribute("position");
  // flag para saber se está no lugar
  let fitted = true;
  for( let[cord, value] of Object.entries(position)){
    // tranforma a posição em um inteiro
    let c1 = Math.floor(value / 0.01);
    let c2 = Math.floor(rightPlace[cord] / 0.01);
    console.log(`${cord} ${c1} ${c2} ${Math.abs(c1-c2)}`);
    // verifica se estão no mesmo lugar
    if(Math.abs(c1-c2) >= 2){
      fitted = false;
      break;
    }
  }
  if(fitted){
    // incrementa cont para pegar a próxima peça
    cont++;
    el = document.querySelector(elName + cont);
    // exibe a próxima peça
    el.object3D.visible = true;
  }
}

function move(el,movement) {
  let position = el.getAttribute("position");
  for(let[ cord , value] of Object.entries(position)){
    position[cord] = value + movement[cord];
  }
  
  el.setAttribute("position", position);
  isInPlace(position);
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
