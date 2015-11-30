var counter = 0;

var anzahlWuerfe = 0;

var twoBlanks = blanks(2);

var fourBlanks = blanks(4);

var fiveBlanks = blanks(5);

var verdoppler = 0;

var augenWurf1;

var augenWurf2;

var paschsPlayer1 = 0;

var paschsPlayer2 = 0;

var punktePlayer1 = 0;

var punktePlayer2 = 0;

var scorePlayer1 = 0;

var scorePlayer2 = 0;

var eyeChart;

var scoreChart;

var paschChart;

var round = 0;

Wochentag = new Array("Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag");

function verdoppeln() {
  document.getElementById("verdoppler").innerHTML = plotVerdoppler();
}

function wuerfeln() {
  document.getElementById('wurf').innerHTML += wurf();
  if (counter > 32) {
    var elem = document.getElementById('wurf');
    elem.scrollTop = elem.scrollHeight;
  }
}

function wurf() {
  var wuerfel1 = Math.ceil(Math.random() * 6);
  var wuerfel2 = Math.ceil(Math.random() * 6);
  var pic1 = '<img src="' + wuerfel1 + '.png">';
  var pic2 = '<img src="' + wuerfel2 + '.png">';
  var ppic1 = '<img src="p' +wuerfel1 + '.png">';
  var ppic2 = '<img src="p' +wuerfel2 + '.png">';
  var res;
  if (document.getElementById('en').checked) {
    augenWurf1 = new Audio(wuerfel1 + "se.wav");
    augenWurf2 = new Audio(wuerfel2 + "se.wav");
  } else {
    augenWurf1 = new Audio(wuerfel1 + "sd.wav");
    augenWurf2 = new Audio(wuerfel2 + "sd.wav");
  }
  if (wuerfel1 == wuerfel2) {
    res = fourBlanks + ppic1 + twoBlanks + ppic2;
  } else {
    res = fourBlanks + pic1 + twoBlanks + pic2;
  }
  if (counter === 0 && wuerfel1 == wuerfel2) {
    return wurf();
  }
  counter++;
  sayWurf();
  var pasch = 1;
  if (counter % 2) {
    anzahlWuerfe++;
    if (wuerfel1 == wuerfel2) {
      paschsPlayer1++;
      document.strullboss.paschsPlayer1hidden.value = paschsPlayer1;
      paschChart.removeData();
      paschChart.addData([paschsPlayer1, paschsPlayer2], "");
      pasch++;
    }
    punktePlayer1 = punktePlayer1 + (wuerfel1 + wuerfel2) * pasch;
    document.strullboss.punktePlayer1hidden.value = punktePlayer1;
    eyeChart.addData([punktePlayer1, punktePlayer2], anzahlWuerfe);
    if (anzahlWuerfe < 10) {
      return fourBlanks + anzahlWuerfe + twoBlanks + res + fourBlanks;
    } else {
      return fourBlanks + anzahlWuerfe + res + fourBlanks;
    }
  } else {
    if (wuerfel1 == wuerfel2) {
      paschsPlayer2++;
      document.strullboss.paschsPlayer2hidden.value = paschsPlayer2;
      paschChart.removeData();
      paschChart.addData([paschsPlayer1, paschsPlayer2], "");
      pasch++;
    }
    punktePlayer2 = punktePlayer2 + (wuerfel1 + wuerfel2) * pasch;
    document.strullboss.punktePlayer2hidden.value = punktePlayer2;
    eyeChart.datasets[1].points[anzahlWuerfe].value = punktePlayer2;
    eyeChart.update();
    return res + br();
  }
}

function sayWurf() {
  if (document.getElementById('on').checked) {
    augenWurf1.addEventListener("ended", sayWurf2, true);
    augenWurf1.play();
  }
}

function sayWurf2() {
  augenWurf2.play();
}

function br() {
  return "<br>";
}

function blanks(count) {
  return Array(count + 1).join("&nbsp;");
}

