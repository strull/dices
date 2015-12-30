var counter = 0;

var anzahlWuerfe = 0;

var twoBlanks = blanks(2);

var fourBlanks = blanks(4);

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

var Wochentag = new Array("Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag");

var verdopplerEinstellig = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1"><g><rect x="65" y="20" rx="20" ry="20" width="100" height="100" style="fill:grey;stroke:black;stroke-width:5;opacity:0.5"/><text fill="#ffffff" font-size="45" font-family="Verdana" x="100" y="85">';

var verdopplerZweistellig = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1"><g><rect x="65" y="20" rx="20" ry="20" width="100" height="100" style="fill:grey;stroke:black;stroke-width:5;opacity:0.5"/><text fill="#ffffff" font-size="45" font-family="Verdana" x="90" y="85">';

var verdopplerDreistellig = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1"><g><rect x="65" y="20" rx="20" ry="20" width="100" height="100" style="fill:grey;stroke:black;stroke-width:5;opacity:0.5"/><text fill="#ffffff" font-size="45" font-family="Verdana" x="79" y="85">';

var wurfHistorie = [];

var soundlocked;
var audioFiles = [];
var soundEn = [];
for (var i = 1; i < 7; i++) {
  var afile=new Audio(i + "se.wav");
  afile.addEventListener("ended", onAudioEnded, true);
  soundEn.push(afile);
}

var soundDe = [];
for (var j = 1; j < 7; j++) {
  var bfile=new Audio(j + "sd.wav");
  bfile.addEventListener("ended", onAudioEnded, true);
  soundDe.push(bfile);
}

function verdoppeln() {
  document.getElementById("verdoppler").innerHTML = plotVerdoppler();
}

function halfVerdoppeln() {
  document.getElementById("verdoppler").innerHTML = halfVerdoppler();
}

function wuerfeln() {
  document.getElementById('wurf').innerHTML += wurf();
  if (counter > 26) {
    var elem = document.getElementById('wurf');
    elem.scrollTop = elem.scrollHeight;
  }
}

function wurf() {
  var wuerfel1 = Math.ceil(Math.random() * 6);
  var wuerfel2 = Math.ceil(Math.random() * 6);
  if (counter === 0 && wuerfel1 == wuerfel2) {
    return wurf();
  } else {
    wurfHistorie.push(wuerfel1,wuerfel2);
    document.strullboss.wurfHistoriehidden.value = wurfHistorie;
  }
  var pic1 = '<img src="' + wuerfel1 + '.png">';
  var pic2 = '<img src="' + wuerfel2 + '.png">';
  var ppic1 = '<img src="p' +wuerfel1 + '.png">';
  var ppic2 = '<img src="p' +wuerfel2 + '.png">';
  var bpic1 = '<img src="' +wuerfel1 + 'b.png">';
  var bpic2 = '<img src="' +wuerfel2 + 'b.png">';
  var res;
  if (document.getElementById('en').checked) {
    augenWurf1 = soundEn[wuerfel1 - 1];
    augenWurf2 = soundEn[wuerfel2 - 1];
  } else {
    augenWurf1 = soundDe[wuerfel1 - 1];
    augenWurf2 = soundDe[wuerfel2 - 1];
  }
  document.getElementById('aktuellerWurf').innerHTML = bpic1 + "&nbsp;" + bpic2;
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
      paschChart.removeData();
      paschChart.addData([paschsPlayer1, paschsPlayer2], "");
      pasch++;
    }
    punktePlayer1 = punktePlayer1 + (wuerfel1 + wuerfel2) * pasch;
    var player1 = document.getElementById("player1").value;
    if (!player1) {
      document.getElementById('augenPlayer1').innerHTML = 'Augen:  ' + punktePlayer1;
    } else {
      document.getElementById('augenPlayer1').innerHTML = 'Augen ' + player1 +': ' + punktePlayer1;
    }
    eyeChart.addData([punktePlayer1, punktePlayer2], anzahlWuerfe);
    if (anzahlWuerfe < 10) {
      return fourBlanks + anzahlWuerfe + twoBlanks + res + fourBlanks;
    } else {
      return fourBlanks + anzahlWuerfe + res + fourBlanks;
    }
  } else {
    if (wuerfel1 == wuerfel2) {
      paschsPlayer2++;
      paschChart.removeData();
      paschChart.addData([paschsPlayer1, paschsPlayer2], "");
      pasch++;
    }
    punktePlayer2 = punktePlayer2 + (wuerfel1 + wuerfel2) * pasch;
    var player2 = document.getElementById("player2").value;
    if (!player2) {
      document.getElementById('augenPlayer2').innerHTML = 'Augen:  ' + punktePlayer2;
    } else {
      document.getElementById('augenPlayer2').innerHTML = 'Augen ' + player2 +': ' + punktePlayer2;
    }
    eyeChart.datasets[1].points[anzahlWuerfe].value = punktePlayer2;
    eyeChart.update();
    return res + br();
  }
}

