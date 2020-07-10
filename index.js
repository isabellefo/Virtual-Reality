var cont = 1;
const horizontal = 0.2;
const vertical = 0.2;
var elName  = "#peça"
var el = document.querySelector(elName + cont);
var audio = new Audio("http://soundbible.com/grab.php?id=2156&type=mp3");

document.querySelector("#startBtn").addEventListener("click", function(){start()});
document.querySelector("#startText").addEventListener("click", function(){start()});
document.querySelector("#congrats").addEventListener("click", function(){toggleElement("congrats")});

// Exibe os botões de direção e a primeira peça que será movida 
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
  
  el.object3D.visible = true;
  toggleElement("startBtn");
  toggleElement("startText");
  
}

// Verifica se a peça atual está posicionada nas mesmas coordenadas que a peça transparente  
// Args:
//     position::object = dicionário contendo as coordenadas(x, y e z) da peça
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
    audio.play();
    // incrementa cont para pegar a próxima peça
    cont++;
    // exibe a próxima peça
    if(cont > 4){
      cont = 1;
      // esconde os botões de movimento
      let btns = document.getElementsByClassName("move");
      for(let item of btns){
        //Não sei se tá entrando aqui não
        toggleElement(item.id);
      }
      // mostra o botão de start
      toggleElement("startBtn");
      toggleElement("startText");
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
      toggleElement("congrats")
      el = document.querySelector(elName + cont);
      return;
    }
    el = document.querySelector(elName + cont);
    el.object3D.visible = true; 

    
  }
}

// Alterna a visibilidade de um elemento. Se estiver visível torna invisível vice-versa
// Args:
//     id::str = identificador do elemento
function toggleElement(id){
  let ent = document.getElementById(id);
  let p = ent.getAttribute("position");
  p["y"] = -p["y"];
  ent.setAttribute("position",p);
  ent.object3D.visible = !ent.object3D.visible;
}

// Adiciona à coordenada da peça, os valores contidos no dicionário "movement", movendo a peça para
// uma posição desejada.
// Args:
//     el::object = elemento/peça que será movida
//     movement::object = dicionário que contém os valores a serem adicionados nas coordenadas da peça
function move(el,movement) {
  let position = el.getAttribute("position");
  for(let[ cord , value] of Object.entries(position)){
    position[cord] = value + movement[cord];
  }
  
  el.setAttribute("position", position);
  isInPlace(position);
}

// Utiliza da função move para mover a peça para cima
// Args:
//     item::object = elemento/peça que será movida
function moveUp(item){
  move(item, {x:0.0, y:vertical, z:0.0});
}

// Utiliza da função move para mover a peça para baixo
// Args:
//     item::object = elemento/peça que será movida
function moveDown(item){
  move(item, {x:0.0, y:-vertical, z:0.0});
}

// Utiliza da função move para mover a peça para esquerda
// Args:
//     item::object = elemento/peça que será movida
function moveLeft(item){
  move(item, {x:-horizontal, y:0.0, z:0.0});
}

// Utiliza da função move para mover a peça para direita
// Args:
//     item::object = elemento/peça que será movida
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