function plotVerdoppler() {
  verdoppler <<= 1;
  if (verdoppler === 0) {
    verdoppler = 1;
  }
  if (verdoppler < 9) {
    return '<svg xmlns="http://www.w3.org/2000/svg" version="1.1"><g><rect x="65" y="20" rx="20" ry="20" width="100" height="100" style="fill:grey;stroke:black;stroke-width:5;opacity:0.5"/><text fill="#ffffff" font-size="45" font-family="Verdana" x="100" y="85">' + verdoppler + "</text></g></svg>";
  } else if (verdoppler >= 10 && verdoppler <= 99) {
    return '<svg xmlns="http://www.w3.org/2000/svg" version="1.1"><g><rect x="65" y="20" rx="20" ry="20" width="100" height="100" style="fill:grey;stroke:black;stroke-width:5;opacity:0.5"/><text fill="#ffffff" font-size="45" font-family="Verdana" x="90" y="85">' + verdoppler + "</text></g></svg>";
  } else if (verdoppler >= 100 && verdoppler <= 999) {
    return '<svg xmlns="http://www.w3.org/2000/svg" version="1.1"><g><rect x="65" y="20" rx="20" ry="20" width="100" height="100" style="fill:grey;stroke:black;stroke-width:5;opacity:0.5"/><text fill="#ffffff" font-size="45" font-family="Verdana" x="79" y="85">' + verdoppler + "</text></g></svg>";
  } else {
    return "So weit verdoppeln ist verboten... ein Würfel explodiert...<br>" + '<img src="wuerfel_explodiert.jpg">';
  }
}

function playerwins(player) {
  var score = (parseInt(document.getElementById("scorePlayer" + player).innerHTML, 10) || 0) + verdoppler;
  var punkte = document.getElementById("punkte").value;
  if (player == 1) {
    scorePlayer1 = scorePlayer1 + verdoppler;
    if (scorePlayer1 >= punkte) {
      alert("Game over!");
    } else {
      document.strullboss.scorePlayer1hidden.value = scorePlayer1;
      verdoppler = 0;
      verdoppeln();
    }
  } else {
    scorePlayer2 = scorePlayer2 + verdoppler;
    if (scorePlayer2 >= punkte) {
      alert("Game over!");
    } else {
      document.strullboss.scorePlayer2hidden.value = scorePlayer2;
      verdoppler = 0;
      verdoppeln();
    }
  }
  round++;
  if (round == 1){
    scoreChart.datasets[0].bars[0].value = scorePlayer1;
    scoreChart.datasets[1].bars[0].value = scorePlayer2;
    scoreChart.update();
  } else {
    scoreChart.addData([scorePlayer1, scorePlayer2], "round " + round);
  }
}

function resetGameAndStats() {
  document.getElementById('wurf').innerHTML = '';
  punktePlayer1 = punktePlayer2 = anzahlWuerfe = paschsPlayer1 = paschsPlayer2 = counter = 0;
}

function resetScore() {
  scorePlayer1 = scorePlayer2 = 0;
  verdoppler = 0;
  verdoppeln();
  for (i=0;i<round;i++){
    scoreChart.removeData();
  }
  round = 0;
}

function drawEyeChart() {
  var canvas = document.getElementById('eyeChart'),
      ctx = canvas.getContext('2d'),
      startingData = {
	labels: [0],
	datasets: [
	{
	  label: "Augen Player1",
	  fillColor: "rgba(220,220,220,0.2)",
	  strokeColor: "rgba(220,220,220,1)",
	  pointColor: "rgba(220,220,220,1)",
	  pointStrokeColor: "#fff",
	  data: [0]
	},
	{
	  label: "Augen Player2",
	  fillColor: "rgba(151,187,205,0.2)",
	  strokeColor: "rgba(151,187,205,1)",
	  pointColor: "rgba(151,187,205,1)",
	  pointStrokeColor: "#fff",
	  data: [0]
	}
	]
      },
      latestLabel = startingData.labels[0];
  eyeChart = new Chart(ctx).Line(startingData, {animationSteps: 15});
}