function sayWurf() {
  play(augenWurf1);
  play(augenWurf2);
}

function play(file) {
  if (!document.getElementById('on').checked) return;
  if (file === undefined) return;
  if (soundlocked) {
    audioFiles.push(file);
  } else {
    soundlocked = true;
    file.play();
  }
}

function onAudioEnded(){
  soundlocked = false;
  play(audioFiles.shift());
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
    return verdopplerEinstellig + verdoppler + "</text></g></svg>";
  } else if (verdoppler >= 10 && verdoppler <= 99) {
    return verdopplerZweistellig + verdoppler + "</text></g></svg>";
  } else if (verdoppler >= 100 && verdoppler <= 999) {
    return verdopplerDreistellig + verdoppler + "</text></g></svg>";
  } else {
    return "So weit verdoppeln ist verboten... ein Wuerfel explodiert...<br>" + '<img src="wuerfel_explodiert.jpg">';
  }
}

function halfVerdoppler() {
  verdoppler = verdoppler / 2;
  if (verdoppler >= 1 && verdoppler <= 9) {
    return verdopplerEinstellig + verdoppler + "</text></g></svg>";
  } else if (verdoppler >= 10 && verdoppler <= 99) {
    return verdopplerZweistellig + verdoppler + "</text></g></svg>";
  } else if (verdoppler >= 100 && verdoppler <= 999) {
    return verdopplerDreistellig + verdoppler + "</text></g></svg>";
  } else {
    verdoppler = 1;
    return verdopplerEinstellig + verdoppler + "</text></g></svg>";
  }
}

