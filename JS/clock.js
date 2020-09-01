// Gloval variable ###########################
var canvas;
var ctx;
var halfWidth;
var startRad;
var grd;
// ####################################


prepareCanvas();
startClock();

function prepareCanvas() {
  canvas = document.getElementById("clockCanvas");
  ctx = canvas.getContext("2d");
  halfWidth = canvas.width/2;
  halfHeight = canvas.height/2;
  startRad = degToRad(270);  
  grd = ctx.createRadialGradient(halfWidth, halfHeight, 0, halfWidth, halfHeight, 60);
  grd.addColorStop(0, "rgb(50, 119, 119)");
  grd.addColorStop(1, "rgb(51, 51, 51)");

  ctx.strokeStyle = "#fc0352";
  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  ctx.shadowBlur = 3;
  ctx.shadowColor = "#c40c46";
}

function startClock() {
  setInterval(renderTime,40);
}

function degToRad(degree) {
  var factor = Math.PI / 180;
  return degree * factor;
}

function renderTime() {
  var now = new Date();
  var today = now.toDateString();
  var time = now.toLocaleTimeString();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();
  var miliseconds = now.getMilliseconds();
  var newseconds = seconds + (miliseconds / 1000);
  
  // Backgrounds
  // fillRect ÇÕ fillStyle Ç≈ê›íËÇµÇΩ style Ç≈éläpÇï`âÊÇ∑ÇÈ
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, 297, 297);
  
  // Hours
  // 3î‘ñ⁄ÇÃÉvÉçÉpÉeÉBÇ™â~ÇÃîºåaÇåªÇ∑
  ctx.beginPath();
  ctx.arc(halfWidth, halfHeight, 110, startRad, degToRad((hours * 15)-90));
  ctx.stroke();

  // Minutes
  ctx.beginPath();
  ctx.arc(halfWidth, halfHeight, 90, startRad, degToRad((minutes * 6)-90));
  ctx.stroke();

  // Seconds
  ctx.beginPath();
  ctx.arc(halfWidth, halfHeight, 70, startRad, degToRad((newseconds * 6)-90));
  ctx.stroke();

  // Date
  ctx.font = "13px Consolas";
  ctx.fillStyle = "#28d1fa";
  ctx.fillText(today, 60, 105);

  // Time
  ctx.font = "18px Consolas";
  ctx.fillStyle = "#28d1fa";  
  ctx.fillText(time, 75, 135);
}
