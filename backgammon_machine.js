var counter = 0;

var anzahlWuerfe = 0;

var twoBlanks = blanks(2);

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
  augenWurf1 = new Audio(wuerfel1 + ".wav");
  augenWurf2 = new Audio(wuerfel2 + ".wav");
  if (wuerfel1 == wuerfel2) {
    res = twoBlanks + ppic1 + twoBlanks + ppic2;
  } else {
    res = twoBlanks + pic1 + twoBlanks + pic2;
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
      pasch++;
      document.getElementById("paschsPlayer1").innerHTML = 'Paschs Player1: ' + paschsPlayer1;
    }
    punktePlayer1 = punktePlayer1 + (wuerfel1 + wuerfel2) * pasch;
    document.getElementById("punktePlayer1").innerHTML = 'Augen Player1: ' + punktePlayer1;
    eyeChart.addData([punktePlayer1, punktePlayer2], anzahlWuerfe);
    if (anzahlWuerfe < 10) {
      return fiveBlanks + anzahlWuerfe + twoBlanks + res + fiveBlanks;
    } else {
      return fiveBlanks + anzahlWuerfe + res + fiveBlanks;
    }
  } else {
    if (wuerfel1 == wuerfel2) {
      paschsPlayer2++;
      pasch++;
      document.getElementById("paschsPlayer2").innerHTML = 'Paschs Player2: ' + paschsPlayer2;
    }
    punktePlayer2 = punktePlayer2 + (wuerfel1 + wuerfel2) * pasch;
    document.getElementById("punktePlayer2").innerHTML = 'Augen Player2: ' + punktePlayer2;
    eyeChart.datasets[1].points[anzahlWuerfe].value = punktePlayer2;
    eyeChart.update();
    return res + br();
  }
}

function sayWurf() {
  augenWurf1.addEventListener("ended", sayWurf2, true);
  augenWurf1.play();
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
    return '<svg xmlns="http://www.w3.org/2000/svg" version="1.1"><g><rect x="40" y="20" rx="20" ry="20" width="100" height="100" style="fill:grey;stroke:black;stroke-width:5;opacity:0.5"/><text fill="#ffffff" font-size="45" font-family="Verdana" x="75" y="85">' + verdoppler + "</text></g></svg>";
  } else if (verdoppler >= 10 && verdoppler <= 99) {
    return '<svg xmlns="http://www.w3.org/2000/svg" version="1.1"><g><rect x="40" y="20" rx="20" ry="20" width="100" height="100" style="fill:grey;stroke:black;stroke-width:5;opacity:0.5"/><text fill="#ffffff" font-size="45" font-family="Verdana" x="65" y="85">' + verdoppler + "</text></g></svg>";
  } else if (verdoppler >= 100 && verdoppler <= 999) {
    return '<svg xmlns="http://www.w3.org/2000/svg" version="1.1"><g><rect x="40" y="20" rx="20" ry="20" width="100" height="100" style="fill:grey;stroke:black;stroke-width:5;opacity:0.5"/><text fill="#ffffff" font-size="45" font-family="Verdana" x="54" y="85">' + verdoppler + "</text></g></svg>";
  } else {
    return "So weit verdoppeln ist verboten... ein Würfel explodiert...<br>" + '<img src="wuerfel_explodiert.jpg">';
  }
}

function playerwins(player) {
  var score = (parseInt(document.getElementById("scorePlayer" + player).innerHTML, 10) || 0) + verdoppler;
  var punkte = document.getElementById("punkte").value;
  scoreChart.addData([scorePlayer1, scorePlayer2]);
  if (player == 1) {
    scorePlayer1 = scorePlayer1 + verdoppler;
    if (scorePlayer1 >= punkte) {
      alert("Game over!");
    } else {
      document.getElementById("scorePlayer" + player).innerHTML = "Score Player1: " + scorePlayer1;
      document.strullboss.scorePlayer1hidden.value = scorePlayer1;
      verdoppler = 0;
      verdoppeln();
    }
  } else {
    scorePlayer2 = scorePlayer2 + verdoppler;
    if (scorePlayer2 >= punkte) {
      alert("Game over!");
    } else {
      document.getElementById("scorePlayer" + player).innerHTML = "Score Player2: " + scorePlayer2;
      document.strullboss.scorePlayer2hidden.value = scorePlayer2;
      verdoppler = 0;
      verdoppeln();
    }
  }
}

function resetGameAndStats() {
  document.getElementById('wurf').innerHTML = '';
  document.getElementById('paschsPlayer1').innerHTML = '';
  document.getElementById('paschsPlayer2').innerHTML = '';
  document.getElementById('punktePlayer1').innerHTML = '';
  document.getElementById('punktePlayer2').innerHTML = '';
  punktePlayer1 = punktePlayer2 = anzahlWuerfe = paschsPlayer1 = paschsPlayer2 = counter = 0;
}

function resetScore() {
  document.getElementById('scorePlayer1').innerHTML = '';
  document.getElementById('scorePlayer2').innerHTML = '';
  scorePlayer1 = scorePlayer2 = 0;
  verdoppler = 0;
  verdoppeln();
}

function initStatistics() {
  document.getElementById("paschsPlayer1").innerHTML = 'Paschs Player1: ' + paschsPlayer1;
  document.getElementById("paschsPlayer2").innerHTML = 'Paschs Player2: ' + paschsPlayer2;
  document.getElementById("punktePlayer1").innerHTML = 'Augen Player1: ' + punktePlayer1;
  document.getElementById("punktePlayer2").innerHTML = 'Augen Player2: ' + punktePlayer2;
}

function initScore() {
  document.getElementById("scorePlayer1").innerHTML = 'Score Player1: ' + scorePlayer1;
  document.getElementById("scorePlayer2").innerHTML = 'Score Player2: ' + scorePlayer2;
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
                   labels: [0],
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