function playerwins(player) {
  var punkte = document.getElementById("punkte").value;
  if (player == 1) {
    if (document.getElementById('gammon').checked) { 
      scorePlayer1 = scorePlayer1 + (verdoppler * 2);
    }
    else if (document.getElementById('backgammon').checked) { 
      scorePlayer1 = scorePlayer1 + (verdoppler * 3);
    } else {
      scorePlayer1 = scorePlayer1 + verdoppler;
    }
    var player1 = document.getElementById("player1").value;
    document.getElementById('scorePlayer1').innerHTML = 'Score ' + player1 + ': ' + scorePlayer1;
    if (scorePlayer1 >= punkte) {
      alert("Game over! " + player1 + " wins.");
    } else {
      document.strullboss.scorePlayer1hidden.value = scorePlayer1;
      verdoppler = 0;
      verdoppeln();
    }
  } else {
    if (document.getElementById('gammon').checked) { 
      scorePlayer2 = scorePlayer2 + (verdoppler * 2);
    }
    else if (document.getElementById('backgammon').checked) { 
      scorePlayer2 = scorePlayer2 + (verdoppler * 3);
    } else {
      scorePlayer2 = scorePlayer2 + verdoppler;
    }
    var player2 = document.getElementById("player2").value;
    document.getElementById('scorePlayer2').innerHTML = 'Score ' + player2 + ': ' + scorePlayer2;
    if (scorePlayer2 >= punkte) {
      alert("Game over! " + player2 + " wins.");
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
  var player1 = document.getElementById("player1").value;
  if (!player1) {
    document.getElementById('augenPlayer1').innerHTML = 'Augen:  ' + punktePlayer1;
  } else {
    document.getElementById('augenPlayer1').innerHTML = 'Augen ' + player1 +': ' + punktePlayer1;
  }
  var player2 = document.getElementById("player2").value;
  if (!player2) {
    document.getElementById('augenPlayer2').innerHTML = 'Augen:  ' + punktePlayer2;
  } else {
    document.getElementById('augenPlayer2').innerHTML = 'Augen ' + player2 +': ' + punktePlayer2;
  }
}

function resetVerdoppler() {
  verdoppler = 0;
  verdoppeln();
}

function drawEyeChart() {
  var player1 = document.getElementById("player1").value;
  var player2 = document.getElementById("player2").value;
  var canvas = document.getElementById('eyeChart'),
      ctx = canvas.getContext('2d'),
      startingData = {
	labels: [0],
	datasets: [
	{
	  label: " Augen " + player1,
	  fillColor: "rgba(220,220,220,0.2)",
	  strokeColor: "rgba(220,220,220,1)",
	  pointColor: "rgba(220,220,220,1)",
	  pointStrokeColor: "#fff",
	  data: [0]
	},
	{
	  label: " Augen " + player2,
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
  document.getElementById('js-legend').innerHTML = eyeChart.generateLegend();
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
  scoreChart = new Chart(ctx).Bar(startingData, {animationSteps: 1});
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

function displayTime() {
  var SystemDatum = new Date();
  var CounterTag = SystemDatum.getDate();
  var CounterMonat = SystemDatum.getMonth() + 1;
  var CounterJahr = SystemDatum.getFullYear();
  var CounterStd = SystemDatum.getHours();
  var CounterMin = SystemDatum.getMinutes();
  var TagDerWoche = SystemDatum.getDay();
  var CounterTag2  = ((CounterTag < 10) ? "0" : "");
  var CounterMonat2  = ((CounterMonat < 10) ? ".0" : ".");
  var CounterStd2  = ((CounterStd < 10) ? "0" : "");
  var CounterMin2  = ((CounterMin < 10) ? ":0" : ":");
  var DatumJetzt = CounterTag2 + CounterTag + CounterMonat2 + CounterMonat  + "." + CounterJahr;
  var ZeitJetzt = CounterStd2 + CounterStd + CounterMin2 + CounterMin + " Uhr";
  var DispString = Wochentag[TagDerWoche] + " " + DatumJetzt + " &nbsp;" + ZeitJetzt;
  document.getElementById("ZeitAnzeige").innerHTML = DispString;
  setTimeout("displayTime()", 1000);
}
window.setTimeout('displayTime()',1000);

function initAugenPlayer() {
  var player1 = document.getElementById("player1").value;
  if (!player1) {
    document.getElementById('augenPlayer1').innerHTML = 'Augen:  ' + punktePlayer1;
  } else {
    document.getElementById('augenPlayer1').innerHTML = 'Augen ' + player1 +': ' + punktePlayer1;
  }
  var player2 = document.getElementById("player2").value;
  if (!player2) {
    document.getElementById('augenPlayer2').innerHTML = 'Augen:  ' + punktePlayer2;
  } else {
    document.getElementById('augenPlayer2').innerHTML = 'Augen ' + player2 +': ' + punktePlayer2;
  }
}

function initScorePlayer() {
  var player1 = document.getElementById("player1").value;
  if (!player1) {
    document.getElementById('scorePlayer1').innerHTML = 'Score:  ' + scorePlayer1;
  } else {
    document.getElementById('scorePlayer1').innerHTML = 'Score ' + player1 +': ' + scorePlayer1;
  }
  var player2 = document.getElementById("player2").value;
  if (!player2) {
    document.getElementById('scorePlayer2').innerHTML = 'Score:  ' + scorePlayer2;
  } else {
    document.getElementById('scorePlayer2').innerHTML = 'Score ' + player2 +': ' + scorePlayer2;
  }
}

function neuesSpiel() {
  eyeChart.destroy();
  paschChart.destroy();
  resetGameAndStats();
  resetVerdoppler();
  drawEyeChart();
  drawPaschChart();
  document.getElementById('normal').checked = true;
  document.getElementById('aktuellerWurf').innerHTML = "";
}

function neuesMatch() {
  window.location.reload();
}

function onload() {
  verdoppeln();
  drawEyeChart();
  initAugenPlayer();
  initScorePlayer();
  drawPaschChart();
  drawScoreChart();
}

function onchangePlayer(player) {
  if (player == 1) {
    var player1 = document.getElementById("player1").value;
    document.getElementById('augenPlayer1').innerHTML = "Augen " + player1 + ": " + punktePlayer1;
    document.getElementById('scorePlayer1').innerHTML = "Score " + player1 + ": " + scorePlayer1;
    document.getElementById('player1Wins').value = player1 + " gewinnt";
  } else {
    var player2 = document.getElementById("player2").value;
    document.getElementById('augenPlayer2').innerHTML = "Augen " + player2 + ": " + punktePlayer2;
    document.getElementById('scorePlayer2').innerHTML = "Score " + player2 + ": " + scorePlayer2;
    document.getElementById('player2Wins').value = player2 + " gewinnt";
  }
}
