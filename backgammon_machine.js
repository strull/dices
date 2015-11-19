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

function verdoppeln() {
  document.getElementById("verdoppler").innerHTML = plotVerdoppler();
}

function wuerfeln() {
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
    window.location.reload();
  }
  counter++;
  sayWurf();
  window.scrollTo(0, document.body.scrollHeight);
  if (counter % 2) {
    anzahlWuerfe++;
    if (wuerfel1 == wuerfel2) {
      paschsPlayer1++;
      document.getElementById("paschsPlayer1").innerHTML = 'Paschs Player1: ' + paschsPlayer1;
    }
    punktePlayer1 = punktePlayer1 + wuerfel1 + wuerfel2;
    document.getElementById("punktePlayer1").innerHTML = 'Augen Player1: ' + punktePlayer1;
    if (anzahlWuerfe < 10) {
      return fiveBlanks + anzahlWuerfe + twoBlanks + res + fiveBlanks;
    } else {
      return fiveBlanks + anzahlWuerfe + res + fiveBlanks;
    }
  } else {
    if (wuerfel1 == wuerfel2) {
      paschsPlayer2++;
      document.getElementById("paschsPlayer2").innerHTML = 'Paschs Player2: ' + paschsPlayer2;
    }
    punktePlayer2 = punktePlayer2 + wuerfel1 + wuerfel2;
    document.getElementById("punktePlayer2").innerHTML = 'Augen Player2: ' + punktePlayer2;
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
  if (score >= punkte) {
    alert("GameOver!");
  }
  document.getElementById("scorePlayer" + player).innerHTML = (parseInt(document.getElementById("scorePlayer" + player).innerHTML, 10) || 0) + verdoppler;
  verdoppler = 0;
  verdoppeln();
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
}

function saveResult() {
  window.URL || (window.URL = window.webkitURL);
  if(!window.URL){
    return false;
  }
  var timestamp = new Date();
  var player1 = document.getElementById('player1').value;
  var player2 = document.getElementById('player2').value;
  var scorePlayer1 = (parseInt(document.getElementById("scorePlayer1").innerHTML, 10) || 0);
  var scorePlayer2 = (parseInt(document.getElementById("scorePlayer2").innerHTML, 10) || 0);
  var myBlob = new Blob([timestamp,' ',player1,' - ',player2,': ',scorePlayer1,':',scorePlayer2], {type : 'plain/text'});
  // creates the URl for the File
  var url = URL.createObjectURL(myBlob);
  // checks wether the browser supports direct downloads
  if( "download" in document.createElement('a') ){
    // creates an invisible button to press
    var a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', "ResultHistory.txt");
    // Create Click event
    var clickEvent = document.createEvent ("MouseEvent");
    clickEvent.initMouseEvent ("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, -1, 0, null);
    // dispatch click event to simulate download
    a.dispatchEvent (clickEvent);
  }
  else{
    // fallover, open resource in new tab.
    window.open(url, '_blank', '');
  }
}

function initStatistics() {
      document.getElementById("paschsPlayer1").innerHTML = 'Paschs Player1: ' + paschsPlayer1;
      document.getElementById("paschsPlayer2").innerHTML = 'Paschs Player2: ' + paschsPlayer2;
      document.getElementById("punktePlayer1").innerHTML = 'Augen Player1: ' + punktePlayer1;
      document.getElementById("punktePlayer2").innerHTML = 'Augen Player2: ' + punktePlayer2;
}

function initScore() {
      document.getElementById("scorePlayer1").innerHTML = 'Score Player1: 0';
      document.getElementById("scorePlayer2").innerHTML = 'Score Player2: 0';
}
