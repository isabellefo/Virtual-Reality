cont = 1;
document.querySelector("#btn1").addEventListener("click", function () {

  var el = document.querySelector("#peça1");
  var btn1 = document.querySelector("#btn1");
  var text = document.querySelector("#text");

  el.object3D.visible = true;
  btn1.object3D.visible = false;
  text.object3D.visible = false;
 
});