function drawScoreChart() {
  var canvas = document.getElementById('scoreChart'),
      ctx = canvas.getContext('2d'),
      startingData = {
	labels: ["round " + 1],
	datasets: [
	{
	  label: "Score Player1",
	  fillColor: "rgba(220,220,220,0.2)",
	  strokeColor: "rgba(220,220,220,1)",
	  highlightFill: "rgba(220,220,220,0.75)",
	  highlightStroke: "rgba(220,220,220,1)",
	  data: [0]
	},
	{
	  label: "Score Player2",
	  fillColor: "rgba(151,187,205,0.2)",
	  strokeColor: "rgba(151,187,205,1)",
	  highlightFill: "rgba(220,220,220,0.75)",
	  highlightStroke: "rgba(220,220,220,1)",
	  data: [0]
	}
	]
      },
      latestLabel = startingData.labels[0];
  scoreChart = new Chart(ctx).Bar(startingData, {animationSteps: 15});
}

function drawPaschChart() {
  var canvas = document.getElementById('paschChart'),
      ctx = canvas.getContext('2d'),
      startingData = {
	labels: [0],
	datasets: [
	{
	  label: "Paschs Player1",
	  fillColor: "rgba(220,220,220,0.2)",
	  strokeColor: "rgba(220,220,220,1)",
	  highlightFill: "rgba(220,220,220,0.75)",
	  highlightStroke: "rgba(220,220,220,1)",
	  data: [0]
	},
	{
	  label: "Paschs Player2",
	  fillColor: "rgba(151,187,205,0.2)",
	  strokeColor: "rgba(151,187,205,1)",
	  highlightFill: "rgba(220,220,220,0.75)",
	  highlightStroke: "rgba(220,220,220,1)",
	  data: [0]
	}
	]
      },
      latestLabel = startingData.labels[0];
  paschChart = new Chart(ctx).Bar(startingData, {animationSteps: 15});
}

function displayTime()
{
  var SystemDatum = new Date();
  var CounterTag = SystemDatum.getDate();
  var CounterMonat = SystemDatum.getMonth() + 1;
  var CounterJahr = SystemDatum.getFullYear();
  var CounterStd = SystemDatum.getHours();
  var CounterMin = SystemDatum.getMinutes();
  var CounterSek = SystemDatum.getSeconds();
  var TagDerWoche = SystemDatum.getDay();
  //  für zweistellige Anzeige
  var CounterTag2  = ((CounterTag < 10) ? "0" : "");
  var CounterMonat2  = ((CounterMonat < 10) ? ".0" : ".");
  var CounterStd2  = ((CounterStd < 10) ? "0" : "");
  var CounterMin2  = ((CounterMin < 10) ? ":0" : ":");
  var CounterSek2  = ((CounterSek < 10) ? ":0" : ":");
  var DatumJetzt = CounterTag2 + CounterTag + CounterMonat2 + CounterMonat  + "." + CounterJahr;
  // var ZeitJetzt = CounterStd2 + CounterStd + CounterMin2 + CounterMin + CounterSek2 + CounterSek + " Uhr";
  var ZeitJetzt = CounterStd2 + CounterStd + CounterMin2 + CounterMin + " Uhr";
  DarstellungOption = 4
    switch (DarstellungOption) {
      case 1:
	var DispString = ZeitJetzt;
	break;
      case 2:
	var DispString = DatumJetzt + " &nbsp;" + ZeitJetzt;
	break;
      case 3:
	var DispString = Wochentag[TagDerWoche] + " &nbsp;" + ZeitJetzt;
	break;
      case 4:
	var DispString = Wochentag[TagDerWoche] + " " + DatumJetzt + " &nbsp;" + ZeitJetzt;
	break;
    }
  document.getElementById("ZeitAnzeige").innerHTML = DispString;
  setTimeout("displayTime()", 1000);
}
window.setTimeout('displayTime()',1000);

function destroyCharts() {
  eyeChart.destroy();
  paschChart.destroy();
  scoreChart.destroy();
}

function neuesSpiel() {
  destroyCharts();
  resetGameAndStats();
  resetScore();
  drawEyeChart();
  drawScoreChart();
  drawPaschChart();
}

function onload() {
  verdoppeln();
  drawEyeChart();
  drawPaschChart();
  drawScoreChart();
}
