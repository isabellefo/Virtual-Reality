cont = 1;
const int horizontal = 0.5;
const int vertical = 0.1
document.querySelector("#startBtn").addEventListener("click", function () {
  
  var el = document.querySelector("#peça1");
  var btn1 = document.querySelector("#startBtn");
  var text = document.querySelector("#startText");
  var panel = document.getElementById("panel");

  el.object3D.visible = true;
  btn1.object3D.visible = false;
  text.object3D.visible = false;
  panel.visible = true;
 
});

function move(el,movement){
  let position = el.getAttribute("position");
  for(let[ cord , value] of Object.entries(position)){
    position[cord] = value + movement[cord];
  }
  
  el.setAttribute("position", position);
  
}
