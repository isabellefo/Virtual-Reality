var cont = 1;
const horizontal = 0.2;
const vertical = 0.2;
var elName  = "#peça"
var el = document.querySelector(elName + cont);
var audio = new Audio("http://soundbible.com/grab.php?id=2156&type=mp3");

document.querySelector("#startBtn").addEventListener("click", function(){start()});
document.querySelector("#startText").addEventListener("click", function(){start()});
document.querySelector("#congrats").addEventListener("click", function(){toggleElement("congrats")});

function start() {
  console.log("start");
  
  let btns = document.getElementsByClassName("move");
  for(let item of btns){
    console.log(item.id);
    toggleElement(item.id);
  }
  // parabéns
  if(document.getElementById("congrats").object3D.visible){
    toggleElement("congrats");
  }
  // esconde ou mostra os elementos
  el.object3D.visible = true;
  toggleElement("startBtn");
  toggleElement("startText");
  
}

function isInPlace(position){
  // posição da peça transparente
  let rightPlace = document.getElementById("caixaT-"+ cont).getAttribute("position");
  // flag para saber se está no lugar
  let fitted = true;
  for( let[cord, value] of Object.entries(position)){
    // transforma a posição em um inteiro
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
    audio.play();
    // incrementa cont para pegar a próxima peça
    cont++;
    // caso todas as peças forem encaixadas
    if(cont > 4){
      cont = 1;
      // esconde os botões de movimento
      let btns = document.getElementsByClassName("move");
      for(let item of btns){
        toggleElement(item.id);
      }
      // mostra o botão de start
      toggleElement("startBtn");
      toggleElement("startText");
      // move e esconde as caixas
      for(let c = 1; c <= 4; c++){
        let p1 = document.getElementById("caixaT-"+ c).getAttribute("position");
        let ent = document.getElementById("peça"+c)
        let p2 = ent.getAttribute("position");
        p2["x"] = p1["x"] + 1.2;
        p2["y"] = p1["y"] + 0.4;
        ent.setAttribute("position", p2);
        ent.object3D.visible = false;
      }
      //mostra o aviso de parabens
      toggleElement("congrats");
      el = document.querySelector(elName + cont);
      return;
    }
    // exibe a próxima peça
    el = document.querySelector(elName + cont);
    el.object3D.visible = true; 

    
  }
}

function toggleElement(id){
  let ent = document.getElementById(id);
  let p = ent.getAttribute("position");
  p["y"] = -p["y"];
  ent.setAttribute("position",p);
  ent.object3D.visible = !ent.object3D.visible;
}

function move(el,movement) {
  // soma movement em posição
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
