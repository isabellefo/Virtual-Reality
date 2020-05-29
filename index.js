cont = 1;
document.querySelector("#btn1").addEventListener("click", function () {

  var el = document.querySelector("#peça1");
  var btn1 = document.querySelector("#btn1");
  var text = document.querySelector("#text");

  el.object3D.visible = true;
  btn1.object3D.visible = false;
  text.object3D.visible = false;
  //moveup(el);
  
 
});

function move(el,movement){
  console.log("what?")
  console.log(el);
  let position = el.getAttribute("position");
  for(let[ cord , value] of Object.entries(position)){
    position[cord] = value + movement[cord];
  }
  
  el.setAttribute("position", position);
  
}
